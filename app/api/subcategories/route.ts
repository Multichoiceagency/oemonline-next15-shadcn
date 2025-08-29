/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/subcategories/route.ts
import { NextResponse } from "next/server"
import { tecdocCall, qp, qpn } from "@/lib/tecdoc"
import { logDebug, logError } from "@/lib/logger"

export const dynamic = "force-dynamic"

function pickCarIdFromQuery(req: Request) {
  return qpn(req, "carId") ?? qpn(req, "typeId") ?? qpn(req, "kType")
}

export async function GET(req: Request) {
  const carId = pickCarIdFromQuery(req)
  if (!carId) return NextResponse.json({ error: "Missing carId" }, { status: 400 })

  const q = qp(req, "q") || undefined
  const brandNoCsv = qp(req, "brandNo")
  const brandNos = brandNoCsv?.split(",").map(s => Number(s.trim())).filter(Boolean)

  const params: Record<string, any> = {
    linkingTargetId: carId,
    linkingTargetType: "P",
    page: 1,
    perPage: 300,
  }
  if (q) params.searchQuery = q
  if (brandNos?.length) params.brandNo = { array: brandNos }

  try {
    const resp = await tecdocCall("getArticles", params)
    if (resp?.status && resp.status >= 300) {
      logError("[TecDoc][SUBCATS_STATUS]", resp)
      return NextResponse.json({ error: resp.statusText || "TecDoc error", tecdoc: resp }, { status: 502 })
    }

    const arr: any[] = Array.isArray(resp?.data?.array) ? resp.data.array : []
    const map = new Map<number, { genericArticleId: number; name: string; count: number }>()
    for (const it of arr) {
      const id = Number(it?.genericArticleId ?? it?.genericArticleNumber)
      if (!Number.isFinite(id)) continue
      const name = String(it?.genericArticleName ?? it?.genericArticleDescription ?? "Onbekend")
      const prev = map.get(id)
      if (prev) prev.count++
      else map.set(id, { genericArticleId: id, name, count: 1 })
    }
    const out = [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))

    logDebug("[TecDoc] SUBCATS_OK", { carId, size: out.length })
    return NextResponse.json({ data: { array: out }, status: 200 }, { headers: { "Cache-Control": "private, max-age=120" } })
  } catch (e: any) {
    logError("[TecDoc][SUBCATS_EXCEPTION]", { message: String(e?.message || e) })
    return NextResponse.json({ error: "Kon subcategorieën niet bepalen" }, { status: 502 })
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const carId = Number(body?.carId ?? body?.typeId ?? body?.kType)
  if (!Number.isFinite(carId)) return NextResponse.json({ error: "Missing carId" }, { status: 400 })

  const q = typeof body?.q === "string" ? body.q : undefined
  const brandNos = Array.isArray(body?.brandNo) ? body.brandNo.map((n: any) => Number(n)).filter(Number.isFinite) : undefined

  const params: Record<string, any> = {
    linkingTargetId: carId,
    linkingTargetType: "P",
    page: Number(body?.page ?? 1),
    perPage: Number(body?.perPage ?? 300),
  }
  if (q) params.searchQuery = q
  if (brandNos?.length) params.brandNo = { array: brandNos }

  try {
    const resp = await tecdocCall("getArticles", params)
    if (resp?.status && resp.status >= 300) {
      logError("[TecDoc][SUBCATS_STATUS]", resp)
      return NextResponse.json({ error: resp.statusText || "TecDoc error", tecdoc: resp }, { status: 502 })
    }
    const arr: any[] = Array.isArray(resp?.data?.array) ? resp.data.array : []
    const map = new Map<number, { genericArticleId: number; name: string; count: number }>()
    for (const it of arr) {
      const id = Number(it?.genericArticleId ?? it?.genericArticleNumber)
      if (!Number.isFinite(id)) continue
      const name = String(it?.genericArticleName ?? it?.genericArticleDescription ?? "Onbekend")
      const prev = map.get(id)
      if (prev) prev.count++
      else map.set(id, { genericArticleId: id, name, count: 1 })
    }
    const out = [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    return NextResponse.json({ data: { array: out }, status: 200 }, { headers: { "Cache-Control": "private, max-age=120" } })
  } catch (e: any) {
    logError("[TecDoc][SUBCATS_EXCEPTION]", { message: String(e?.message || e) })
    return NextResponse.json({ error: "Kon subcategorieën niet bepalen" }, { status: 502 })
  }
}
