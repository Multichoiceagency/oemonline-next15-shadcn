import { NextResponse } from "next/server"
export const dynamic = "force-dynamic"
export async function GET() { return NextResponse.json([{ id: "u_1", email: "alice@example.com" }]) }