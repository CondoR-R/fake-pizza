import { Ingredient, Product, ProductItem } from "@prisma/client";

export interface IPizza extends Product {
  items: ProductItem[];
  ingredients: Ingredient[];
}
