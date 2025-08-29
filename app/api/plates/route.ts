/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/plates/route.ts
import { NextResponse } from "next/server"
import { tecdocCall, qp } from "@/lib/tecdoc"
import { ENV } from "@/lib/env"
import { logDebug, logError } from "@/lib/logger"

export const dynamic = "force-dynamic"

const KEY_SYSTEM_TYPE_BY_COUNTRY: Record<string, number> = {
  nl: 1, // Netherlands VRM
  gb: 99, ie: 99, es: 99, mt: 99,
  au: 75, nz: 75,
  is: 10,
  at: 6, ch: 4, de: 20,
  dk: 95, fi: 95, no: 95, se: 95,
  fr: 50, it: 50, pt: 50,
}

function cleanupPlate(s: string) {
  return s.replace(/[^A-Za-z0-9]/g, "").toUpperCase()
}

export async function GET(req: Request) {
  if (!ENV.TECDOC_PLATE_ENABLED) {
    return NextResponse.json({ error: "Plate lookup disabled" }, { status: 403 })
  }
  const rawPlate = qp(req, "plate")
  if (!rawPlate) return NextResponse.json({ error: "Missing plate" }, { status: 400 })

  const country = (qp(req, "country", ENV.TECDOC_PLATE_COUNTRY) || "nl").toLowerCase()
  const keySystemType = KEY_SYSTEM_TYPE_BY_COUNTRY[country] ?? 1
  const keySystemNumber = cleanupPlate(rawPlate)

  if (keySystemNumber.length < 2) {
    return NextResponse.json({ error: "Kenteken te kort/ongeldig." }, { status: 400 })
  }

  logDebug("[TecDoc][PLATES_INPUT]", { country, keySystemType, keySystemNumber })

  try {
    const data = await tecdocCall("getVehiclesByKeyNumberPlates", {
      keySystemType,
      keySystemNumber,
      country,
      countryCode: country,
      lang: ENV.TECDOC_LANG_DEFAULT,
    })

    if (data?.status && data.status >= 300) {
      logError("[TecDoc][PLATES_STATUS]", { status: data.status, statusText: data.statusText })
      return NextResponse.json({ error: data.statusText || "TecDoc error", tecdoc: data }, { status: 502 })
    }

    return NextResponse.json(data, { headers: { "Cache-Control": "private, max-age=300" } })
  } catch (e: any) {
    logError("[TecDoc][PLATES_EXCEPTION]", { message: String(e?.message || e) })
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 })
  }
}
