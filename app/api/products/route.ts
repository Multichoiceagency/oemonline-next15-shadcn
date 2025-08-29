import { NextResponse } from "next/server"
import { tecdocCall, TecdocOps, qp } from "@/lib/tecdoc"


export const dynamic = "force-dynamic"


export async function GET(req: Request) {
const articleId = qp(req, "articleId")
if (!articleId) return NextResponse.json({ error: "Missing articleId" }, { status: 400 })
const withMedia = qp(req, "media", "1") === "1"


const details = await tecdocCall(TecdocOps.articleById, { articleId })
if (!withMedia) return NextResponse.json(details, { headers: { "Cache-Control": "private, max-age=300" } })


const media = await tecdocCall(TecdocOps.articleImages, { articleId, includeThumbnails: true })
return NextResponse.json({ details, media }, { headers: { "Cache-Control": "private, max-age=300" } })
}