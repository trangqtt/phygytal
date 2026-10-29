"use client"

import { FC } from "react";
import ProductGeneralInfo from "./ProductGeneralInfo";
import ProductDescriptionInfo from "./ProductDescriptionInfo";
import ProductSameCollection from "./ProductSameCollection";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSellOrder, getSellOrders } from "@lib/axios/sellorder";
import { SellOrder } from "../../../../models/order";
import { getCollection } from "@lib/axios/collections";
import { Collection } from "../../../../models/collection";

const SellOrderDetailPage: FC = () => {
  const params = useParams();
  const { id: collectionId, sellOrderId } = params;

  const { data: sellOrders } = useQuery({
    queryKey: ["sell-orders"],
    queryFn: getSellOrders,
  })

  const { data: sellOrder } = useQuery({
    queryKey: ["sell-order"],
    queryFn: () => getSellOrder(sellOrderId as string),
    enabled: sellOrderId !== undefined,
  });
  const { product } = sellOrder?.data as SellOrder || {};
  const description = product?.attribute?.translation?.vi?.description;

  const { data: collection } = useQuery({
    queryKey: ["collection", collectionId!],
    queryFn: () => getCollection(collectionId as string),
    enabled: collectionId !== undefined,
  });
  const { name: collectionName } = collection?.data as Collection || {};

  return (
    <div className="w-full min-h-screen bg-n2">
      <div className="w-full h-full flex flex-col gap-6 px-16 py-28">
        <ProductGeneralInfo sellOrder={sellOrder?.data as SellOrder} collectionName={collectionName!} />
        <ProductDescriptionInfo description={description || ""} />
        <ProductSameCollection sellOrders={sellOrders?.data || []} />
      </div>
    </div>
  );
};

export default SellOrderDetailPage;
