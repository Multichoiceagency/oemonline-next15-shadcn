/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/plates/route.ts
import { NextResponse } from "next/server"
import { ENV } from "@/lib/env"
import { tecdocCall, qp } from "@/lib/tecdoc"
import { logDebug, logError } from "@/lib/logger"

export const dynamic = "force-dynamic"

// NL kenteken normaliseren: G-428-FK -> G428FK
function normalizePlate(raw: string) {
  return String(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "")
}

// keySystemType mapping o.b.v. TecAlliance guide (VRM/KBA/etc.)
const KEY_SYSTEM_TYPE: Record<string, number> = {
  nl: 1,           // VRM (NL)
  de: 20,          // KBA (DE)
  fr: 50,          // VRM (FR)  (Type Mine = 2/21; meestal add. creds)
  gb: 99, ie: 99,  // VRM (GB/IE)
  it: 50, pt: 50,  // VRM
  dk: 95, fi: 95, se: 95, no: 95, // VRM Nordics (vaak add. creds)
  is: 10,          // VRM (IS)
  au: 75, nz: 75,  // VRM (AU/NZ)
  at: 6,           // National code (AT)
  ch: 4,           // Type Permit (CH)
  br: 100,         // VRM (BR)
  mt: 99, es: 99,  // VRM
}

export async function GET(req: Request) {
  if (!ENV.TECDOC_PLATE_ENABLED) {
    return NextResponse.json({ error: "Plate lookup disabled" }, { status: 503 })
  }

  const plateRaw = qp(req, "plate")
  const country = (qp(req, "country", ENV.TECDOC_PLATE_COUNTRY) || "nl").toLowerCase()
  const lang = qp(req, "lang", ENV.TECDOC_LANG_DEFAULT)

  if (!plateRaw) {
    return NextResponse.json({ error: "Missing plate" }, { status: 400 })
  }

  const keySystemNumber = normalizePlate(plateRaw)
  const keySystemCountry = country.toUpperCase()
  const keySystemType = KEY_SYSTEM_TYPE[country] ?? 1 // default NL VRM

  // Gemeenschappelijke velden
  const common = {
    lang,
    country,                 // target market
    countryCode: country,    // sommige installs willen beide
    articleCountry: ENV.TECDOC_ARTICLE_COUNTRIES[0],
    linkingTargetType: "P",  // Passenger
    page: 1,
    perPage: 25,
  }

  // We proberen een paar varianten, want de JSON binding kan per tenant verschillen
  const attempts = [
    {
      note: "flat keySystem* fields",
      payload: {
        ...common,
        keySystemNumber,
        keySystemCountry,
        keySystemType,
      },
    },
    {
      note: "nested keySystem object",
      payload: {
        ...common,
        keySystem: {
          number: keySystemNumber,
          country: keySystemCountry,
          type: keySystemType,
        },
      },
    },
  ] as const

  let lastResp: any = null
  try {
    for (const a of attempts) {
      logDebug("[TecDoc] REQUEST", {
        resource: "getVehiclesByKeyNumberPlates",
        url: ENV.TECDOC_BASE_JSON,
        body: { getVehiclesByKeyNumberPlates: a.payload },
      })

      const resp = await tecdocCall("getVehiclesByKeyNumberPlates", a.payload as any)
      lastResp = resp

      // Als TecDoc een status veld terugstuurt, check het:
      if (resp?.status && resp.status >= 300) {
        logError("[TecDoc][PLATE_STATUS]", resp)
        continue
      }

      logDebug("[TecDoc] RESPONSE OK (plates)", { attempt: a.note })
      return NextResponse.json(resp, {
        headers: { "Cache-Control": "private, max-age=300" },
      })
    }

    // Alle pogingen gaven error
    const status = lastResp?.status ?? 502
    const statusText = lastResp?.statusText || "TecDoc error"
    logError("[TecDoc][PLATE_FAILED]", lastResp)
    return NextResponse.json({ error: statusText, tecdoc: lastResp }, { status })
  } catch (e: any) {
    logError("[TecDoc][PLATE_EXCEPTION]", { message: String(e?.message || e) })
    return NextResponse.json({ error: "Kenteken lookup faalde" }, { status: 502 })
  }
}
