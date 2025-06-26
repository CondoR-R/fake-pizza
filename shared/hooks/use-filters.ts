import { useSet } from "react-use";
import React from "react";
import { useSearchParams } from "next/navigation";
import { QueryFilters } from "@/shared/hooks/use-query-filters";

export interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export interface Filters {
  price: PriceProps;
  selectedIngredients: Set<string>;
  sizes: Set<string>;
  pizzaTypes: Set<string>;
}

interface ReturnProps extends Filters {
  toggleIngredients: (key: string) => void;
  toggleSizes: (key: string) => void;
  togglePizzaTypes: (key: string) => void;
  onChangeSetPrice: (name: keyof PriceProps, value: number) => void;
  onChangeRangePrice: ([priceFrom, priceTo]: number[]) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const getParams = (key: keyof QueryFilters) => {
    return searchParams.get(key) ? searchParams.get(key)?.split(",") : [];
  };

  // фильтр ингредиентов
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(getParams("ingredients")),
  );

  // фильтр размеров
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(getParams("sizes")),
  );

  // фильтр размеров
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(getParams("pizzaTypes")),
  );

  // стоимость
  const [price, setPrice] = React.useState<PriceProps>({
    priceFrom: searchParams.get("priceFrom")
      ? Number(searchParams.get("priceFrom"))
      : 0,
    priceTo: searchParams.get("priceTo")
      ? Number(searchParams.get("priceTo"))
      : 1500,
  });

  const onChangeSetPrice = (name: keyof PriceProps, value: number) => {
    setPrice((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const onChangeRangePrice = ([priceFrom, priceTo]: number[]) => {
    setPrice({ priceFrom, priceTo });
  };

  return {
    selectedIngredients,
    sizes,
    pizzaTypes,
    price,
    toggleIngredients,
    toggleSizes,
    togglePizzaTypes,
    onChangeSetPrice,
    onChangeRangePrice,
  };
};
