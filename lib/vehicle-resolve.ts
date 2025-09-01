/* eslint-disable @typescript-eslint/no-explicit-any */
import { tecdocCall, TecdocOps } from "@/lib/tecdoc"

// Normaliseer naam: hoofdletters, trim, collapse spaces
function norm(s: string) {
  return s.normalize("NFKC").replace(/\s+/g, " ").trim().toUpperCase()
}

export async function resolveManufacturerIdByName(name: string) {
  const target = norm(name)
  const r: any = await tecdocCall(TecdocOps.manufacturers, { perPage: 500 })
  const arr: any[] = r?.data ?? r?.array ?? r ?? []
  const hit = arr.find((m) => norm(m.manuName || m.name || "") === target)
  return hit ? Number(hit.manuId ?? hit.manuNo ?? hit.id) : null
}

export async function resolveModelIdByName(manuId: number, modelName: string) {
  const target = norm(modelName)
  const r: any = await tecdocCall(TecdocOps.modelSeries, { manuId, perPage: 500 })
  const arr: any[] = r?.data ?? r?.array ?? r ?? []
  // exact modelnaam (TecDoc labels verschillen; kies de strengste key)
  const keys = ["modelSeriesName", "modelname", "name"]
  const hit = arr.find((m) => keys.some((k) => norm(m?.[k] || "") === target))
  return hit ? Number(hit.modelSeriesId ?? hit.modelId ?? hit.id) : null
}
