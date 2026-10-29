import ProductCard from "@components/card/ProductCard";
import { SellOrder } from "../../../../models/order";
import { FC } from "react";
import { normalizePrice } from "@lib/utils";

export type ProductSameCollectionProps = {
  sellOrders: SellOrder[];
};

const ProductSameCollection: FC<ProductSameCollectionProps> = ({ sellOrders }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <h5 className="font-semibold text-2xl">Cùng bộ sưu tập</h5>
      <div className="w-full flex gap-6 flex-wrap">
        {sellOrders?.map((item: SellOrder) => (
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
  );
};

export default ProductSameCollection;
