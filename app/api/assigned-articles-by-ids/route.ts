import { NextResponse } from "next/server";
import { tecdocCall } from "@/lib/tecdoc";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const pairs = Array.isArray(body?.articleIdPairs) ? body.articleIdPairs : [];
  const data = await tecdocCall("getAssignedArticlesByIds6", {
    articleIdPairs: { array: pairs },
    attributs: true,
    basicData: true,
    documents: true,
    eanNumbers: true,
    immediateAttributs: true,
    immediateInfo: true,
    info: true,
    linkingTargetType: body?.linkingTargetType ?? "P",
    linkingTargetId: body?.linkingTargetId
      ? Number(body.linkingTargetId)
      : undefined,
    manuId: body?.manuId ? Number(body.manuId) : undefined,
    modId: body?.modId ? Number(body.modId) : undefined,
    normalAustauschPrice: false,
    prices: false,
    replacedByNumbers: false,
    replacedNumbers: false,
    thumbnails: true,
    usageNumbers: false,
  });
  return NextResponse.json(data, {
    headers: { "Cache-Control": "private, max-age=300" },
  });
}
