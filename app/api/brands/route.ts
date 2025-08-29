// app/api/brands/route.ts
import { NextResponse } from "next/server"
import { tecdocCall } from "@/lib/tecdoc"
import { ENV } from "@/lib/env"

export const dynamic = "force-dynamic"

export async function GET() {
  const resp = await tecdocCall("getAmBrands", {
    articleCountry: ENV.TECDOC_ARTICLE_COUNTRIES[0],
    lang: ENV.TECDOC_LANG_DEFAULT,
  })
  return NextResponse.json(resp, { headers: { "Cache-Control": "private, max-age=3600" } })
}
