import { HeightIcon } from "@/components/common/icons";
import AcreageIcon from "../../../common/icons/AcreageIcon";

import { useState } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { SectionProps } from "./LocationSection";
import parse from "html-react-parser";
import clsx from "clsx";
import { motion } from "framer-motion";
import ArrowRightIcon from "@/components/common/icons/ArrowRightIcon";
import ArrowLeftIcon from "@/components/common/icons/ArrowLeftIcon";
import Video from "@/components/common/Video";

export const defaultPoint = {
  lat: 12.02083,
  lng: 108.35312,
};

export default function FarmSection({
  imageUrl,
  farmName,
  farmHeight,
  farmArea,
  farmDescription,
  farmShortDescription,
  farmVideoUrl,
  farmVideoThumbnailUrl,
  inViewport,
}: SectionProps) {
  const { t } = useTranslation();
  const [expand, setExpand] = useState<boolean>(false);
  const [isLoadEnd, setIsLoadEnd] = useState(false);

  const onClickViewMore = () => {
    setExpand(!expand);
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-0 z-0 h-full w-full">
        {farmVideoUrl && inViewport ? (
          <Video
            videoUrl={farmVideoUrl}
            thumbnailUrl={farmVideoThumbnailUrl as string}
            onLoadEnded={() => setIsLoadEnd(true)}
            muted
          />
        ) : (
          imageUrl && (
            <img
              src={imageUrl ?? ""}
              alt=""
              className="w-full h-full object-contain"
            />
          )
        )}
      </div>
      <div className="relative z-[1] flex h-full flex-col justify-between bg-contain">
        <div className="mt-[80px] flex flex-col items-center justify-center gap-[24px]">
          {inViewport && (isLoadEnd || (!imageUrl && !farmVideoUrl)) && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-[12px] flex justify-center"
              >
                <p className="border-white border-b-[1px] text-[18px] leading-[24px] font-semibold border-solid uppercase">
                  {farmName ?? "Farm"}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-[12px] flex justify-center"
              >
                <div className=" flex w-fit gap-[24px] rounded border-[1px] border-lesslightgrey bg-black/50 py-[8px] pl-[16px] pr-[24px]">
                  <div className="border-custom-gradient-1 flex flex-row items-center">
                    <div className="flex h-full items-center">
                      <HeightIcon />
                    </div>
                    <div className="flex flex-col ">
                      <p className="text-[14px] font-light">
                        {t("page.story.height")}
                      </p>
                      <p className="text-[20px] font-semibold">{farmHeight}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-[0px] w-[32px] rotate-90 border-t-[1px] border-solid border-white"></div>
                  </div>
                  <div className="flex">
                    <div className="flex items-center">
                      <AcreageIcon />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[14px] font-light">
                        {t("page.story.area")}
                      </p>
                      <p className="text-[20px] font-semibold">{farmArea}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
        <div
          className={clsx(
            "absolute bottom-[50px] flex w-full flex-col gap-[10px] px-[10px] text-center text-white"
          )}
        >
          {farmDescription && isLoadEnd && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-[12px] flex justify-center"
            >
              <motion.div
                className="flex flex-col gap-[8px] justify-between rounded-md border-[1px] border-solid border-lesslightgrey bg-black/50 py-[16px] px-[8px] text-[14px] font-medium leading-[22px]"
                animate={{
                  maxHeight: expand ? "350px" : "180px",
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <motion.div
                  animate={{
                    maxHeight: expand ? "270px" : "100px",
                    overflow: expand ? "auto" : "hidden",
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  {parse(
                    expand
                      ? (farmDescription as string)
                      : (farmShortDescription as string)
                  )}
                </motion.div>
                <div
                  className="flex w-full items-center justify-center gap-[4px] uppercase underline"
                  onClick={onClickViewMore}
                >
                  {!expand && <>{t("general.detail")}</>}
                  {expand && <>{t("general.collapse")}</>}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
