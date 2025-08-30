/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { tecdocCall } from "@/lib/tecdoc"
import { extractArray } from "@/lib/normalize"
import { logError } from "@/lib/logger"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const r = await tecdocCall("getAmBrands", { page: 1, perPage: 1000 })
    const arr = extractArray(r)
    return NextResponse.json({ data: { array: arr }, status: 200 }, { headers: { "Cache-Control": "private, max-age=600" } })
  } catch (e: any) {
    logError("[BRANDS_ROUTE]", e?.message || e)
    return NextResponse.json({ error: String(e?.message || e) }, { status: 502 })
  }
}
