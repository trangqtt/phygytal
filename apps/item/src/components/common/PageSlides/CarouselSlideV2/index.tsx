import { FC, useEffect } from "react";
import { useTranslation } from "next-i18next";
import SectionFullScreen, {
  Section,
} from "@/components/common/SectionFullScreen/SectionFullScreen";
import NormalSlide from "@/components/common/PageSlides/Normal";
import { CarouselItemV2 } from "@/models/theme";
import { useFullScreenContext } from "@/hooks/useFullScreenContext";
import { Media } from "@/models/general";
import { useProductStory } from "@/hooks/useProductStory";
import clsx from "clsx";

export type CarouselSlideV2Props = {
  data: CarouselItemV2[];
  firstSection: Section;
  secondSection: Section;
  title: string;
  background: string;
};

const CarouselSlideV2: FC<CarouselSlideV2Props> = (props) => {
  const { data = [], firstSection, secondSection, title, background, } = props;
  const { i18n, t } = useTranslation();
  const { isInViewport } = useFullScreenContext(firstSection);
  const { isUnesco } = useProductStory();
  const renderItemTitle = (carouselItem: CarouselItemV2) => {
    if (i18n.language === "vi") return carouselItem?.title?.vi;

    return carouselItem?.title?.en;
  };

  const renderItemDesc = (carouselItem: CarouselItemV2) => {
    if (i18n.language === "vi") return carouselItem?.description?.vi;

    return carouselItem?.description?.en;
  };

  const renderImage = (carouselItem: CarouselItemV2) => {
    if (carouselItem.imageUrl) {
      return (carouselItem.imageUrl as Media)?.url ?? (carouselItem.imageUrl as string)
    }

    if (carouselItem.image_url) {
      return (carouselItem.image_url as Media)?.url ?? (carouselItem.image_url as string)
    }

    return "";
  }

  useEffect(() => {
    let delay: any;
    if (isInViewport) {
      delay = setTimeout(() => {
        const container = document.getElementById("snap-container");
        const targetEle = document.getElementById(secondSection)!;
        const top = targetEle.offsetTop;
        if (container) {
          container.scrollTo({
            top,
            behavior: "smooth",
          });
        }
      }, 1500);
    }

    return () => {
      if (isInViewport) {
        clearTimeout(delay);
      }
    };
  }, [isInViewport]);

  return (
    <>
      <SectionFullScreen name={firstSection}>
        <NormalSlide
          section={firstSection}
          background={background}
          className="absolute left-0 top-0 z-20 flex h-[100dvh] w-full flex-col items-center justify-center gap-[16px] bg-black-alpha-.8 pb-[32px] pt-[80px] sm:gap-[24px]"
        >
          <div className="relative flex h-[100svh] w-full flex-col pt-[80px]">
            <div className="flex flex-1 flex-col items-center justify-center gap-[20px] pb-[25%] text-center">
              <p className="text-[24px] font-semibold uppercase leading-[30px] max-w-sm">
                {title}
              </p>
            </div>
          </div>
        </NormalSlide>
      </SectionFullScreen>
      {data?.map((item: CarouselItemV2, index: number) => (
        <SectionFullScreen name={secondSection} key={index}>
          <NormalSlide
            delay={0.4}
            section={secondSection}
            className="absolute left-0 top-0 z-10 flex h-[100dvh] w-full flex-col items-center justify-center gap-[16px] bg-[transparent] sm:gap-[24px]"
          >
            <div className="relative flex h-full w-full flex-col justify-center gap-[15px] bg-black">
              <img
                src={renderImage(item)}
                alt="Culture"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center pt-[80px] backdrop-blur">
                <img
                  src={renderImage(item)}
                  alt="Culture"
                  className={clsx("h-full w-full object-cover")}
                />
              </div>
              <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-end bg-[transparent] pt-[80px]">
                <div className="flex min-h-20 max-h-44 overflow-y-hidden w-full flex-col items-start justify-center bg-black/[.2] px-6 py-4 backdrop-blur-[2px]">
                  <p className="text-[14px] font-semibold">
                    {renderItemTitle(item)}
                  </p>
                  <p className="text-[14px] font-light">
                    {renderItemDesc(item)}
                  </p>
                </div>
              </div>
            </div>
          </NormalSlide>
        </SectionFullScreen>
      ))}
    </>
  );
};

export default CarouselSlideV2;
