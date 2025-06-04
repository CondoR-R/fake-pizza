import * as React from "react";
import { cn } from "@/lib/utils";
import { Ingredient, Product, ProductItem } from "@prisma/client";
import { Title } from "@/components/shared/title";
import { GroupVariants } from "@/components/shared/group-variants";

interface Item extends Product {
  ingredients: Ingredient[];
  items: ProductItem[];
}

interface Props {
  className?: string;
  product: Item;
}

export const ProductInfo: React.FC<Props> = ({ className, product }) => {
  const textDetails = "25 см, тонкое 380г";

  return (
    <div className={cn("", className)}>
      <Title text={product.name} size="md" className="font-extrabold mb-1" />

      <p className="text-gray-400 mb-6">{textDetails}</p>

      <GroupVariants
        items={[
          { name: "Маленькая", value: "1" },
          { name: "Средняя", value: "2" },
          { name: "Большая", value: "3", disabled: true },
        ]}
        selectedValue="1"
        // onClick={}
      />
    </div>
  );
};
