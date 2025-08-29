import { NextResponse } from "next/server";
import { tecdocCall, qp } from "@/lib/tecdoc";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const brandsCsv = qp(req, "brandNo"); // e.g. "41,146,145"
  const linkingTargetId = qp(req, "linkingTargetId");
  const linkingTargetType = qp(req, "linkingTargetType", "P");
  const genericArticleId = qp(req, "genericArticleId");
  const sort = Number(qp(req, "sort", "1"));

  const brandNo = brandsCsv
    ?.split(",")
    .map((s) => Number(s.trim()))
    .filter(Boolean);
  const data = await tecdocCall("getArticleIdsWithState", {
    brandNo: brandNo ? { array: brandNo } : undefined,
    genericArticleId: genericArticleId ? Number(genericArticleId) : undefined,
    linkingTargetId: linkingTargetId ? Number(linkingTargetId) : undefined,
    linkingTargetType,
    sort,
  });
  return NextResponse.json(data, {
    headers: { "Cache-Control": "private, max-age=120" },
  });
}
