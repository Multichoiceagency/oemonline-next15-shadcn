/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/tecdoc.ts
import { ENV } from "./env"
import { logDebug, logError } from "./logger"

/** Veelgebruikte TecDoc resources als vaste mapping (type-safe). */
export const TecdocOps = {
  // Vehicle tree
  manufacturers: "getManufacturers",
  modelSeries: "getModelSeries",
  types: "getTypes",

  // Vehicle details / linkages
  vehiclesByIds2: "getVehiclesByIds2",
  linkageTargets: "getLinkageTargets",
  linkageTargetsByCarIds: "getLinkageTargetsByCarIds",

  // Plate (let op: sommige tenants vereisen extra keySystemNumber)
  vehiclesByPlate: "getVehiclesByKeyNumberPlates",

  // Brands
  amBrands: "getAmBrands",

  // Categories (Generic Articles)
  genericArticles: "getGenericArticles",
  genericArticlesByLinkingTarget: "getGenericArticlesByLinkingTarget",

  // Article IDs / staat
  articleIdsWithState: "getArticleIdsWithState",

  // Assigned articles (producten) voor voertuig
  assignedByLinkingTarget: "getAssignedArticlesByLinkingTarget",
  assignedByLinkingTarget2: "getAssignedArticlesByLinkingTarget2",
  assignedByLinkingTarget3: "getAssignedArticlesByLinkingTarget3",
  assignedByIds6: "getAssignedArticlesByIds6",

  // Article details / media (varianten verschillen per tenant)
  articleSearchByTerm: "articleSearchByTerm",
  articleById: "getArticles",
  articleMediaByIds: "getArticleMediaByIds",
  articleMediaByIds6: "getArticleMediaByIds6",
} as const

export type TecdocOp = typeof TecdocOps[keyof typeof TecdocOps]
export type TecdocResource = string

/** Query helper: string */
export function qp(req: Request, key: string, def?: string) {
  const url = new URL(req.url)
  const val = url.searchParams.get(key)
  return val == null ? def : val
}

/** Query helper: number */
export function qpn(req: Request, key: string, def?: number) {
  const v = qp(req, key)
  if (v == null) return def
  const n = Number(v)
  return Number.isFinite(n) ? n : def
}

/** Sommige endpoints verwachten { array: [...] } i.p.v. een kale array. */
export function toArrayParam<T = any>(a?: T[] | null) {
  if (!a || a.length === 0) return undefined
  return { array: a }
}

/** Basis JSON endpoint */
export const TECDOC_ENDPOINT =
  ENV.TECDOC_BASE_JSON ||
  "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint"

/** Veel voorkomende defaultvelden – worden per call toegevoegd tenzij overschreven. */
const COMMON_DEFAULTS = {
  lang: ENV.TECDOC_LANG_DEFAULT,
  country: ENV.TECDOC_LINKAGE_COUNTRY,
  countryCode: ENV.TECDOC_LINKAGE_COUNTRY,
  articleCountry:
    ENV.TECDOC_ARTICLE_COUNTRIES[0] ?? ENV.TECDOC_LINKAGE_COUNTRY,
}

/** Verwijdert undefined/null waarden uit een object. */
function clean<T extends Record<string, any>>(obj: T): T {
  const out: Record<string, any> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue
    out[k] = v
  }
  return out as T
}

/** Plakt ?api_key=... (of &api_key=...) aan de endpoint-URL als die nog niet aanwezig is. */
function withApiKey(url: string, apiKey?: string) {
  if (!apiKey) return url
  const hasQuery = url.includes("?")
  return url + (hasQuery ? "&" : "?") + "api_key=" + encodeURIComponent(apiKey)
}

/**
 * Algemene TecDoc JSON-call.
 *
 * Belangrijk:
 * - POST naar de *basis* jsonEndpoint (dus **niet** /<resource> achter de URL)
 * - Body: { [resource]: { provider, ...fields } }
 * - API key zetten we zowel als header **X-Api-Key** als in de query (?api_key=...)
 * - Caller moet velden als `linkingTargetType: "P"` zelf toevoegen waar vereist
 * - Pagination is *plat*: `page`, `perPage` (geen `{ number, size }`)
 */
export async function tecdocCall<T = any>(
  resource: TecdocResource,
  payload: Record<string, any>
): Promise<T> {
  const bodyObj: Record<string, any> = {
    [resource]: clean({
      provider: ENV.TECDOC_PROVIDER_ID,
      ...COMMON_DEFAULTS,
      ...payload,
    }),
  }

  const url = withApiKey(TECDOC_ENDPOINT, ENV.TECDOC_API_KEY)

  logDebug("REQUEST", { resource, url, body: bodyObj })

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(ENV.TECDOC_API_KEY ? { "X-Api-Key": ENV.TECDOC_API_KEY } : {}),
    },
    body: JSON.stringify(bodyObj),
    cache: "no-store",
  })

  let data: any
  try {
    data = await res.json()
  } catch {
    const text = await res.text().catch(() => "")
    data = { status: res.status, statusText: text || res.statusText }
  }

  // TecDoc zet vaak {status,statusText} in de payload; behandel dat als fout.
  if (!res.ok || (typeof data?.status === "number" && data.status >= 300)) {
    logError("RESPONSE", data ?? { status: res.status, statusText: res.statusText })
    // Geef de TecDoc payload terug zodat de caller status/statusText kan tonen/loggen.
    return (data ??
      ({ status: res.status, statusText: res.statusText } as any)) as T
  }

  logDebug("RESPONSE", data)
  return data as T
}
