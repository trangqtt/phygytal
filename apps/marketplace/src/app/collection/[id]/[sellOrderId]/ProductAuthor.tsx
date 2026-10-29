import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import MailIcon from "@components/ui/icons/EmailIcon";
import Link from "next/link";
import { Seller } from "../../../../models/seller";
import { FC } from "react";

export type ProductSellerProps = {
  seller: Seller;
}

const ProductSeller: FC<ProductSellerProps> = ({ seller }) => {
  return (
    <div className="w-full h-full bg-white rounded-xl flex items-center justify-between px-6 py-4">
      <div className="flex gap-4 items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage src={seller?.picture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-base capitalize">{seller?.full_name}</p>
          <p className="font-normal text-sm text-n6 capitalize">người bán</p>
        </div>
      </div>
      {/* <div className="w-5 h-px rotate-90 bg-n4"></div> */}
      {/* <div className="flex flex-col gap-1">
        <p className="font-semibold text-xl">36</p>
        <p className="font-medium text-xs text-n5 uppercase">sản phẩm</p>
      </div> */}
      <div className="w-5 h-px rotate-90 bg-n4"></div>
      <div className="flex items-center gap-5">
        <Link href={`mailto:${seller?.email}`}>
          <MailIcon className="cursor-pointer" />
        </Link>
        {/* <Link href="tel:+84 123456789">
          <PhoneIcon className="cursor-pointer" />
        </Link> */}
      </div>
    </div>
  );
};

export default ProductSeller;
