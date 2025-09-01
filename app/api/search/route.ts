/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/search/route.ts
import { NextResponse } from "next/server"
import {
  tecdocCall,
  TecdocOps,
  qp,
  qpn,
} from "@/lib/tecdoc"
import { extractArray } from "@/lib/normalize"
import { ENV } from "@/lib/env"
import { logError, logDebug } from "@/lib/logger"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const carId = qpn(req, "carId")
  const genericArticleId = qpn(req, "genericArticleId")
  const brandNoParam = qp(req, "brandNo")
  const q = qp(req, "q")?.trim()

  const page = qpn(req, "page", 1) || 1
  const perPage = Math.max(1, Math.min(500, qpn(req, "perPage", 48) || 48))

  if (!carId) {
    return NextResponse.json({ error: "Missing carId" }, { status: 400 })
  }

  try {
    // brandNo kan CSV zijn
    const brandNos = (brandNoParam ? String(brandNoParam).split(",") : [])
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n))

    // Basis payload (assigned articles voor voertuig/type)
    const payload: any = {
      linkingTargetId: carId,
      // server-side default uit ENV, maar expliciet "P" schaadt niet
      linkingTargetType: (ENV.TECDOC_DEFAULT_TARGET as any) || "P",
      basicData: true,
      info: true,
      thumbnails: true,
      page,
      perPage,
      ...(genericArticleId ? { genericArticleId } : {}),
      ...(brandNos.length ? { brandNo: { array: brandNos } } : {}),
    }

    // Probeer varianten op volgorde; sommige tenants gebruiken v2/v3
    const ops = [
      TecdocOps.assignedByLinkingTarget,
      TecdocOps.assignedByLinkingTarget2,
      TecdocOps.assignedByLinkingTarget3,
    ]

    let resp: any
    let lastErrLike: any = null
    for (const op of ops) {
      const r = await tecdocCall(op, payload)
      if (typeof r?.status === "number" && r.status >= 300) {
        lastErrLike = r
        continue
      }
      resp = r
      break
    }

    if (!resp) {
      logError("[SEARCH_ROUTE] No variant returned data", lastErrLike)
      return NextResponse.json(
        {
          error: "Assigned articles fetch failed",
          detail:
            lastErrLike?.statusText ||
            lastErrLike?.message ||
            "No variant (v1/v2/v3) returned data",
        },
        { status: 502 }
      )
    }

    // Normaliseren met defensieve mapping
    const list = extractArray<any>(resp)
    let arr = list.map((it: any) => {
      const id =
        it.articleId ??
        it.id ??
        it.articleNo ??
        it.articleNumber ??
        undefined

      const articleNumber = it.articleNumber ?? it.articleNo ?? id ?? ""

      const name =
        it.articleName ??
        it.name ??
        it.title ??
        ""

      const supplier =
        it.supplierName ??
        it.brand ??
        it.mfrName ??
        it.manufacturer ??
        ""

      const gaId =
        it.genericArticleId ??
        it.gaId ??
        it.genericArticle?.id

      const gaName =
        it.genericArticleName ??
        it.genericArticleDescription ??
        it.genericArticle?.name ??
        ""

      // afbeeldingen/thumbnail varianten
      const thumb =
        it.imageUrl ||
        it.thumbnailUrl ||
        it.thumbUrl ||
        it.thumbnails?.[0]?.url ||
        it.images?.[0]?.url ||
        it.imageURL200 ||
        it.imageURL100 ||
        it.imageURL50 ||
        null

      return {
        articleId: id,
        articleNumber,
        articleName: name,
        supplierName: supplier,
        genericArticleId: gaId,
        genericArticleName: gaName,
        imageUrl: thumb,
      }
    })

    // Optionele client-side filter
    if (q) {
      const t = q.toLowerCase()
      arr = arr.filter((r) =>
        String(r.articleName ?? "").toLowerCase().includes(t) ||
        String(r.supplierName ?? "").toLowerCase().includes(t) ||
        String(r.articleNumber ?? "").toLowerCase().includes(t) ||
        String(r.articleId ?? "").includes(q)
      )
    }

    const out = {
      meta: { page, perPage, count: arr.length, carId, genericArticleId, brands: brandNos },
      data: { array: arr },
      status: 200,
    }

    if (ENV.TECDOC_DEBUG) {
      logDebug("[SEARCH_ROUTE] OK", out.meta)
    }

    return NextResponse.json(out, {
      headers: { "Cache-Control": "private, max-age=120" },
    })
  } catch (e: any) {
    logError("[SEARCH_ROUTE] ERROR", e?.message || e)
    return NextResponse.json({ error: String(e?.message || e) }, { status: 502 })
  }
}
