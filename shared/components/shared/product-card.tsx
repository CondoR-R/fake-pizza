import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <div className={cn("", className)}>
      <Link href={`/product/${id}`} scroll={false}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px] mb-3">
          <Image
            src={imageUrl}
            alt={name}
            width={215}
            height={215}
            className="w-[215px] h-[215px]"
          />
        </div>

        <Title text={name} size="sm" className="mb-1 font-bold" />

        <p className="text-sm text-gray-400 mb-4">
          Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус
          альфредо, чеснок
        </p>

        <div className="flex justify-between items-center">
          <span className="text-[20px]">
            от <b>{price} руб.</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
