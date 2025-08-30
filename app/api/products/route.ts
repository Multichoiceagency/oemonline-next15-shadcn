/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { tecdocCall, qp, qpn } from "@/lib/tecdoc"
import { extractArray } from "@/lib/normalize"
import { logError } from "@/lib/logger"

export const dynamic = "force-dynamic"

function pickPrice(it: any) {
  const p =
    it?.price ??
    it?.prices?.[0] ??
    it?.prices?.array?.[0] ??
    it?.prices?.data?.array?.[0] ??
    it?.priceInformation ??
    it?.priceDetails
  let amount =
    p?.price ?? p?.amount ?? p?.value ?? p?.netPrice ?? p?.grossPrice ?? p?.salesPrice
  const currency = p?.currency ?? p?.currencyCode ?? "EUR"
  if (typeof amount === "string") {
    amount = Number(amount.replace(",", "."))
  }
  return {
    amount: Number.isFinite(amount) ? Number(amount) : undefined,
    currency,
  }
}

export async function GET(req: Request) {
  const carId = qpn(req, "carId")
  if (!carId) return NextResponse.json({ error: "Missing carId" }, { status: 400 })

  const genericArticleId = qpn(req, "genericArticleId")
  const brandNoParam = qp(req, "brandNo")
  const q = qp(req, "q")?.trim()
  const page = qpn(req, "page", 1) || 1
  const perPage = qpn(req, "perPage", 48) || 48

  try {
    const brandNos = (brandNoParam ? String(brandNoParam).split(",") : [])
      .map((s) => Number(s.trim()))
      .filter(Number.isFinite)

    const payload: any = {
      linkingTargetId: carId,
      linkingTargetType: "P",
      basicData: true,
      info: true,
      thumbnails: true,
      prices: true,              // ← vraag prijzen op
      page, perPage,
    }
    if (genericArticleId) payload.genericArticleId = genericArticleId
    if (brandNos.length) payload.brandNo = { array: brandNos }

    let resp = await tecdocCall("getAssignedArticlesByLinkingTarget", payload)
    if (resp?.status >= 300) resp = await tecdocCall("getAssignedArticlesByLinkingTarget2", payload)
    if (resp?.status >= 300) resp = await tecdocCall("getAssignedArticlesByLinkingTarget3", payload)

    let arr = extractArray(resp).map((it: any) => {
      const { amount, currency } = pickPrice(it)
      return {
        articleId: it.articleId ?? it.id,
        articleName: it.articleName ?? it.name,
        supplierName: it.supplierName ?? it.brand ?? it.mfrName,
        genericArticleId: it.genericArticleId ?? it.gaId,
        genericArticleName: it.genericArticleName ?? it.genericArticleDescription,
        imageUrl: it.imageUrl ?? it.thumbnailUrl ?? it.thumbUrl ?? it.thumbnails?.[0]?.url,
        price: amount,
        currency,
      }
    })

    if (q) {
      const t = q.toLowerCase()
      arr = arr.filter(
        (r) =>
          String(r.articleName ?? "").toLowerCase().includes(t) ||
          String(r.supplierName ?? "").toLowerCase().includes(t) ||
          String(r.articleId ?? "").includes(q)
      )
    }

    return NextResponse.json(
      { data: { array: arr, page, perPage }, status: 200 },
      { headers: { "Cache-Control": "private, max-age=90" } }
    )
  } catch (e: any) {
    logError("[PRODUCTS_ROUTE]", e?.message || e)
    return NextResponse.json({ error: String(e?.message || e) }, { status: 502 })
  }
}
