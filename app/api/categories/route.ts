import { NextResponse } from "next/server";
import { tecdocCall } from "@/lib/tecdoc";
export const dynamic = "force-dynamic";
export async function GET() {
  const data = await tecdocCall("getGenericArticles", {});
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=86400" },
  });
}
