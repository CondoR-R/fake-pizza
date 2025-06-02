"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input, RangeSlider } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngregients";

interface Props {
  className?: string;
}

const topCheckboxes = [
  { text: "Можно собирать", value: "1" },
  { text: "Новинки", value: "2" },
];

const min = 0,
  max = 1500;

const priceInputs = [
  { min, max, placeholder: `${min}`, defaultValue: min },
  { min: min + 100, max, placeholder: `${max}`, defaultValue: max },
];

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients } = useFilterIngredients();

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  return (
    <div className={cn("", className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      {/* Верхние чекбоксы */}
      <div className="flex flex-col gap-4 mb-5">
        {topCheckboxes.map(({ text, value }) => (
          <FilterCheckbox key={value} text={text} value={value} />
        ))}
      </div>
      {/* ценовой диапазон */}
      <div className="border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>

        <div className="flex gap-3 mb-5">
          {priceInputs.map(({ min, max, placeholder, defaultValue }, index) => (
            <Input
              key={index}
              type="number"
              placeholder={placeholder}
              min={min}
              max={max}
              defaultValue={defaultValue}
            />
          ))}
        </div>

        <RangeSlider min={min} max={max} step={10} value={[min, max]} />
      </div>

      {/* фильтр ингридиентов */}
      <CheckboxFiltersGroup
        title="Ингридиенты"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
      />
    </div>
  );
};
