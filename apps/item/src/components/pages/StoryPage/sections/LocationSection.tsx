import Image from "next/image";
import SectionTitle from "./SectionTitle";
import LinearBackground from "@/components/common/LinearBackground/LinearBackground";
import clsx from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";
import Video from "@/components/common/Video";
import parse from "html-react-parser";

interface LocationInfoProps {
  title?: string;
  description?: string;
  className?: string;
  fluid?: boolean;
  delay?: number;
}

function LocationInfo({
  title,
  description,
  className,
  fluid,
  delay = 0.5,
}: LocationInfoProps) {
  return (
    <div
      className={clsx(
        !!className && className,
        "flex max-w-[275px] flex-col gap-[10px] text-white",
        !!fluid && "max-w-full"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay }}
      >
        {title && (
          <p className="mb-[6px] text-[20px] font-semibold leading-[24px]">
            {title}
          </p>
        )}
        {description && (
          <p className="rounded-md border-[1px] border-solid border-white px-[8px] py-[4px] text-[14px] font-normal leading-[22px]">
            {parse(description)}
          </p>
        )}
      </motion.div>
    </div>
  );
}

// farmName,
// fact1Title,
// fact1Description,
// fact2Title,
// fact2Description,
// fact3Description,
// farmHeight,
// farmArea,
// farmDescription;
export interface SectionProps {
  imageUrl?: string;
  countryVideoUrl?: string;
  countryVideoThumbnailUrl?: string;
  country?: string;
  farmName?: string;
  fact1Title?: string;
  fact1Description?: string;
  fact2Title?: string;
  fact2Description?: string;
  fact3Description?: string;
  farmHeight?: string;
  farmArea?: string;
  farmDescription?: string;
  farmShortDescription?: string;
  farmVideoUrl?: string;
  farmVideoThumbnailUrl?: string;
  inViewport?: boolean;
}

export default function LocationSection({
  imageUrl,
  countryVideoUrl,
  countryVideoThumbnailUrl,
  country,
  fact1Description,
  fact1Title,
  fact2Title,
  fact2Description,
  fact3Description,
  inViewport,
}: SectionProps) {
  const [isLoadEnd, setIsLoadEnd] = useState(false);

  return (
    <div className="flex h-full w-full flex-col overflow-x-hidden px-[16px] pt-[90px]">
      <LinearBackground alpha={0.7} className="z-[1]" />
      <div className="absolute left-0 top-0 z-0 h-full w-full">
        {countryVideoUrl && inViewport ? (
          <Video
            videoUrl={countryVideoUrl}
            thumbnailUrl={countryVideoThumbnailUrl as string}
            onLoadEnded={() => {
              setIsLoadEnd(true);
            }}
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
      <div className="z-[2] flex h-full w-full grow-[1] flex-col">
        {isLoadEnd && <SectionTitle title={country!} className="" />}
        <div className="info relative w-full grow-[1]">
          {(isLoadEnd || (!imageUrl && !countryVideoUrl)) && (
            <>
              <LocationInfo
                title={fact1Title}
                description={fact1Description}
                className="absolute right-0 top-[20px] text-right"
                delay={0.5}
              />

              <LocationInfo
                title={fact2Title}
                description={fact2Description}
                className="absolute left-0 top-[40%]"
                delay={1}
              />

              <div
                className={clsx(
                  "absolute bottom-[50px] flex w-full flex-col gap-[10px] px-[40px] text-center text-white"
                )}
              >
                {fact3Description && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    <div
                      className="rounded-md border-[1px] border-solid border-white px-[8px] py-[4px] text-[14px] font-medium leading-[22px]"
                      dangerouslySetInnerHTML={{
                        __html: fact3Description,
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
