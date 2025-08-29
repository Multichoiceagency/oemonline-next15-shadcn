import prisma from "@/lib/prisma";

export async function GET() {
  const [orders, products, users] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.user.count(),
  ]);

  const revenueData = await prisma.order.aggregate({
    _sum: { total: true },
  });

  return Response.json({
    orders,
    products,
    users,
    revenue: revenueData._sum.total || 0,
  });
}
