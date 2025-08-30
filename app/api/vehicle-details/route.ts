/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { qp, qpn, tecdocCall } from "@/lib/tecdoc"
import { extractArray, first } from "@/lib/normalize"
import { logDebug, logError } from "@/lib/logger"
import { ENV } from "@/lib/env"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const carId = qpn(req, "carId")
  if (!carId) return NextResponse.json({ error: "Missing carId" }, { status: 400 })
  const carIdNum = Number(carId)

  const lang = qp(req, "lang", ENV.TECDOC_LANG_DEFAULT)
  const lc = (qp(req, "country", ENV.TECDOC_LINKAGE_COUNTRY) ?? ENV.TECDOC_LINKAGE_COUNTRY).toLowerCase()
  const UC = lc.toUpperCase()
  const common = {
    lang, country: lc, countryCode: lc, articleCountry: lc,
    countriesCarSelection: lc, countryGroupFlag: false, linkingTargetType: "P" as const,
  }

  const attempts = [
    { note: "getVehiclesByIds2", resource: "getVehiclesByIds2", payload: { ...common, carIds: { array: [carIdNum] }, page: 1, perPage: 1 } },
    { note: "getLinkageTargetsByCarIds", resource: "getLinkageTargetsByCarIds", payload: { ...common, country: UC, carIds: { array: [carIdNum] }, includeLinkedData: true, includeDetails: true, page: 1, perPage: 1 } },
    { note: "getLinkageTargets", resource: "getLinkageTargets", payload: { ...common, country: UC, linkingTargetId: carIdNum, includeLinkedData: true, includeDetails: true, page: 1 } },
  ]

  let last: any = null
  for (const a of attempts) {
    try {
      logDebug("VEHICLE_DETAILS_REQUEST", { resource: a.resource, payload: a.payload })
      const resp = await tecdocCall(a.resource, a.payload)
      last = resp
      if (resp?.status >= 300) {
        logError("VEHICLE_DETAILS_STATUS", { note: a.note, status: resp.status, statusText: resp.statusText })
        continue
      }
      const arr = extractArray(resp)
      const item = first<any>(arr) || first<any>(resp) || resp?.data || resp
      const normalized = normalizeVehicle(item, carIdNum)
      return NextResponse.json({ ok: true, resource: a.resource, data: resp, normalized }, { headers: { "Cache-Control": "private, max-age=300" } })
    } catch (e: any) {
      logError("VEHICLE_DETAILS_EXCEPTION", { note: a.note, message: String(e?.message || e) })
    }
  }
  const status = last?.status ?? 502
  return NextResponse.json({ error: last?.statusText || "TecDoc error", tecdoc: last }, { status })
}

function normalizeVehicle(raw: any, fallbackCarId: number) {
  if (!raw) return { carId: fallbackCarId }
  const manuId = raw.manuId ?? raw.manufacturerId ?? raw.manuNo
  const manuName = raw.manuName ?? raw.manufacturerName ?? raw.brandName
  const modelSeriesId = raw.modelSeriesId ?? raw.modelId ?? raw.modId
  const modelName = raw.modelSeriesName ?? raw.modelName
  const typeId = raw.carId ?? raw.typeId ?? fallbackCarId
  const typeName = raw.carName ?? raw.typeName ?? raw.typeDescription
  const yearFrom = raw.yearOfConstrFrom ?? raw.constructionStartYear ?? raw.fromYear
  const yearTo = raw.yearOfConstrTo ?? raw.constructionEndYear ?? raw.toYear
  return {
    manuId: num(manuId), manuName: str(manuName),
    modelSeriesId: num(modelSeriesId), modelName: str(modelName),
    typeId: num(typeId), typeName: str(typeName),
    yearFrom: num(yearFrom), yearTo: num(yearTo),
    raw,
  }
}
function num(v: any) { const n = Number(v); return Number.isFinite(n) ? n : undefined }
function str(v: any) { return v != null ? String(v) : undefined }
