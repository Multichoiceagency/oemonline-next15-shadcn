import prisma from "@/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { user: true },
  });
  return Response.json(orders);
}

export async function POST(req: Request) {
  const body = await req.json();
  const order = await prisma.order.create({ data: body });
  return Response.json(order);
}
