import Loader from "@/components/common/Loader";
import { motion } from "framer-motion";
import { FC, SetStateAction, useEffect, useState } from "react";
import parse from "html-react-parser";
import InformationFlipIcon from "../../common/icons/FlipIcon";
import ReactCardFlip from "react-card-flip";
import LineText from "@/components/common/LineText";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

function ProductImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="h-full w-full">
      <img
        alt="lej"
        src={imageUrl}
        className="m-auto max-h-full max-w-full object-contain"
      />
    </div>
  );
}

export type ProductInfoProps = {
  isExpandDetail: boolean;
  setIsExpandDetail(value: SetStateAction<boolean>): void;
  data: any;
  setAuthorizerDialogOpen: any;
  likeHandle: any;
  onClickViewmoreDescription(): void;
};

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  "& .MuiAccordionSummary-root": {
    backgroundColor: "transparent !important",
  },
  "& .MuiCollapse-root": {
    backgroundColor: "transparent !important",
  },
}));

const ProductInfo: FC<ProductInfoProps> = (props) => {
  const {
    data,
    setAuthorizerDialogOpen,
    onClickViewmoreDescription,
    likeHandle,
  } = props;

  const [liked, setLiked] = useState<boolean>(false);
  const [isFliped, setIsFliped] = useState<boolean>(false);
  const [totalLike, setTotalLike] = useState<number>(0);
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
        <div className="flex h-[calc(100svh-175px)] w-full flex-col justify-center gap-[40px] md:flex-row">
          <div className="hidden h-[80%] w-full lg:block lg:w-[50%]">
            <ProductImage imageUrl={data.imageUrl} />
          </div>
          <div className="relative block h-full w-full lg:hidden">
            <ReactCardFlip
              isFlipped={isFliped}
              flipDirection="horizontal"
              containerClassName="w-full h-full"
            >
              <motion.div
                className="h-full w-full"
                initial={{ opacity: `${isFliped ? 1 : 0}` }}
                animate={{ opacity: `${isFliped ? 0 : 1}` }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <ProductImage imageUrl={data.imageUrl} />
              </motion.div>
              <motion.div
                className="flex h-[300px] w-full flex-col gap-[14px] rounded-[12px] border border-[#262626] p-[24px]"
                initial={{ opacity: `${!isFliped ? 1 : 0}` }}
                animate={{ opacity: `${!isFliped ? 0 : 1}` }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <LineText content="ý nghĩa" />
                <div className="craftmen-quote max-h-[180px] overflow-y-scroll pr-[5px] text-justify text-[16px] font-light italic leading-[20px] text-[#8c8c8c]">
                  {parse(data?.description ?? "")}
                </div>
              </motion.div>
            </ReactCardFlip>
            <div
              className="absolute bottom-0 right-0 z-10 flex cursor-pointer flex-col justify-center gap-[8px]"
              onClick={() => {
                setIsFliped(!isFliped);
              }}
            >
              <div className="rounded-full bg-lesslightgrey p-[10px] ">
                <InformationFlipIcon />
              </div>
              <div className="w-[40px] text-center text-[12px] font-medium">
                {!isFliped ? "Thông tin" : "Hình ảnh"}
              </div>
            </div>
          </div>
          <div className="hidden h-full w-full items-center justify-center md:w-[50%] lg:flex lg:flex-col lg:gap-[12px]">
            <div className="relative flex h-fit w-[450px] flex-col gap-[8px] rounded-[12px] border border-[#262626] px-[24px] py-[12px]">
              <div className="flex w-full items-start justify-between">
                <div className="flex flex-col gap-[12px]">
                  <p className="text-[24px] font-bold">{data?.name}</p>
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
                  <p className="text-[16px] font-semibold">
                    Thông tin sản phẩm
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="craftmen-quote flex max-h-[180px] flex-col gap-[10px] overflow-y-scroll pr-[5px] text-justify text-[16px] font-light italic leading-[20px]">
                    {parse(data?.description ?? "")}
                  </div>
                </AccordionDetails>
              </CustomAccordion>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfo;
