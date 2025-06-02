import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { Api } from "@/services/api-client";
import { useSet } from "react-use";

type IngredientItem = Pick<Ingredient, "id" | "name">;

interface ReturnProps {
  ingredients: IngredientItem[];
  loading: boolean;
  selectedIds: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedIds, { toggle }] = useSet(new Set<string>([]));

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const ingredients: Ingredient[] = await Api.ingredients.getAll();
        setIngredients(ingredients.map(({ id, name }) => ({ id, name })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { ingredients, loading, selectedIds, onAddId: toggle };
};
