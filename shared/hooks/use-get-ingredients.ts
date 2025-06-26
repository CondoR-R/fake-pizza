import { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client";
import { Api } from "@/shared/services/api-client";

interface IngredientItem {
  value: string;
  text: string;
}

interface ReturnProps {
  ingredients: IngredientItem[];
  loading: boolean;
}

export const useGetIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const ingredients: Ingredient[] = await Api.ingredients.getAll();
        setIngredients(
          ingredients.map(({ id, name }) => ({
            value: String(id),
            text: name,
          })),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading, ingredients };
};
