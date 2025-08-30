/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/brands/by-vehicle/route.ts
import { NextResponse } from "next/server"
import { tecdocCall, qpn } from "@/lib/tecdoc"
import { extractArray } from "@/lib/normalize"
import { logError } from "@/lib/logger"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const carId = qpn(req, "carId")
  if (!carId) return NextResponse.json({ error: "Missing carId" }, { status: 400 })

  try {
    // Haal een ruime set artikelen op en aggregeer merken client-side
    const resp = await tecdocCall("getAssignedArticlesByLinkingTarget", {
      linkingTargetId: carId,
      linkingTargetType: "P",
      basicData: false,
      info: false,
      thumbnails: false,
      page: 1, perPage: 500,
    })
    const arr = extractArray(resp)
    const byBrand = new Map<string, number>()
    for (const it of arr) {
      const name = it.supplierName ?? it.brand ?? it.mfrName
      if (!name) continue
      byBrand.set(name, (byBrand.get(name) || 0) + 1)
    }
    const out = [...byBrand.entries()].map(([brandName, count], i) => ({
      brandNo: i + 1, // TecDoc brandNo onbekend in dit antwoord; dit is puur UI-teller
      brandName, count,
    }))
    return NextResponse.json({ data: { array: out }, status: 200 }, { headers: { "Cache-Control": "private, max-age=300" } })
  } catch (e: any) {
    logError("[BRANDS_BY_VEHICLE_ROUTE]", e?.message || e)
    return NextResponse.json({ error: String(e?.message || e) }, { status: 502 })
  }
}
