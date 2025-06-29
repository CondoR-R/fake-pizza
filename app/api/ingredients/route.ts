import { prisma } from "@/shared/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const ingredients = await prisma.ingredient.findMany();

  return NextResponse.json(ingredients);
}
