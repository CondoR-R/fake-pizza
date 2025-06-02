import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@prisma/client";

export async function GET(req: NextRequest): Promise<NextResponse<Product[]>> {
  const query = req.nextUrl.searchParams.get("query") || "";

  const products: Product[] = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 5,
  });

  return NextResponse.json(products);
}
