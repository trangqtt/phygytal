import { FunctionComponent, useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";
import { likeKey } from "@/constant";
import { FadeInMotion, FadeInMotionV2 } from "@/components/common/FadeInMotion";
import Medal, { MedalType } from "../Medal";
import HeartFillIcon from "../icons/HeartFillIcon";
import InfoFillIcon from "../icons/InfoFillIcon";
import { useTranslation } from "react-i18next";

type productFlipSectionType = {
  front: any;
  back: any;
};

interface ProductImageImageSectionProps {
  totalLike: number;
  productFlipSection: productFlipSectionType;
  productItemId?: string;
  isLoaded3D?: boolean;
  rank?: number;
  asset3DUrl: string;
  onLike?(params?: any): void;
}

const ProductImageSection: FunctionComponent<ProductImageImageSectionProps> = ({
  productFlipSection,
  totalLike,
  productItemId,
  rank,
  isLoaded3D = false,
  onLike,
}: ProductImageImageSectionProps) => {
  const { t } = useTranslation();
  const [isFliped, setIsFliped] = useState<boolean>(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(totalLike);

  const getMedalType = () => {
    switch (rank) {
      case 1:
        return MedalType.Winner;
      case 2:
        return MedalType.Second;
      case 3:
        return MedalType.Third;
      case 4:
        return MedalType.Fourth;
      default:
        return MedalType.None;
    }
  };

  useEffect(() => {
    setLiked(localStorage.getItem(`${likeKey}-${productItemId}`) === "true");
  }, [setLiked, productItemId]);

  return (
    <div className="relative flex h-[calc(100%-200px)] w-full justify-center pt-[80px]">
      <div className="absolute bottom-[60px] right-[15px] z-10">
        <div className="flex flex-col gap-[12px]">
          <FadeInMotion isVisible={isLoaded3D} delay={0.4}>
            <div className="flex flex-col justify-center gap-[8px]">
              <div
                className="flex cursor-pointer items-center justify-center"
                onClick={() => {
                  setIsFliped(!isFliped);
                }}
              >
                <InfoFillIcon />
              </div>
              <div className="w-[40px] text-center text-[12px] font-medium">
                {!isFliped ? t("general.information") : "Xem 3D"}
              </div>
            </div>
          </FadeInMotion>
          <FadeInMotion isVisible={isLoaded3D} delay={0.6}>
            <div className="flex flex-col items-center gap-[4px]">
              <div
                onClick={() => {
                  if (!liked) {
                    onLike?.();
                    setLiked(true);
                    setLikeCount((like) => like + 1);
                  }
                }}
              >
                <HeartFillIcon fill={liked ? "red" : "#f0f0f0"} />
              </div>
              <p>{likeCount}</p>
            </div>
          </FadeInMotion>
        </div>
      </div>
      <ReactCardFlip
        isFlipped={isFliped}
        flipDirection="horizontal"
        containerClassName="w-full"
      >
        <motion.div
          className={`relative h-full w-full`}
          initial={{ opacity: `${isFliped ? 1 : 0}` }}
          animate={{ opacity: `${isFliped ? 0 : 1}` }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          {productFlipSection.front}
          {!!rank && (
            <FadeInMotionV2 isVisible={isLoaded3D} delay={0.6}>
              <Medal type={getMedalType()} />
            </FadeInMotionV2>
          )}
        </motion.div>
        <motion.div
          className={`flex h-full flex-col justify-center`}
          initial={{ opacity: `${!isFliped ? 1 : 0}` }}
          animate={{ opacity: `${!isFliped ? 0 : 1}` }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          {productFlipSection.back}
        </motion.div>
      </ReactCardFlip>
    </div>
  );
};

export default ProductImageSection;
