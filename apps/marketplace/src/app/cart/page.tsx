"use client";
import GarbageIcon from "@components/ui/icons/GarbageIcon";
import { dummyproduct } from "../../assets/images";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Input } from "@components/ui/input";
import { FC, useEffect, useState } from "react";
import { PaymenSuccessDialog } from "@components/dialog/PaymentSuccessDialog";
import { BuyInfo, BuyOrderInfo, BuyOrderPayload } from "../../models/order";
import { normalizePrice } from "@lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createBuyOrder } from "@lib/axios/buyorder";
import { useRouter, useSearchParams } from "next/navigation";

export type CartItemProps = {
  data: BuyInfo;
  onRemove: (sellOrderId: string) => void;
  onIncrease: (buyInfo: BuyInfo) => void;
  onDecrease: (buyInfo: BuyInfo) => void;
}

const CartItem: FC<CartItemProps> = ({ data, onRemove, onIncrease, onDecrease, }) => {
  return (
    <div className="w-full h-36 bg-white rounded-xl grid grid-cols-8 px-4 py-3">
      <div className="flex items-center gap-4 col-span-4">
        <Checkbox className="w-6 h-6 rounded-md" />
        <img
          src={data?.image?.url}
          alt="product"
          className="w-28 h-28 border-n3 border rounded-xl"
        />
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-base text-n9">{data?.productName}</p>
          <p className="text-sm text-n6 font-normal capitalize">
            Kích thước & Màu sắc: {data?.label}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 col-span-2">
        <Button className="w-10 h-10 border border-n4 bg-transparent" onClick={() => onDecrease(data)}>
          {" "}
          -{" "}
        </Button>
        <div className="w-10 h-10 border border-n4 rounded-md flex justify-center items-center font-medium text-sm">
          {data?.quantity}
        </div>
        <Button className="w-10 h-10 border border-n4 bg-transparent" onClick={() => onIncrease(data)}>
          {" "}
          +{" "}
        </Button>
      </div>
      <p className="text-base font-semibold text-n9 flex items-center justify-center gap-6 col-span-2 text-center">
        {normalizePrice(data?.price || 0)}đ{" "}
        <GarbageIcon
          className="cursor-pointer"
          onClick={() => onRemove(data?.sell_order_id)}
        />
      </p>
    </div>
  );
}

const CartPage = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<BuyInfo[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderStatus = searchParams.get("status");

  const { mutate } = useMutation({
    mutationFn: (payload: BuyOrderPayload) => {
      return createBuyOrder(payload);
    },
    onSuccess: ({ data }) => {
      const { payment_url } = data;
      if (payment_url) {
        setCartItems([]);
        router.push(payment_url);
      }
    },
  })

  useEffect(() => {
    if (orderStatus === "success") {
      setSuccess(true);
      localStorage.removeItem("buy_order_infos");
    }
  }, [orderStatus])

  useEffect(() => {
    const buyOrderInfos = localStorage.getItem("buy_order_infos");
    if (!buyOrderInfos) return;

    let newCart: BuyInfo[] = [];
    (JSON.parse(buyOrderInfos) as BuyOrderInfo[]).forEach((item: BuyOrderInfo) => {
      newCart = [...newCart, ...item.buy_infos];
    })
    setCartItems(newCart);
  }, [])

  const handleBuy = async () => {
    const buyOrderInfos = localStorage.getItem("buy_order_infos");
    if (!buyOrderInfos) {
      return;
    }
    const buyOrderData = JSON.parse(buyOrderInfos) as BuyOrderInfo[];

    const buyPayload: BuyOrderPayload = {
      buy_order_infos: buyOrderData,
      payment_type: "vnpay",
      receiver_info: {
        name: "Nguyen Van A",
        phone: "0912345678",
        email: "nX2Qp@example.com",
        address: "Ha Noi",
      }
    }

    mutate(buyPayload);
  }

  const handleRemove = (sellOrderId: string) => {
    const buyOrderInfos = localStorage.getItem("buy_order_infos");
    if (!buyOrderInfos) {
      return;
    }
    const buyOrderData = JSON.parse(buyOrderInfos) as BuyOrderInfo[];

    const index = buyOrderData.findIndex((item: BuyOrderInfo) => item.sell_order_id === sellOrderId);

    if (index === -1) {
      return;
    }
    buyOrderData.splice(index, 1);
    localStorage.setItem("buy_order_infos", JSON.stringify(buyOrderData));

    // update cart item
    let newCart: BuyInfo[] = [];
    buyOrderData.forEach((item: BuyOrderInfo) => {
      newCart = [...newCart, ...item.buy_infos];
    })
    setCartItems(newCart);
  }

  const handleIncreaseItem = (buyInfo: BuyInfo) => {
    const index = cartItems.findIndex(
      (item: BuyInfo) =>
        item.sell_order_id === buyInfo.sell_order_id && item.sku === buyInfo.sku
    );

    if (index === -1) return;

    const newCart = [...cartItems];
    newCart[index].quantity = newCart[index].quantity! + 1;
    newCart[index].price = newCart[index].quantity! * newCart[index].unit_price;

    setCartItems(newCart);
  }

  const handleDecreaseItem = (buyInfo: BuyInfo) => {
    const index = cartItems.findIndex(
      (item: BuyInfo) =>
        item.sell_order_id === buyInfo.sell_order_id && item.sku === buyInfo.sku
    );

    if (index === -1) return;

    const newCart = [...cartItems];
    if (newCart[index].quantity === 1) {
      newCart.splice(index, 1);
    } else {
      newCart[index].quantity = newCart[index].quantity! - 1;
      newCart[index].price = newCart[index].quantity! * newCart[index].unit_price;
    }

    setCartItems(newCart);
  }

  const totalPrice = () => {
    let price = 0;

    cartItems.forEach((item: BuyInfo) => {
      price += item.price;
    })

    return normalizePrice(price);
  }

  return (
    <>
      <div className="w-full min-h-screen bg-n2">
        <div className="w-full h-full px-16 py-28 grid grid-cols-12 gap-6">
          <div className="w-full col-span-8 flex flex-col gap-6">
            <h5 className="text-n9 text-2xl font-semibold">Giỏ hàng</h5>
            <div className="w-full flex flex-col gap-3">
              <div className="w-full h-12 bg-white rounded-xl grid grid-cols-8 px-4 py-3">
                <div className="flex gap-4 items-center col-span-4">
                  <Checkbox className="w-6 h-6 rounded-md" />
                  <p className="text-n6 font-medium text-sm">Tất cả sản phẩm</p>
                </div>
                <p className="text-n6 font-medium text-sm col-span-2 text-left">
                  Số lượng
                </p>
                <p className="text-n6 font-medium text-sm col-span-2 text-center">
                  Thành tiền
                </p>
              </div>
              {cartItems?.map((item: BuyInfo, index: number) => (
                <CartItem
                  data={item}
                  onRemove={handleRemove}
                  onIncrease={handleIncreaseItem}
                  onDecrease={handleDecreaseItem}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="w-full col-span-4 flex flex-col gap-6">
            <h5 className="text-n9 text-2xl font-semibold">Tổng kết</h5>
            <div className="w-full h-fit p-6 bg-white rounded-xl flex flex-col gap-6">
              <div className="w-full flex items-center justify-between">
                <p className="text-n6 font-medium text-sm">Tạm tính</p>
                <p className="text-base font-semibold text-n9">{totalPrice()}đ</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="text-n6 font-medium text-sm">Phí vận chuyển</p>
                <p className="text-base font-semibold text-n9">0đ</p>
              </div>
              <div className="w-full flex items-center justify-between gap-3">
                <Input placeholder="Nhập mã giảm giá" className="flex-1" />
                <Button className="uppercase" variant="secondary">
                  Áp dụng
                </Button>
              </div>
              <div className="w-full h-px bg-n3"></div>
              <div className="w-full flex items-center justify-between">
                <p className="text-base text-n8 font-medium">Tổng cộng</p>
                <p className="text-base font-semibold text-n9">{totalPrice()}đ</p>
              </div>
            </div>
            <Button
              className="uppercase"
              variant="secondary"
              onClick={handleBuy}
              disabled={cartItems.length === 0}>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
      <PaymenSuccessDialog isOpen={success} onClose={() => router.push("/")} />
    </>
  );
};

export default CartPage;
