import { NextResponse } from "next/server"
export const dynamic = "force-dynamic"
export async function GET() { return NextResponse.json({ orders: 124, revenue: 18453.22, products: 2300, users: 418 }) }