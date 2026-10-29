import Loader from "@/components/common/Loader";
import { FC, SetStateAction, useEffect, useState } from "react";
import ProductDetailMobile from "@/components/common/StoneInformation";
import { Accordion } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ProductTag } from "@/models/Product";
import ProductDetailDesktop from "@/components/pages/Stone2023/ProductDetailDesktop";
import Product3DModel from "@/components/pages/Stone2023/Product3DModel";
import { useTranslation } from "react-i18next";
import { Languages } from "@/models/General";

export type ProductDetailCardProps = {
  isExpandDetail: boolean;
  setIsExpandDetail(value: SetStateAction<boolean>): void;
  data: ProductTag | undefined;
  setAuthorizerDialogOpen: any;
  likeHandle: any;
  onClickViewmoreDescription(): void;
};

export const CustomAccordion = styled(Accordion)(({ theme }) => ({
  "& .MuiAccordionSummary-root": {
    backgroundColor: "transparent !important",
  },
  "& .MuiCollapse-root": {
    backgroundColor: "transparent !important",
  },
}));

const ProductDetailCard: FC<ProductDetailCardProps> = (props) => {
  const {
    data,
    setAuthorizerDialogOpen,
    onClickViewmoreDescription,
    likeHandle,
  } = props;
  
  const [liked, setLiked] = useState<boolean>(false);
  const [isFliped, setIsFliped] = useState<boolean>(false);
  const [totalLike, setTotalLike] = useState<number>(0);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (data?.total_like) {
      setTotalLike(data?.total_like);
    }

    if (data) {
      const isLiked =
        localStorage.getItem(`liked-${data.product_item_id}`) === "true";
      setLiked(isLiked);
    }
  }, [data?.product_item_id]);

  return (
    <>
      {!data && <Loader />}
      {data && (
        <div className="flex h-full w-full flex-col justify-center gap-[40px] md:flex-row">
          <Product3DModel
            isFliped={isFliped}
            threeDUrl={data?.product_detail?.three_dimension?.url ?? ""}
            productDescription={
              data?.product_detail?.attribute?.translation[
                i18n.language as Languages
              ]?.description ?? ""
            }
            onClickViewmoreDescription={onClickViewmoreDescription}
            setIsFliped={setIsFliped}
          />
          <ProductDetailDesktop
            data={data}
            liked={liked}
            setLiked={setLiked}
            totalLike={totalLike}
            setTotalLike={setTotalLike}
            likeHandle={likeHandle}
            setAuthorizerDialogOpen={setAuthorizerDialogOpen}
          />
          <ProductDetailMobile
            onLike={likeHandle}
            productItemId={data?.product_item_id}
            stoneAuthor={data?.product_detail?.attribute?.craftsman?.name}
            stoneName={data?.product_detail?.product_name}
            stoneTags={data?.product_detail.tags}
            totalLike={data?.total_like ?? 0}
            setAuthorizerDialogOpen={setAuthorizerDialogOpen}
          />
        </div>
      )}
    </>
  );
};

export default ProductDetailCard;
