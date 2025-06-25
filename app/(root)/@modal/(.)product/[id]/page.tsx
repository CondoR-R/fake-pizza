import * as React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  ChooseProductModal,
  Container,
  ProductImage,
  ProductInfo,
} from "@/components/shared";
import Link from "next/link";

type Props = {
  className?: string;
  params: { id: string };
};

export default async function ProductModalPage({ params: { id } }: Props) {
  const product = await prisma.product.findFirst({
    where: { id: +id },
    include: {
      ingredients: true,
      items: true,
    },
  });
  // const category = await prisma.category.findFirst({
  //   where: { id: product?.categoryId },
  // });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
