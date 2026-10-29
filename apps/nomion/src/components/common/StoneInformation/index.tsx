import { FunctionComponent, useEffect, useState } from "react";
import HeartIcon from "../icons/HeartIcon";
import TickIcon from "../icons/TickIcon";

interface ProductDetailMobileProps {
  productItemId: string;
  stoneName: string;
  stoneTags: string[];
  stoneAuthor: string;
  stoneLikes?: number;
  totalLike: number;
  onLike(productItemId: string): void;
  setAuthorizerDialogOpen?: any;
}

const ProductDetailMobile: FunctionComponent<ProductDetailMobileProps> = ({
  productItemId,
  stoneName,
  stoneTags,
  stoneAuthor,
  totalLike,
  onLike,
  setAuthorizerDialogOpen,
}) => {
  const [stoneLikesCount, setstoneLikesCount] = useState<number>(totalLike);
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    if (totalLike) {
      setstoneLikesCount(totalLike);
    }

    if (productItemId) {
      const isLiked = localStorage.getItem(`liked-${productItemId}`) === "true";
      setLiked(isLiked);
    }
  }, [productItemId]);

  return (
    <div className="block w-full md:hidden">
      <div className="flex w-full justify-between">
        <div className="flex flex-col justify-start  gap-[4px] text-[24px] font-semibold">
          <p>{stoneName}</p>
          <div className="flex gap-[10px]">
            {stoneTags?.map((data, index) => {
              return (
                <div
                  key={index}
                  className="rounded-[100px] bg-darkgrey px-[12px] py-[2px] text-center text-[12px] font-semibold"
                >
                  {data.toUpperCase()}
                </div>
              );
            })}
          </div>
          <p
            className="mt-[4px] flex items-center justify-start gap-[4px] text-[14px] font-light text-lightgrey"
            onClick={() => {
              setAuthorizerDialogOpen(true);
            }}
          >
            Nghệ nhân{" "}
            <span className="text-[14px] font-semibold underline">
              {stoneAuthor}
            </span>
            <TickIcon />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailMobile;
