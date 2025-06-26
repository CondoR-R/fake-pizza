import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "@/shared/components/shared/title";
import { Button } from "@/shared/components/ui";
import { PizzaImage } from "@/shared/components/shared/pizza-image";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: unknown[];
  items?: unknown[];
  onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAdd,
}) => {
  const textDetails = "30 см, традиционное тесто";
  const totalPrice = 250;
  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage src={imageUrl} alt={name} size={"md"} />
      <div className={"flex-1 bg-[#f7f6f5] p-7 flex flex-col justify-between"}>
        <div>
          <Title text={name} size={"md"} className={"font-extrabold mb-1"} />
          <p className={"text-gray-400"}>{textDetails}</p>
        </div>
        <div>
          <Button
            className={
              "h-[55px] px-10 text-base rounded-[18px] w-full self-end"
            }
          >
            Добавить в корзину за {totalPrice} руб.
          </Button>
        </div>
      </div>
    </div>
  );
};
