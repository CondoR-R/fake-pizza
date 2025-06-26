"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface Variant {
  name: string;
  value: string;
  disabled?: boolean;
}

type Props = {
  items: readonly Variant[];
  defaultValue?: string;
  selectedValue: Variant["value"];
  onClick: (value: Variant["value"]) => void;
  className?: string;
};

export const GroupVariants: React.FC<Props> = ({
  items,
  defaultValue,
  selectedValue,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex justify-between bg-[#f3f3f3] rounded-3xl p-1 select-none",
        className,
      )}
    >
      {items.map(({ name, value, disabled }, index) => (
        <button
          key={index}
          disabled={disabled}
          onClick={() => onClick?.(value)}
          className={cn(
            "flex items-center justify-center cursor-pointer h-[30px] px-10 py-5 flex-1 rounded-3xl transition-all duration-300 text-sm",
            {
              "bg-white shadow": selectedValue === value,
              "text-gray-500 opacity-50 pointer-events-none": disabled,
            },
          )}
        >
          {name}
        </button>
      ))}
    </div>
  );
};
