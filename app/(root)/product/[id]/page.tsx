import * as React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Container, ProductImage, ProductInfo } from "@/components/shared";
import Link from "next/link";

interface Props {
  className?: string;
  params: { id: string };
}

export default async function ProductPage({ params: { id } }: Props) {
  const product = await prisma.product.findFirst({
    where: { id: +id },
    include: {
      ingredients: true,
      items: true,
    },
  });
  const category = await prisma.category.findFirst({
    where: { id: product?.categoryId },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="my-10">
      {/*Навигационный путь*/}
      <div className="mb-10 flex gap-2">
        <Link href={"/public"}>Главная</Link>
        <span className="text-gray-200">/</span>
        <Link href={`/public#Пиццы`}>{category?.name}</Link>
        <span className="text-gray-200">/</span>
        <span className="text-gray-500">{product.name}</span>
      </div>

      {/*Информация о товаре*/}
      <div className="flex gap-11">
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          size="md"
          className="bg-secondary rounded-lg"
        />
        <ProductInfo product={product} />
      </div>
    </Container>
  );
}
