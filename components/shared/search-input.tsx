"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { Input } from "../ui";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useClickAway, useDebounce } from "react-use";
import Link from "next/link";
import Image from "next/image";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const ref = useRef<HTMLDivElement>(null!);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    () => {
      Api.products.search(searchQuery).then((items) => {
        setProducts(items);
      });
    },
    100,
    [searchQuery],
  );

  return (
    <>
      {focused && (
        <div className="fixed top-0 bottom-0 left-0 right-0  bg-black/50 z-30" />
      )}

      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between items-center relative h-11 z-30",
          className,
        )}
      >
        <label
          htmlFor="search-input"
          className="absolute top-1/2 translate-y-[-50%] left-3 text-gray-400"
        >
          <Search size={20} />
        </label>
        <Input
          type="text"
          id="search-input"
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          placeholder="Найти товар..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />

        <div
          className={cn(
            "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12",
          )}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href="/"
              className="px-3 py-2 hover:bg-primary/10 cursor-pointer flex items-center gap-3"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={32}
                height={32}
                className="w-8"
              />
              <span>{product.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
