import { NextResponse } from "next/server"
export const dynamic = "force-dynamic"
export async function GET() { return NextResponse.json([{ id: "o_1", total: 129.95, status: "paid" }]) }