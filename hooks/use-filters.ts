import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React, { useEffect } from "react";
import qs from "qs";
import { useGetIngredients } from "@/hooks/use-get-ingredients";

export interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export const useFilters = () => {
  // строка запроса
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;
  const router = useRouter();

  // функция для получения массива из строки запроса
  const getParams = (key: keyof QueryFilters) => {
    return searchParams.get(key) ? searchParams.get(key)?.split(",") : [];
  };

  // получение ингредиентов с сервера
  const { ingredients, loading } = useGetIngredients();

  // состояния для чекбоксов
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(getParams("ingredients")),
  );
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(getParams("sizes")),
  );
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(getParams("pizzaTypes")),
  );

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

  return {
    ingredients,
    loading,
    selectedIngredients,
    sizes,
    pizzaTypes,
    price,
    toggleIngredients,
    toggleSizes,
    togglePizzaTypes,
    onChangeSetPrice,
    setPrice,
  };
};
