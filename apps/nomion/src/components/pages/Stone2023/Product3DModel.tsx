import { FC, SetStateAction } from "react";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";
import ThreeModel from "@/components/common/ThreeModel";
import LineText from "@/components/common/LineText";
import parse from "html-react-parser";
import InformationFlipIcon from "@/components/common/icons/FlipIcon";
import ThreeDFlipIcon from "@/components/common/icons/3DFlipIcon";

export type Product3DModelProps = {
  isFliped: boolean;
  threeDUrl: string;
  productDescription: string;
  onClickViewmoreDescription: () => void;
  setIsFliped: (value: SetStateAction<boolean>) => void;
};

const Product3DModel: FC<Product3DModelProps> = (props) => {
  const {
    isFliped,
    threeDUrl,
    setIsFliped,
    onClickViewmoreDescription,
    productDescription,
  } = props;
  return (
    <div className="relative block h-[calc(100%-80px)] w-full lg:w-[50%]">
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
          <ThreeModel key={threeDUrl} assetUrl={threeDUrl} />
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
            {parse(productDescription)}
          </div>
          {/* <p
            className="cursor-pointer text-center text-[14px] font-bold underline"
            onClick={onClickViewmoreDescription}
          >
            Xem thêm
          </p> */}
        </motion.div>
      </ReactCardFlip>
      <div
        className="absolute bottom-[60px] right-[13px] z-10 flex cursor-pointer flex-col justify-center gap-[8px] lg:hidden"
        onClick={() => {
          setIsFliped(!isFliped);
        }}
      >
        <div className="rounded-full bg-lesslightgrey p-[10px] ">
          {!isFliped ? <InformationFlipIcon /> : <ThreeDFlipIcon />}
        </div>
        <div className="w-[40px] text-center text-[12px] font-medium">
          {!isFliped ? "Thông tin" : "Xem 3D"}
        </div>
      </div>
    </div>
  );
};

export default Product3DModel;
