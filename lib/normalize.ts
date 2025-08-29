/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractArray(payload: any): any[] {
  if (!payload) return []
  if (Array.isArray(payload?.data?.array)) return payload.data.array
  const d: any = payload.data ?? payload.result ?? payload
  if (Array.isArray(d?.array)) return d.array
  if (d && typeof d === "object") {
    for (const k of Object.keys(d)) {
      const v: any = d[k]
      if (Array.isArray(v)) return v
      if (v && typeof v === "object" && Array.isArray(v.array)) return v.array
    }
  }
  return []
}

export function first<T = any>(payload: any): T | undefined {
  const arr = extractArray(payload); return arr[0]
}

/** Normaliseer records naar { id, name } voor dropdowns. */
export function toOptions(kind: "manufacturer"|"model"|"type", arr: any[]): Array<{id:number; name:string; raw:any}> {
  return (arr ?? []).map((it: any) => {
    if (kind === "manufacturer") {
      const id   = it.manuId ?? it.manuNo ?? it.id
      const name = it.manuName ?? it.name ?? it.description
      return { id: Number(id), name: String(name ?? id), raw: it }
    }
    if (kind === "model") {
      const id   = it.modelSeriesId ?? it.modId ?? it.id
      const name = it.modelSeriesName ?? it.modelname ?? it.name
      return { id: Number(id), name: String(name ?? id), raw: it }
    }
    // type
    const id   = it.typeId ?? it.carId ?? it.kType ?? it.vehicleId ?? it.id
    const name = it.typeName ?? it.carName ?? it.vehicleName ?? it.name
    return { id: Number(id), name: String(name ?? id), raw: it }
  }).filter(o => Number.isFinite(o.id))
}
