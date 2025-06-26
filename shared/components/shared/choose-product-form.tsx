import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "@/shared/components/shared/title";
import { Button } from "@/shared/components/ui";
import Image from "next/image";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  onClickAdd?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  onClickAdd,
}) => {
  const textDetails = "30 см, традиционное тесто";
  const totalPrice = 250;
  return (
    <div className={cn("flex flex-1", className)}>
      <div className={"flex items-center justify-center flex-1 "}>
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
          className={
            "relative transition-all z-10 duration-300 w-[300px] h-[300px]"
          }
        />
      </div>
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
