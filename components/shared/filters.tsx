"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./title";
import { Input, RangeSlider } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useGetIngredients, useFilters, useQueryFilters } from "@/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const filters = useFilters();

  // получение ингредиентов с сервера
  const { ingredients, loading } = useGetIngredients();

  useQueryFilters(filters);

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
        onClickCheckbox={filters.togglePizzaTypes}
        selected={filters.pizzaTypes}
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
        onClickCheckbox={filters.toggleSizes}
        selected={filters.sizes}
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
            value={filters.price.priceFrom}
            onChange={(e) =>
              filters.onChangeSetPrice("priceFrom", +e.target.value)
            }
          />
          <Input
            type="number"
            min={100}
            max={1500}
            placeholder="1000"
            value={filters.price.priceTo}
            onChange={(e) =>
              filters.onChangeSetPrice("priceTo", +e.target.value)
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1500}
          step={10}
          value={[filters.price.priceFrom, filters.price.priceTo]}
          onValueChange={filters.onChangeRangePrice}
        />
      </div>

      {/* фильтр ингридиентов */}
      <CheckboxFiltersGroup
        title="Ингридиенты"
        className="mt-5"
        limit={6}
        defaultItems={ingredients.slice(0, 6)}
        items={ingredients}
        loading={loading}
        onClickCheckbox={filters.toggleIngredients}
        selected={filters.selectedIngredients}
        name="ingredients"
      />
    </div>
  );
};
