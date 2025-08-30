import { NextResponse } from "next/server"
import { buildDocUrl } from "@/lib/docs"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const docId = url.searchParams.get("docId")
  const size = Number(url.searchParams.get("size") ?? 200)
  if (!docId) return NextResponse.json({ error: "Missing docId" }, { status: 400 })

  const upstream = buildDocUrl(docId, size)
  const res = await fetch(upstream)
  const buf = await res.arrayBuffer()
  const ct = res.headers.get("content-type") ?? "image/png"

  return new NextResponse(buf, {
    status: res.status,
    headers: { "Content-Type": ct, "Cache-Control": "public, max-age=86400" },
  })
}
