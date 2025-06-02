import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { Api } from "@/services/api-client";

type IngredientItem = Pick<Ingredient, "id" | "name">;

interface ReturnProps {
  ingredients: IngredientItem[];
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const ingredients: Ingredient[] = await Api.ingredients.getAll();
        setIngredients(ingredients.map(({ id, name }) => ({ id, name })));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return { ingredients };
};
