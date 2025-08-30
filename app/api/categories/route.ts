/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { tecdocCall, qp, qpn } from "@/lib/tecdoc"
import { extractArray } from "@/lib/normalize"
import { logError } from "@/lib/logger"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const carId = qpn(req, "carId")
  if (!carId) return NextResponse.json({ error: "Missing carId" }, { status: 400 })

  const brandNo = qp(req, "brandNo")
  const q = qp(req, "q")?.trim()

  try {
    let catsResp = await tecdocCall("getGenericArticlesByLinkingTarget", {
      linkingTargetId: carId,
      linkingTargetType: "P",
      page: 1,
      perPage: 500,
    })
    if (catsResp?.status >= 300 || extractArray(catsResp).length === 0) {
      catsResp = await tecdocCall("getGenericArticles", {
        linkingTargetId: carId,
        linkingTargetType: "P",
        page: 1,
        perPage: 500,
      })
    }

    let cats = extractArray(catsResp).map((c: any) => ({
      genericArticleId: c.genericArticleId ?? c.gaId ?? c.id,
      name: c.genericArticleName ?? c.name ?? c.text,
      count: Number.isFinite(c.count) ? c.count : undefined,
    }))

    // optioneel: tel artikelen per GA voor specifieke merken
    if (brandNo) {
      const brands = String(brandNo).split(",").map((s) => Number(s.trim())).filter(Number.isFinite)
      if (brands.length) {
        const state = await tecdocCall("getArticleIdsWithState", {
          brandNo: { array: brands },
          linkingTargetId: carId,
          linkingTargetType: "P",
          sort: 1,
          page: 1,
          perPage: 10000,
        })
        const arr = extractArray(state)
        const byGa = new Map<number, number>()
        for (const it of arr) {
          const ga = it.genericArticleId ?? it.gaId
          if (!ga) continue
          byGa.set(ga, (byGa.get(ga) || 0) + 1)
        }
        cats = cats.map((c) => ({ ...c, count: byGa.get(c.genericArticleId) ?? c.count ?? 0 }))
      }
    }

    if (q) {
      const t = q.toLowerCase()
      cats = cats.filter((c) => (c.name ?? "").toLowerCase().includes(t))
    }

    return NextResponse.json({ data: { array: cats }, status: 200 }, { headers: { "Cache-Control": "private, max-age=300" } })
  } catch (e: any) {
    logError("[CATEGORIES_ROUTE]", e?.message || e)
    return NextResponse.json({ error: String(e?.message || e) }, { status: 502 })
  }
}
