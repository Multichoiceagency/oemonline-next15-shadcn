import { NextResponse } from "next/server";
import { tecdocCall, qp } from "@/lib/tecdoc";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const resource = qp(req, "resource", "articleSearchByTerm")!;
  const q = qp(req, "q", "oil filter");
  const data = await tecdocCall(resource, { searchQuery: q, term: q });
  return NextResponse.json({ ok: true, resource, data });
}
