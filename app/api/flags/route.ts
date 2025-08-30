// app/api/flags/route.ts
import { NextResponse } from "next/server"
import { ENV } from "@/lib/env"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json({
    tecdoc: {
      plateEnabled: ENV.TECDOC_PLATE_ENABLED,
      plateCountry: ENV.TECDOC_PLATE_COUNTRY,
      langDefault: ENV.TECDOC_LANG_DEFAULT,
      linkageCountry: ENV.TECDOC_LINKAGE_COUNTRY,
      tecdocDebug: ENV.TECDOC_DEBUG,
    },
  }, {
    headers: { "Cache-Control": "private, max-age=60" },
  })
}
