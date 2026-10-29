"use client";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import CartIcon from "@components/ui/icons/CartIcon";
import { useRouter } from "next/navigation";
import { ProductVariants } from "../../../../models/product";
import { FC, useEffect, useState } from "react";
import { BuyInfo, BuyOrderInfo, SellInfo, SellOrder } from "../../../../models/order";
import { cn, normalizePrice } from "@lib/utils";
import { useToast } from "@components/ui/use-toast";

export type SizeOptionsProps = {
  label: string;
  active: boolean;
  onClick: () => void;
}

const SizeOptions: FC<SizeOptionsProps> = ({ label, active, onClick }) => {
  return (
    <div
      className={cn(
        "capitalize w-fit h-fit px-4 py-2 border cursor-pointer rounded-md text-sm text-n6 font-medium",
        active && "border-secondary text-secondary"
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export type ProductPurchaseInfoProps = {
  sellOrder: SellOrder;
  collectionName: string;
}

const ProductPurchaseInfo: FC<ProductPurchaseInfoProps> = ({ sellOrder, collectionName }) => {
  const { sell_infos, product, id } = sellOrder || {};
  const router = useRouter();

  const [currentSellInfo, setCurrentSellInfo] = useState<SellInfo | null>(null);
  const [buyQty, setBuyQty] = useState<number>(1);

  const { toast } = useToast();

  useEffect(() => {
    if (sell_infos?.length) {
      setCurrentSellInfo(sell_infos[0]);
    }
  }, [sell_infos])

  const getCurrentVariant = () => {
    return product?.variants?.find((productVariant: ProductVariants) => productVariant.sku === currentSellInfo?.sku);
  }

  const getVariantBySellInfo = (sellInfo: SellInfo) => {
    return product?.variants?.find((productVariant: ProductVariants) => productVariant.sku === sellInfo.sku);
  }

  const renderPrice = () => {
    const currentSellInfoUnitPrice = currentSellInfo?.price ?? 0;

    const totalPrice = currentSellInfoUnitPrice * buyQty;
    return normalizePrice(totalPrice);
  }

  const handleIncrease = () => {
    if (buyQty >= currentSellInfo?.remain!) return;
    setBuyQty(buyQty + 1);
  }

  const handleDecrease = () => {
    if (buyQty <= 1) return;
    setBuyQty(buyQty - 1);
  }

  const handleAddToCart = () => {
    const buyOrderInfos = localStorage.getItem("buy_order_infos");

    const buy_info: BuyInfo = {
      productName: product.product_name,
      sku: currentSellInfo?.sku as string,
      quantity: buyQty,
      price: Number(currentSellInfo?.price) * buyQty,
      unit_price: Number(currentSellInfo?.price),
      image: product.image,
      label: getCurrentVariant()?.label as string,
      sell_order_id: id,
    }

    // To add new cart
    if (!buyOrderInfos) {
      localStorage.setItem("buy_order_infos", JSON.stringify([{
        sell_order_id: id,
        product_id: product.id,
        buy_infos: [buy_info],
      }]));

      toast({
        title: "Đã thêm vào giỏ hàng",
      })
      return;
    }

    // To update current cart
    const buy_order_infos = JSON.parse(buyOrderInfos) as BuyOrderInfo[];
    const buyOrderOfSellOrder = buy_order_infos.find((item: BuyOrderInfo) => item.sell_order_id === sellOrder.id);

    if (!buyOrderOfSellOrder) {
      buy_order_infos.push({
        sell_order_id: id,
        product_id: product.id,
        buy_infos: [buy_info],
      });
    }

    const index = buyOrderOfSellOrder?.buy_infos?.findIndex((item: BuyInfo) => item.sku === buy_info.sku);
    if (index === -1) {
      buyOrderOfSellOrder?.buy_infos.push(buy_info);
    } else if (buyOrderOfSellOrder?.buy_infos[index!]) {
      buyOrderOfSellOrder.buy_infos[index!].quantity = buyOrderOfSellOrder?.buy_infos[index!].quantity! + buy_info.quantity;
      buyOrderOfSellOrder.buy_infos[index!].price = buyOrderOfSellOrder.buy_infos[index!].quantity! * buyOrderOfSellOrder.buy_infos[index!].price;
    }
    localStorage.setItem("buy_order_infos", JSON.stringify(buy_order_infos));

    toast({
      title: "Đã cập nhật giỏ hàng",
    })

    return;
  }

  const handlePurchase = () => {
    handleAddToCart();
    router.push('/cart');
  }

  return (
    <div className="w-full h-full bg-white rounded-xl flex flex-col p-6 gap-5">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-base text-n7">{collectionName}</p>
        <h5 className="text-n9 font-semibold text-2xl">
          {sellOrder?.product?.product_name}
        </h5>
        <Badge className="w-fit" variant="secondary">
          REPLICA
        </Badge>
      </div>
      <h6 className="font-semibold text-xl">{renderPrice()} đ</h6>
      <div className="flex flex-col w-full gap-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-6 items-center justify-between">
            <p className="font-medium text-sm text-n9">Kích thước & Màu sắc</p>
          </div>
          <div className="flex items-center gap-2">
            {sell_infos?.map(
              (sellInfo: SellInfo, index: number) => (
                <SizeOptions
                  key={index}
                  label={getVariantBySellInfo(sellInfo)?.label ?? ""}
                  active={currentSellInfo?.sku === sellInfo?.sku}
                  onClick={() => setCurrentSellInfo(sellInfo)}
                />
              )
            )}
          </div>
          {/* <div className="flex gap-2 items-center justify-between border-b border-b-black">
            <p className="text-n9 text-sm font-medium">Kích thước</p>
            <RulerIcon />
          </div> */}
        </div>
        <div className="flex items-center justify-between">
          <div className="w-1/2 flex gap-6 items-center justify-between">
            <p className="font-medium text-sm text-n9">Số lượng</p>
          </div>
          <div className="flex items-end flex-col">
            <div className="flex items-center gap-2">
              <Button
                className="w-15 h-9.5 border border-n4 bg-transparent"
                onClick={handleDecrease}
              >
                {" "}
                -{" "}
              </Button>
              <div className="w-15 h-9.5 border border-n4 rounded-md flex justify-center items-center font-medium text-sm">
                {buyQty}
              </div>
              <Button
                className="w-15 h-9.5 border border-n4 bg-transparent"
                onClick={handleIncrease}
              >
                {" "}
                +{" "}
              </Button>
            </div>
            <p
              className={cn(
                "text-red-400 invisible",
                buyQty > currentSellInfo?.remain! && "visible"
              )}
            >
              còn lại {currentSellInfo?.remain!} sản phẩm
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-3">
        <Button
          className="bg-white border-n4 border text-n9 w-full uppercase gap-2 font-semibold"
          onClick={handleAddToCart}
          disabled={buyQty > currentSellInfo?.remain!}
        >
          <CartIcon /> thêm vào giỏ
        </Button>
        <Button
          className="w-full uppercase font-semibold"
          variant="secondary"
          onClick={handlePurchase}
          disabled={buyQty > currentSellInfo?.remain!}
        >
          mua ngay
        </Button>
      </div>
    </div>
  );
};

export default ProductPurchaseInfo;
