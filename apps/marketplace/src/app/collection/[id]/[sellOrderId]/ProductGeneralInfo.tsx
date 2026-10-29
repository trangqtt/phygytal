import { FC } from "react";
import ProductSeller from "./ProductAuthor";
import ProductPreview from "./ProductPreview";
import ProductPurchaseInfo from "./ProductPurchaseInfo";
import { SellOrder } from "../../../../models/order";

export type ProductGeneralInfoProps = {
  sellOrder: SellOrder;
  collectionName: string;
}

const ProductGeneralInfo: FC<ProductGeneralInfoProps> = (props) => {
  const { sellOrder, collectionName, } = props;
  const { product, seller } = sellOrder || {};

  return (
    <div className="w-full h-full flex gap-6 flex-1">
      <ProductPreview picture={product?.image?.url} />
      <div className="w-full flex-1 h-full rounded-xl flex flex-col gap-6">
        <ProductPurchaseInfo collectionName={collectionName} sellOrder={sellOrder} />
        <ProductSeller seller={seller} />
        {/* <ProductIdentityInfo /> */}
      </div>
    </div>
  );
};

export default ProductGeneralInfo;
