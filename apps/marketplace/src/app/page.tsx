"use client"
import ProductCard from '@components/card/ProductCard';
import { Button } from '@components/ui/button';
import CollectionCard from '@components/card/CollectionCard';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Collection, } from '../models/collection';
import FadeIn from '@components/motion/FadeIn';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '@lib/axios/collections';
import parser from 'html-react-parser';
import { getSellOrders } from '@lib/axios/sellorder';
import { SellOrder } from '../models/order';
import { normalizePrice } from '@lib/utils';

export default function Home() {
  const router = useRouter();
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(null);
  const { data: collections } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  const { data: sellOrders } = useQuery({
    queryKey: ["sell-orders"],
    queryFn: getSellOrders,
  })

  useEffect(() => {
    if (collections && collections?.data) {
      setCurrentCollection(collections?.data[0]);
    }
  }, [collections])

  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <div className="w-full h-screen relative">
        <FadeIn
          className="m-auto w-full h-full"
          key={currentCollection?.id}
        >
          <img
            src={currentCollection?.banner.url}
            alt="collection"
            className="w-full h-full object-cover"
          />
        </FadeIn>
        <div className="bg-full-banner-overlay absolute inset-0 w-full h-full"></div>
        <div className="absolute bg-transparent bottom-4 w-full flex flex-col justify-center items-center gap-10 text-white">
          <FadeIn className="flex flex-col justify-center items-center gap-10" key={currentCollection?.id}>
            <p className="font-bold text-4xl capitalize">{currentCollection?.name}</p>
            <p className="font-medium text-base">
              {parser(currentCollection?.description || "")}
            </p>
          </FadeIn>
          <Button
            className="text-black bg-white font-bold uppercase px-10 py-4"
            onClick={() => router.push(`/collection/${currentCollection?.id}`)}
          >
            Khám phá
          </Button>

          <div className="flex gap-6">
            {collections?.data?.map((item: Collection) => (
              <CollectionCard
                key={item.id}
                title={item.name}
                background={item.banner.url}
                onClick={() => setCurrentCollection(item)}
                id={item.id}
                currentCollection={currentCollection?.id || ""}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full max-w-2xl m-auto px-16 py-10 flex flex-col gap-[20px]">
        <p className="font-semibold text-2xl">Sản phẩm nổi bật</p>
        <div className="w-full grid grid-cols-4 gap-6">
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
    </main>
  );
}
