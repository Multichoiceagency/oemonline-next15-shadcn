// app/api/vehicles/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"

// Alias import om naamconflicten te voorkomen
import { tecdocCall as callTecdoc } from "@/lib/tecdoc"
import { ENV } from "@/lib/env"
import { logError, logDebug } from "@/lib/logger"

export const dynamic = "force-dynamic"

// ---------------------------------------------------------------------------
// Types & helpers
// ---------------------------------------------------------------------------
type JsonOk<T> = { ok: true; mode: string; count: number; data: T; meta?: Record<string, any> }
type JsonErr = { ok: false; mode?: string | null; error: string; detail?: any }

function jsonOK<T>(body: JsonOk<T>, init?: number | ResponseInit) {
  let responseInit: ResponseInit | undefined;
  if (typeof init === "number") {
    responseInit = { status: init };
  } else {
    responseInit = init;
  }
  return NextResponse.json(body, responseInit);
}
function jsonERR(body: JsonErr, init?: number | ResponseInit) {
  const status =
    typeof init === "number"
      ? init
      : typeof init === "object" && init?.status
      ? init.status
      : 200
  return NextResponse.json(body, { status })
}

function toInt(value: string | null) {
  if (!value) return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}
function asArray<T = any>(maybeArr: any): T[] {
  if (!maybeArr) return []
  if (Array.isArray(maybeArr)) return maybeArr
  if ((maybeArr as any)?.item) return asArray<T>((maybeArr as any).item)
  if (typeof maybeArr === "object") return [maybeArr as T]
  return []
}
function maybeAttachDebug(meta: Record<string, any>, debugFlag: string | null, raw: any) {
  if (debugFlag === "1" || debugFlag === "true") meta._debugRaw = raw
  return meta
}
function slugify(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

// Personenauto’s (Vehicle) en motoren (Engine)
const LTT_VEHICLE = "V" as const; // Passenger Car
const LTT_ENGINE = "M" as const; // Engine

// Veelvoorkomende alias → merknaam (strikt maar met vaste aliassen)
const MANUFACTURER_ALIASES: Record<string, string> = {
  "am": "Aston Martin",
  "a-m": "Aston Martin",
  "aston-martin": "Aston Martin",
  "mb": "Mercedes-Benz",
  "mercedes": "Mercedes-Benz",
  "mercedes-benz": "Mercedes-Benz",
  "vw": "Volkswagen",
  "v-w": "Volkswagen",
  "bmw": "BMW",
  "b-m-w": "BMW",
  "vauxhall": "Opel",
  "skoda": "Škoda",
  "škoda": "Škoda",
}

// ---------------------------------------------------------------------------
// Normalizers (defensief tegen variërende TecDoc shapes)
// ---------------------------------------------------------------------------
function normManu(m: any) {
  return {
    id: m?.manuId ?? m?.manuNo ?? m?.id ?? m?.manuID ?? null,
    name: m?.manuName ?? m?.name ?? m?.text ?? "",
    slug: slugify(m?.manuName ?? m?.name ?? m?.text ?? ""),
  }
}

function normModel(m: any) {
  const id =
    m?.modelSeriesId ??
    m?.modId ??
    m?.id ??
    m?.modelId ??
    m?.modelseriesID ??
    null

  const name =
    m?.modelSeriesName ??
    m?.modelname ??
    m?.name ??
    m?.text ??
    ""

  return {
    id: id ? Number(id) : null,
    name,
    slug: slugify(name),
    fromYear: m?.yearOfConstructionFrom ?? m?.constructionStart ?? m?.from ?? null,
    toYear: m?.yearOfConstructionTo ?? m?.constructionEnd ?? m?.to ?? null,
  }
}

/** Types = uitvoeringen/varianten binnen modelserie */
function normType(t: any) {
  const kw = t?.powerKW ?? t?.powerKw ?? t?.kW ?? t?.engineOutputKw ?? null
  const hp = t?.powerHP ?? t?.hp ?? t?.PS ?? t?.engineOutputHp ?? null

  const id =
    t?.typeId ?? t?.kTypNr ?? t?.ktypNr ?? t?.ktypnr ?? t?.typeNo ?? null

  const name = t?.typeName ?? t?.carName ?? t?.name ?? t?.description ?? ""

  return {
    id: id ? Number(id) : null,
    name,
    engineCode: t?.engineCode ?? t?.engine ?? null,
    fuel: t?.fuelType ?? t?.fuel ?? t?.fuelTypeName ?? null,
    body: t?.bodyType ?? t?.body ?? null,
    powerKW: kw ? Number(kw) : null,
    powerHP: hp ? Number(hp) : null,
    ccm: t?.capacityCCM ?? t?.cubicCapacity ?? t?.displacementCCM ?? t?.ccm ?? null,
    fromYear: t?.yearOfConstructionFrom ?? t?.constructionStart ?? t?.from ?? null,
    toYear: t?.yearOfConstructionTo ?? t?.constructionEnd ?? t?.to ?? null,
  }
}

function normVehicle(v: any) {
  const k = v?.kTypNr ?? v?.ktypNr ?? v?.ktypnr ?? v?.typeId ?? null
  return {
    ktypNr: k ? Number(k) : null,
    manufacturer: v?.manuName ?? v?.manufacturerName ?? null,
    model: v?.modelName ?? v?.modelSeriesName ?? null,
    typeName: v?.typeName ?? v?.carName ?? v?.name ?? null,
    engineCode: v?.engineCode ?? v?.engine ?? null,
    fuel: v?.fuelType ?? v?.fuel ?? null,
    body: v?.bodyType ?? v?.body ?? null,
    powerKW: v?.powerKW ?? v?.engineOutputKw ?? null,
    powerHP: v?.powerHP ?? v?.engineOutputHp ?? null,
    ccm: v?.capacityCCM ?? v?.cubicCapacity ?? v?.displacementCCM ?? v?.ccm ?? null,
    fromYear: v?.yearOfConstructionFrom ?? v?.constructionStart ?? v?.from ?? null,
    toYear: v?.yearOfConstructionTo ?? v?.constructionEnd ?? v?.to ?? null,
    doors: v?.doors ?? v?.numberOfDoors ?? null,
    cylinders: v?.cylinders ?? null,
    transmission: v?.transmission ?? v?.gearbox ?? null,
  }
}

// ---------------------------------------------------------------------------
/** Exacte resolvers (géén fuzzy). Retourneert null als er geen 1-op-1 match is. */
// ---------------------------------------------------------------------------
async function resolveManufacturerId(opts: {
  nameOrAlias?: string | null
  lang: string
  country: string
  countryCode: string
  articleCountry: string
}) {
  const { nameOrAlias, lang, country, countryCode, articleCountry } = opts
  if (!nameOrAlias) return null

  const lowered = (nameOrAlias || "").toLowerCase().trim()
  const aliasName = MANUFACTURER_ALIASES[lowered] || nameOrAlias
  const wantedSlug = slugify(aliasName)
  const wantedLower = aliasName.toLowerCase()

  const res = await callTecdoc("getManufacturers", {
    provider: ENV.TECDOC_PROVIDER_ID,
    lang,
    country,
    countryCode,
    articleCountry,
    linkingTargetType: LTT_VEHICLE,
  })
  const list = asArray(res?.data?.array).map(normManu).filter((m) => m.id && m.name)

  const found = list.find(
    (m) => m.slug === wantedSlug || (m.name || "").toLowerCase() === wantedLower
  )
  return found ? Number(found.id) : null
}

async function resolveModelId(opts: {
  manufacturerId: number
  modelName?: string | null
  lang: string
  country: string
  countryCode: string
  articleCountry: string
}) {
  const { manufacturerId, modelName, lang, country, countryCode, articleCountry } = opts
  if (!modelName) return null

  const res = await callTecdoc("getModelSeries", {
    provider: ENV.TECDOC_PROVIDER_ID,
    lang,
    country,
    countryCode,
    articleCountry,
    manuId: manufacturerId,
    linkingTargetType: LTT_VEHICLE,
  })
  const models = asArray(res?.data?.array).map(normModel).filter((m) => m.id)

  const wantedSlug = slugify(modelName)
  const wantedLower = (modelName || "").toLowerCase()

  const found = models.find(
    (m) => m.slug === wantedSlug || (m.name || "").toLowerCase() === wantedLower
  )
  return found ? Number(found.id) : null
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export async function GET(req: Request) {
  const url = new URL(req.url)
  const mode = url.searchParams.get("mode")

  // manufacturer: id of naam/alias
  let manufacturerId = toInt(url.searchParams.get("manufacturerId"))
  const manufacturerName =
    url.searchParams.get("manufacturer") ||
    url.searchParams.get("manuName") ||
    url.searchParams.get("brand")

  // model: id of naam (strikt)
  let modelId = toInt(url.searchParams.get("modelId"))
  const modelName = url.searchParams.get("model") || url.searchParams.get("modelName")

  const ktypNr = toInt(url.searchParams.get("ktypNr")) ?? toInt(url.searchParams.get("kTypNr"))

  // Land/taal defaults uit ENV
  const lang = url.searchParams.get("lang") || ENV.TECDOC_LANG_DEFAULT || "nl"
  const country = url.searchParams.get("country") || ENV.TECDOC_LINKAGE_COUNTRY || "nl"
  const articleCountry = url.searchParams.get("articleCountry") || ENV.TECDOC_ARTICLE_COUNTRIES?.[0] || country
  const countryCode = url.searchParams.get("countryCode") || country

  const debug = url.searchParams.get("debug")

  // Healthcheck
  if (!mode || mode === "ping") {
    return jsonOK({
      ok: true,
      mode: "ping",
      count: 0,
      data: [],
      meta: { message: "vehicles API up", vehicleLTT: LTT_VEHICLE, engineLTT: LTT_ENGINE },
    })
  }

  try {
    switch (mode) {
      // -------------------------------------------------------------------
      // Manufacturers (Passenger Car context, LTT=V)
      // -------------------------------------------------------------------
      case "manufacturers": {
        const reqBody = {
          provider: ENV.TECDOC_PROVIDER_ID,
          lang, country, countryCode, articleCountry,
          linkingTargetType: LTT_VEHICLE,
        }
        logDebug?.("[vehicles] getManufacturers", reqBody)
        const res = await callTecdoc("getManufacturers", reqBody)
        const arr = asArray(res?.data?.array)
        const list = arr.map(normManu).filter((m) => m.id && m.name)
        const meta = maybeAttachDebug(reqBody, debug, res)
        return jsonOK({ ok: true, mode, count: list.length, data: list, meta })
      }

      // -------------------------------------------------------------------
      // Models by manufacturer (id of exacte naam/alias)
      // -------------------------------------------------------------------
      case "models": {
        if (!manufacturerId && manufacturerName) {
          manufacturerId = await resolveManufacturerId({
            nameOrAlias: manufacturerName,
            lang, country, countryCode, articleCountry
          })
        }
        if (!manufacturerId) {
          return jsonERR({ ok: false, mode, error: "Missing manufacturerId (exact name allowed via ?manufacturer=...)" }, 400)
        }

        const reqBody = {
          provider: ENV.TECDOC_PROVIDER_ID,
          lang, country, countryCode, articleCountry,
          manuId: manufacturerId,
          linkingTargetType: LTT_VEHICLE,
        }
        logDebug?.("[vehicles] getModelSeries", reqBody)
        const res = await callTecdoc("getModelSeries", reqBody)
        const arr = asArray(res?.data?.array)
        const list = arr.map(normModel).filter((m) => m.id && m.name)

        const meta = maybeAttachDebug({ ...reqBody, resolvedManufacturerId: manufacturerId }, debug, res)
        return jsonOK({ ok: true, mode, count: list.length, data: list, meta })
      }

      // -------------------------------------------------------------------
      // Types by model (exacte match vereist bij naam-resolve)
      // -------------------------------------------------------------------
      case "types": {
        if (!modelId && modelName) {
          if (!manufacturerId && manufacturerName) {
            manufacturerId = await resolveManufacturerId({
              nameOrAlias: manufacturerName,
              lang, country, countryCode, articleCountry
            })
            if (!manufacturerId) {
              return jsonERR({ ok: false, mode, error: "Manufacturer not found (exact match required)" }, 404)
            }
          }
          if (!manufacturerId) {
            return jsonERR({ ok: false, mode, error: "Missing manufacturerId to resolve modelId" }, 400)
          }
          modelId = await resolveModelId({
            manufacturerId,
            modelName,
            lang, country, countryCode, articleCountry
          })
          if (!modelId) {
            return jsonERR({ ok: false, mode, error: "Model not found (exact match required for this manufacturer)" }, 404)
          }
        }

        if (!modelId) {
          return jsonERR(
            { ok: false, mode, error: "Missing modelId (exact model name required if resolving by name)" },
            400
          )
        }

        const reqBody = {
          provider: ENV.TECDOC_PROVIDER_ID,
          lang, country, countryCode, articleCountry,
          modelId,
          linkingTargetType: LTT_VEHICLE, // "V"
        }
        logDebug?.("[vehicles] getVehicleTypesByModel", reqBody)

        let res: any
        try {
          res = await callTecdoc("getVehicleTypesByModel", reqBody)
        } catch {
          res = await callTecdoc("getTypes", reqBody)
        }

        const arr = asArray(res?.data?.array)
        const list = arr.map(normType).filter((t) => t.id && (t.name || t.engineCode))
        const meta = maybeAttachDebug(reqBody, debug, res)
        return jsonOK({ ok: true, mode, count: list.length, data: list, meta })
      }

      // -------------------------------------------------------------------
      // Vehicle details by kTypNr (Passenger Car, LTT=V)
      // -------------------------------------------------------------------
      case "vehicle": {
        if (!ktypNr) return jsonERR({ ok: false, mode, error: "Missing ktypNr" }, 400)

        const reqBody = {
          provider: ENV.TECDOC_PROVIDER_ID,
          lang, country, countryCode, articleCountry,
          ktypNr,
          linkingTargetType: LTT_VEHICLE,
        }
        logDebug?.("[vehicles] getVehicleByIds", reqBody)

        let res: any
        try {
          res = await callTecdoc("getVehicleByIds", reqBody)
        } catch {
          res = await callTecdoc("getVehicleDetails", reqBody)
        }

        const arr = asArray(res?.data?.array ?? res?.data)
        const first = arr[0] ?? {}
        const vehicle = normVehicle(first)

        const meta = maybeAttachDebug(reqBody, debug, res)
        return jsonOK({
          ok: true,
          mode,
          count: vehicle?.ktypNr ? 1 : 0,
          data: vehicle?.ktypNr ? [vehicle] : [],
          meta,
        })
      }

      // -------------------------------------------------------------------
      // Engines by model (Engine domain, LTT=M) — exacte model-resolve
      // -------------------------------------------------------------------
      case "engines": {
        if (!modelId && modelName) {
          if (!manufacturerId && manufacturerName) {
            manufacturerId = await resolveManufacturerId({
              nameOrAlias: manufacturerName,
              lang, country, countryCode, articleCountry
            })
            if (!manufacturerId) {
              return jsonERR({ ok: false, mode, error: "Manufacturer not found (exact match required)" }, 404)
            }
          }
          if (!manufacturerId) {
            return jsonERR({ ok: false, mode, error: "Missing manufacturerId to resolve modelId" }, 400)
          }
          modelId = await resolveModelId({
            manufacturerId,
            modelName,
            lang, country, countryCode, articleCountry
          })
          if (!modelId) {
            return jsonERR({ ok: false, mode, error: "Model not found (exact match required for this manufacturer)" }, 404)
          }
        }

        if (!modelId) {
          return jsonERR(
            { ok: false, mode, error: "Missing modelId (exact model name required if resolving by name)" },
            400
          )
        }

        const base = {
          provider: ENV.TECDOC_PROVIDER_ID,
          lang, country, countryCode, articleCountry,
          modelId,
          linkingTargetType: LTT_ENGINE, // "M"
        }
        logDebug?.("[vehicles] engines primary payload", base)

        let res: any
        try {
          res = await callTecdoc("getEnginesByModel", base)
        } catch {
          // Fallback via linkage targets
          logDebug?.("[vehicles] engines fallback linkageTargets", base)
          res = await callTecdoc("getLinkageTargets", {
            provider: ENV.TECDOC_PROVIDER_ID,
            linkageTargetCountry: country,
            lang,
            linkageTargetType: LTT_ENGINE, // 'M'
            vehicleModelSeriesIds: modelId,
            perPage: 0,
            page: 1,
          } as any)
        }

        const rawList =
          (Array.isArray(res?.data?.linkageTargets))
            ? res.data.linkageTargets
            : (asArray(res?.data?.array) || [])

        const list = (rawList || [])
          .map((e: any) => {
            const id = e?.linkageTargetId ?? e?.engineId ?? e?.id ?? e?.typeId ?? null
            const name = e?.description ?? e?.engineName ?? e?.typeName ?? e?.name ?? ""
            const kw = e?.powerKwFrom ?? e?.powerKW ?? e?.engineOutputKw ?? null
            const hp = e?.powerHpFrom ?? e?.powerHP ?? e?.engineOutputHp ?? null
            const ccm = e?.cylinderCapacity ?? e?.ccm ?? e?.capacityCCM ?? e?.displacementCCM ?? null
            const code = e?.engineCode ?? e?.code ?? null
            const from = e?.beginYearMonth ?? e?.yearOfConstructionFrom ?? null
            const to = e?.endYearMonth ?? e?.yearOfConstructionTo ?? null

            return {
              id: id ? Number(id) : null,
              name,
              code,
              powerKW: kw ? Number(kw) : null,
              powerHP: hp ? Number(hp) : null,
              ccm,
              from,
              to,
            }
          })
          .filter((x: any) => x.id)

        const meta = maybeAttachDebug({ ...base, resolvedModelId: modelId }, debug, res)
        return jsonOK({ ok: true, mode, count: list.length, data: list, meta })
      }

      default:
        return jsonERR({ ok: false, mode, error: "Unsupported mode" }, 400)
    }
  } catch (err: any) {
    logError?.("Vehicles API error", err)
    const detail = err?.response?.data ?? err?.message ?? (typeof err === "string" ? err : "Unknown error")
    return jsonERR({ ok: false, mode, error: "Internal error while fetching data from TecDoc", detail })
  }
}

// Uptime/health
export async function HEAD() {
  return new NextResponse(null, { status: 200 })
}

// CORS (optioneel)
export async function OPTIONS() {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  }
  return new NextResponse(null, { status: 204, headers })
}
