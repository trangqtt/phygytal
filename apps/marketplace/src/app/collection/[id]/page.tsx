"use client";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { ChevronDown } from "lucide-react";
import ProductCard from "@components/card/ProductCard";
import { lej } from "../../../assets/images";
import CollectionSearchInput from "../CollectionSearchInput";
import CollectionSortInput from "../CollectionSortInput";
import FacebookIcon from "@components/ui/icons/FacebookIcon";
import InstagramIcon from "@components/ui/icons/InstagramIcon";
import EarthIcon from "@components/ui/icons/EarthIcon";
import BlueTickIcon from "@components/ui/icons/BlueTickIcon";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSellOrders } from "@lib/axios/sellorder";
import { SellOrder } from "../../../models/order";
import { normalizePrice } from "@lib/utils";

export type CollectionStatsProps = {
  title: string;
  value: number;
}

const CollectionStats: FC<CollectionStatsProps> = ({ title, value }) => (
  <div className="flex flex-col gap-1">
    <p className="font-medium text-sm text-n6 uppercase">{title}</p>
    <p className="font-semibold text-2xl">{value}</p>
  </div>
);

const CollectionDetailPage: FC = () => {
  const params = useParams();
  const { id: collectionId, } = params;

  // TODO Add filter by collectionID
  const { data: sellOrders } = useQuery({
    queryKey: ["sell-orders"],
    queryFn: getSellOrders,
  })

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-100 relative mb-16">
        <img
          src={lej.src}
          alt="collection"
          className="m-auto w-full h-full object-cover"
        />
        <div className="bg-full-banner-overlay absolute inset-0 w-full h-full"></div>
        <Avatar className="absolute -bottom-12 left-16 border-8 border-white rounded-2xl w-45 h-45">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full h-full flex flex-col gap-6 px-16">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-n9 text-3xl flex items-center gap-4">
            Cuộc Thi {"Đá Non Nước"} 2023 <BlueTickIcon />
          </h4>
          <div className="flex items-center gap-3">
            <FacebookIcon className="cursor-pointer" />
            <InstagramIcon className="cursor-pointer" />
            <EarthIcon className="cursor-pointer" />
          </div>
        </div>
        <p className="text-n6 text-base font-normal">
          Một đoạn ngắn mô tả cuộc thi này một đoạn ngắn mô tả cuộc thi này...
        </p>
        <Button className="w-25 h-fit cursor-pointer bg-transparent text-n6 text-sm font-semibold flex justify-start items-center gap-1 p-0">
          Xem thêm <ChevronDown className="w-6 h-6" />
        </Button>
        <div className="flex gap-10">
          <CollectionStats title="tác phẩm" value={10} />
          <CollectionStats title="đã bán" value={2000} />
        </div>
        <div className="w-full h-px bg-n3"></div>
        <div className="flex items-center justify-between gap-3">
          <CollectionSearchInput />
          <CollectionSortInput />
        </div>
        <div className="w-full flex gap-6 flex-wrap pt-6 pb-16">
          {sellOrders?.data?.map((item: SellOrder) => (
            <ProductCard
              key={item.id}
              url={`/collection/${item.collection_id}/${item.id}`}
              price={normalizePrice(item.sell_infos[0].price)}
              name={item.product.product_name}
              picture={item.product.image.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionDetailPage;
