/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/search/route.ts
import { NextResponse } from "next/server"
import { tecdocCall, qp, qpn } from "@/lib/tecdoc"
import { logDebug, logError } from "@/lib/logger"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const q = qp(req, "q") || undefined
  const page = qpn(req, "page", 1)
  const perPage = qpn(req, "perPage", 25)

  const brandNoRaw = qp(req, "brandNo") // "30" of "30,41"
  const genericArticleId = qpn(req, "genericArticleId")
  const carId = qpn(req, "carId")
  const linkingTargetType = qp(req, "linkingTargetType", "P")

  const params: Record<string, any> = { page, perPage }
  if (q) params.searchQuery = q
  if (brandNoRaw) {
    const list = brandNoRaw.split(",").map((s) => Number(s.trim())).filter(Boolean)
    if (list.length) params.brandNo = { array: list }
  }
  if (genericArticleId) params.genericArticleId = genericArticleId
  if (carId) { params.linkingTargetId = carId; params.linkingTargetType = linkingTargetType }

  logDebug("[TecDoc] SEARCH_PARAMS", params)

  try {
    const data = await tecdocCall("getArticles", params)
    if (data?.status && data.status >= 300) {
      logError("[TecDoc][SEARCH_STATUS]", data)
      return NextResponse.json({ error: data.statusText || "TecDoc error", tecdoc: data }, { status: 502 })
    }
    return NextResponse.json(data, { headers: { "Cache-Control": "private, max-age=60" } })
  } catch (e: any) {
    logError("[TecDoc][SEARCH_EXCEPTION]", { message: String(e?.message || e) })
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
