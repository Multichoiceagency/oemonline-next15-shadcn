/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/search/route.ts
import { NextResponse } from "next/server"
import { tecdocCall, qp, qpn } from "@/lib/tecdoc"
import { extractArray } from "@/lib/normalize"
import { logError } from "@/lib/logger"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const carId = qpn(req, "carId")
  const genericArticleId = qpn(req, "genericArticleId")
  const brandNoParam = qp(req, "brandNo")
  const q = qp(req, "q")?.trim()

  const page = qpn(req, "page", 1) || 1
  const perPage = qpn(req, "perPage", 48) || 48

  if (!carId) return NextResponse.json({ error: "Missing carId" }, { status: 400 })

  try {
    const brandNos = (brandNoParam ? String(brandNoParam).split(",") : [])
      .map(s => Number(s.trim()))
      .filter(n => Number.isFinite(n))

    // Primair: Assigned articles by linking target (voertuig), optioneel GA + Brands
    const payload: any = {
      linkingTargetId: carId,
      linkingTargetType: "P",
      basicData: true,
      info: true,
      thumbnails: true,
      page, perPage,
    }
    if (genericArticleId) payload.genericArticleId = genericArticleId
    if (brandNos.length > 0) payload.brandNo = { array: brandNos }

    let resp = await tecdocCall("getAssignedArticlesByLinkingTarget", payload)

    // fallback varianten (sommige tenants gebruiken v2/3/6 suffixen)
    if (resp?.status >= 300) {
      resp = await tecdocCall("getAssignedArticlesByLinkingTarget2", payload)
    }
    if (resp?.status >= 300) {
      resp = await tecdocCall("getAssignedArticlesByLinkingTarget3", payload)
    }

    let arr = extractArray(resp).map((it: any) => ({
      articleId: it.articleId ?? it.id,
      articleName: it.articleName ?? it.name,
      supplierName: it.supplierName ?? it.brand ?? it.mfrName,
      genericArticleId: it.genericArticleId ?? it.gaId,
      genericArticleName: it.genericArticleName ?? it.genericArticleDescription,
      imageUrl: it.imageUrl ?? it.thumbnailUrl ?? it.thumbUrl ?? it.thumbnails?.[0]?.url,
    }))

    // Client-side naam/nummer filter, als q is opgegeven
    if (q) {
      const t = q.toLowerCase()
      arr = arr.filter((r) =>
        String(r.articleName ?? "").toLowerCase().includes(t) ||
        String(r.supplierName ?? "").toLowerCase().includes(t) ||
        String(r.articleId ?? "").includes(q)
      )
    }

    return NextResponse.json({ data: { array: arr }, status: 200 }, { headers: { "Cache-Control": "private, max-age=120" } })
  } catch (e: any) {
    logError("[SEARCH_ROUTE]", e?.message || e)
    return NextResponse.json({ error: String(e?.message || e) }, { status: 502 })
  }
}
