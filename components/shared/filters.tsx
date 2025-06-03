"use client";

import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { Title } from "./title";
import { Input, RangeSlider } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngregients";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const getParams = (key: keyof QueryFilters) =>
    searchParams.get(key) ? searchParams.get(key)?.split(",") : [];

  const { ingredients, loading, onAddId, selectedIngredients } =
    useFilterIngredients(getParams("ingredients"));

  const [price, setPrice] = React.useState<PriceProps>({
    priceFrom: searchParams.get("priceFrom")
      ? Number(searchParams.get("priceFrom"))
      : 0,
    priceTo: searchParams.get("priceTo")
      ? Number(searchParams.get("priceTo"))
      : 1500,
  });

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(getParams("sizes")),
  );
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(getParams("pizzaTypes")),
  );

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

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

  return (
    <div className={cn("", className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/*Выбор теста*/}
      <CheckboxFiltersGroup
        name="pizzaTypes"
        title="Типы теста"
        className="mb-5"
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
        onClickCheckbox={togglePizzaTypes}
        selected={pizzaTypes}
      />

      {/* Выбор размеров */}
      <CheckboxFiltersGroup
        name="sizes"
        title="Размеры"
        className="mb-5"
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
        onClickCheckbox={toggleSizes}
        selected={sizes}
      />

      {/* ценовой диапазон */}
      <div className="border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>

        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={price.priceFrom}
            onChange={(e) => onChangeSetPrice("priceFrom", +e.target.value)}
          />
          <Input
            type="number"
            min={100}
            max={1500}
            placeholder="1000"
            value={price.priceTo}
            onChange={(e) => onChangeSetPrice("priceTo", +e.target.value)}
          />
        </div>

        <RangeSlider
          min={0}
          max={1500}
          step={10}
          value={[price.priceFrom, price.priceTo]}
          onValueChange={([priceFrom, priceTo]) =>
            setPrice({ priceFrom, priceTo })
          }
        />
      </div>

      {/* фильтр ингридиентов */}
      <CheckboxFiltersGroup
        title="Ингридиенты"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selected={selectedIngredients}
        name="ingredients"
      />
    </div>
  );
};
