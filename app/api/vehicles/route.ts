// app/api/vehicles/route.ts
import { NextResponse } from "next/server"
import { tecdocCall, qp, qpn } from "@/lib/tecdoc"
import { ENV } from "@/lib/env"
import { extractArray, toOptions } from "@/lib/normalize"
import { logDebug } from "@/lib/logger"

export const dynamic = "force-dynamic"

/**
 * GET /api/vehicles?mode=manufacturers
 * GET /api/vehicles?mode=models&manufacturerId=121
 * GET /api/vehicles?mode=types&modelSeriesId=463
 */
export async function GET(req: Request) {
  const mode = qp(req, "mode", "manufacturers")!
  const carType = qp(req, "carType", "P") as "P"|"O"|"L"
  const lang = qp(req, "lang", ENV.TECDOC_LANG_DEFAULT)
  const country = qp(req, "country", ENV.TECDOC_LINKAGE_COUNTRY)

  if (mode === "manufacturers") {
    const resp = await tecdocCall("getManufacturers", { carType, lang, country })
    const list = toOptions("manufacturer", extractArray(resp))
    logDebug("[TecDoc] VEHICLES_MANU", { count: list.length })
    return NextResponse.json({ data: { array: list }, status: 200 })
  }

  if (mode === "models") {
    const manufacturerId = qpn(req, "manufacturerId")
    if (!manufacturerId) return NextResponse.json({ error: "Missing manufacturerId" }, { status: 400 })
    const resp = await tecdocCall("getModelSeries", { manufacturerId, carType, lang, country })
    const list = toOptions("model", extractArray(resp))
    logDebug("[TecDoc] VEHICLES_MODEL", { manufacturerId, count: list.length })
    return NextResponse.json({ data: { array: list }, status: 200 })
  }

  if (mode === "types") {
    const modelSeriesId = qpn(req, "modelSeriesId")
    if (!modelSeriesId) return NextResponse.json({ error: "Missing modelSeriesId" }, { status: 400 })
    const resp = await tecdocCall("getVehicleIdsByCriteria", {
      carType,
      lang,
      countriesCarSelection: country,
      countryGroupFlag: false,
      modelSeriesId,
    })
    const list = toOptions("type", extractArray(resp))
    logDebug("[TecDoc] VEHICLES_TYPES", { modelSeriesId, count: list.length })
    return NextResponse.json({ data: { array: list }, status: 200 })
  }

  return NextResponse.json({ error: "Unknown mode" }, { status: 400 })
}
