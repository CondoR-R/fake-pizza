import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  src: string;
  alt: string;
  size: "sm" | "md" | "lg";
};
export const ProductImage: React.FC<Props> = ({
  className,
  src,
  alt,
  size,
}) => {
  const sizeValue = size === "sm" ? 300 : size === "md" ? 400 : 500;

  return (
    <div
      className={cn(
        "w-[500px] h-[500px] flex items-center justify-center relative",
        className,
      )}
    >
      <Image
        className={`w-[${sizeValue}px] h-[${sizeValue}px] translate-x-[11px] translate-y-[11px] transition-all duration-300 relative z-10`}
        src={src}
        alt={alt}
        width={sizeValue}
        height={sizeValue}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px] "></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-100 w-[370px] h-[370px] "></div>
    </div>
  );
};
