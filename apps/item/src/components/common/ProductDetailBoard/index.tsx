import { FunctionComponent } from "react";

export type ProductDetailType = {
  label: string;
  value: string;
  description?: string;
  Icon: any;
};

interface ProductDetailBoardProps {
  productDetail: ProductDetailType[];
}

const ProductDetailBoard: FunctionComponent<ProductDetailBoardProps> = ({
  productDetail
}: ProductDetailBoardProps) => {
  return (
    <div className="flex flex-col justify-end gap-[24px] rounded-[12px] border-[1px] border-darkgrey py-[24px]">
      <div className="header relative flex items-center justify-center gap-[16px]">
        <div className="w-[55.5px] border-b-[1px] border-solid border-darkgrey"></div>
        <p className="text-[14px] font-semibold">THÔNG TIN TÁC PHẨM</p>
        <div className="w-[55.5px] border-b-[1px] border-solid border-darkgrey"></div>
      </div>
      {productDetail.map((item, index) => {
        if (!item.value || item.value === " x  x ") {
          return null;
        }

        return (
          <div key={index} className="flex ">
            <div className="flex items-center gap-[12px] px-[24px]">
              <div>{item.Icon}</div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px]">{item.label}</p>
                <div className="flex text-[14px]">
                  <p className="text-[14px] font-semibold">
                    {item.value} {item?.description}
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductDetailBoard;
