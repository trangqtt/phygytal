"use client"
import { FC } from "react";
import { Badge } from "@components/ui/badge";
import Link from "next/link";

export type ProductCardProps = {
  url?: string;
  picture: string;
  price: string;
  name: string;
}

const ProductCard: FC<ProductCardProps> = ({ url = "#", picture, price, name }) => {
  return (
    <Link
      href={url}
      className="w-[310px] h-[420px] rounded-xl shadow-product-card cursor-pointer hover:scale-105 transition-all bg-white"
    >
      <img
        className="w-full h-77.5 object-scale-down rounded-t-xl"
        src={picture}
        alt="product"
      />
      <div className="px-4 py-3 border-t flex flex-col gap-2">
        <div className="flex gap-1">
          <Badge variant="secondary">Độc bản</Badge>
          <Badge>Đá non nước</Badge>
        </div>
        <p className="text-base font-semibold">{name}</p>
        <p className="text-sm font-semibold">{price} đ</p>
      </div>
    </Link>
  );
};

export default ProductCard;
