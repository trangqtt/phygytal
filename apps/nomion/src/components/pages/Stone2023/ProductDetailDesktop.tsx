import HeartIcon from "@/components/common/icons/HeartIcon";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TickIcon from "@/components/common/icons/TickIcon";
import parse from "html-react-parser";
import { ProductOnchainStatus } from "@/models/Product";
import Link from "next/link";
import { shortenString } from "@/utils/helper";
import { FC, SetStateAction, useState } from "react";
import {
  CustomAccordion,
  ProductDetailCardProps,
} from "@/components/pages/Stone2023/ProductDetailCard";
import { useTranslation } from "react-i18next";
import { Languages } from "@/models/General";

export type ProductDetailDesktopProps = Partial<ProductDetailCardProps> & {
  liked: boolean;
  setLiked: (value: SetStateAction<boolean>) => void;
  totalLike: number;
  setTotalLike: (value: SetStateAction<number>) => void;
};

const ProductDetailDesktop: FC<ProductDetailDesktopProps> = (props) => {
  const {
    data,
    liked,
    likeHandle,
    totalLike,
    setTotalLike,
    setLiked,
    setAuthorizerDialogOpen,
  } = props;

  const { t, i18n } = useTranslation();

  const [collapse, setCollapse] = useState<{
    nft: boolean;
    productInfo: boolean;
  }>({ nft: false, productInfo: true });

  const onToggleProductInfo = () => {
    const currentCollapse = { ...collapse };

    currentCollapse.productInfo = !currentCollapse.productInfo;
    currentCollapse.nft = false;
    setCollapse(currentCollapse);
  };

  const onToggleNft = () => {
    const currentCollapse = { ...collapse };
    currentCollapse.productInfo = false;
    currentCollapse.nft = !currentCollapse.nft;
    setCollapse(currentCollapse);
  };

  return (
    <div className="hidden h-[80%] w-full items-center justify-center lg:flex lg:w-[50%] lg:flex-col lg:gap-[12px]">
      <div className="relative flex h-fit w-[450px] flex-col gap-[8px] rounded-[12px] border border-[#262626] px-[24px] py-[12px]">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col gap-[12px]">
            <p className="text-[24px] font-bold">
              {data?.product_detail?.product_name}
            </p>
            <div className="flex w-full gap-[8px]">
              {data?.product_detail.tags?.map((item: any, index: number) => (
                <div
                  className="h-fit w-fit rounded-full bg-[#595959] px-[12px] py-[4px]"
                  key={index}
                >
                  <p className="text-[12px] font-semibold uppercase">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-[4px]">
            <div
              className={`cursor-pointer rounded-full p-[10px] hover:scale-105 ${
                liked ? "bg-red-alpha" : "bg-N9"
              }`}
              onClick={() => {
                if (!liked) {
                  likeHandle(data?.product_item_id);
                  setTotalLike(totalLike + 1);
                  localStorage.setItem(
                    `liked-${data?.product_item_id}`,
                    "true"
                  );
                  setLiked(true);
                }
              }}
            >
              <HeartIcon
                color={`${
                  liked ? "rgba(255, 17, 60, 1)" : "rgba(240, 240, 240, 1)"
                }`}
              />
            </div>
            <p>{totalLike}</p>
          </div>
        </div>
      </div>
      <div className="relative h-fit w-[450px] rounded-[12px] border-[1px] border-[#262626]">
        <CustomAccordion
          sx={{ bgcolor: "transparent" }}
          expanded={collapse.productInfo}
          onClick={onToggleProductInfo}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <p className="text-[16px] font-semibold">Thông tin tác phẩm</p>
          </AccordionSummary>
          <AccordionDetails>
            <div className="craftmen-quote flex max-h-[180px] flex-col gap-[10px] overflow-y-scroll pr-[5px] text-justify text-[16px] font-light italic leading-[20px]">
              <div
                className="flex cursor-pointer items-center justify-start gap-[4px] font-semibold uppercase not-italic"
                onClick={() => {
                  setAuthorizerDialogOpen(true);
                }}
              >
                <span className="font-normal normal-case">Tác giả</span>{" "}
                {data?.author?.name?.vi}
                <TickIcon />
              </div>
              {data?.author?.contact_name && (
                <div className="not-italic">
                  <span className="font-normal normal-case">Sở hữu bởi:</span>{" "}
                  <span className="!font-bold !uppercase !text-white">
                    {data?.author?.contact_name}
                  </span>
                </div>
              )}
              {parse(
                data?.product_detail?.attribute?.translation[
                  i18n.language as Languages
                ]?.description ?? ""
              )}
            </div>
          </AccordionDetails>
        </CustomAccordion>
      </div>
      {data?.digital_asset_status === ProductOnchainStatus.Active && (
        <div className="relative h-fit w-[450px] rounded-[12px] border-[1px] border-[#262626]">
          <CustomAccordion
            sx={{ bgcolor: "transparent" }}
            expanded={collapse.nft}
            onClick={onToggleNft}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p className="text-[16px] font-semibold">Thông tin số hoá</p>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col gap-[8px]">
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-medium text-[#bfbfbf]">
                  Collection
                </p>
                <Link
                  className="text-[14px] font-semibold text-[#f0f0f0] underline"
                  href={`https://testnets.opensea.io/assets?search[query]=${data?.contract_address}`}
                  target="_blank"
                >
                  {data?.collection_name ?? ""}
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-medium text-[#bfbfbf]">
                  Contract Address
                </p>
                <Link
                  className="text-[14px] font-semibold text-[#f0f0f0] underline"
                  href={`https://sepolia.etherscan.io/address/${data?.contract_address}`}
                  target="_blank"
                >
                  {shortenString(data?.contract_address ?? "")}
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-medium text-[#bfbfbf]">
                  Token Standard
                </p>
                <p className="text-[14px] font-semibold text-[#f0f0f0]">
                  DRC-721
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-medium text-[#bfbfbf]">Chain</p>
                <p className="text-[14px] font-semibold text-[#f0f0f0]">
                  DaNangChain
                </p>
              </div>
            </AccordionDetails>
          </CustomAccordion>
        </div>
      )}
    </div>
  );
};

export default ProductDetailDesktop;
