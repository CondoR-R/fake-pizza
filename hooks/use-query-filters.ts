import { useRouter } from "next/navigation";
import { Filters, PriceProps } from "@/hooks/use-filters";
import { useEffect } from "react";
import qs from "qs";

export interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export const useQueryFilters = ({
  price,
  pizzaTypes,
  sizes,
  selectedIngredients,
}: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const filters = {
      priceFrom: price.priceFrom === 0 ? undefined : price.priceFrom,
      priceTo: price.priceTo === 1500 ? undefined : price.priceTo,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients),
    };

    const query = qs.stringify(filters, {
      arrayFormat: "comma",
    });

    router.push(`?${query}`, { scroll: false });
  }, [price, pizzaTypes, sizes, selectedIngredients, router]);

  return;
};
