import { Media } from "./general";
import { Product } from "./product";
import { Receiver } from "./receiver";
import { Seller } from "./seller";

export type SellInfo = {
  price: number;
  remain: number;
  sku: string;
  supply: number;
  label: string;
};

export type SellOrder = {
  id: string;
  collection_id: string;
  seller: Seller;
  sell_infos: SellInfo[];
  product: Product;
};

export type BuyInfo = {
  productName: string;
  label: string;
  image: Media;
  sku: string;
  quantity: number;
  price: number;
  unit_price: number;
  sell_order_id: string;
}

export type BuyOrderInfo = {
  sell_order_id: string;
  product_id: string;
  buy_infos: BuyInfo[];
}

export type BuyOrderPayload = {
  buy_order_infos: BuyOrderInfo[];
  payment_type: "vnpay";
  receiver_info: Receiver;
}
