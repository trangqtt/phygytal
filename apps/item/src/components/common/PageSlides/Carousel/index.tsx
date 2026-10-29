import { FC, useEffect, useState } from "react";
import LineText from "@/components/common/LineText";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useTranslation } from "next-i18next";
import { FadeInMotion } from "@/components/common/FadeInMotion";
import SectionFullScreen, {
  Section,
} from "@/components/common/SectionFullScreen/SectionFullScreen";
import { useFullScreenContext } from "@/hooks/useFullScreenContext";
import NormalSlide from "@/components/common/PageSlides/Normal";

export type Multilang = {
  en: string;
  vi: string;
};

export type CarouselSlideItem = {
  description: Multilang;
  image_url: string;
  imageUrl: string;
};

export type CarouselSlideProps = {
  craftmenName: string;
  carouselSlideItems: CarouselSlideItem[];
  title?: string;
  section: Section;
  firstSection?: Section;
};

const CarouselSlide: FC<CarouselSlideProps> = (props) => {
  const { carouselSlideItems = [], title, section, firstSection } = props;
  const { isInViewport } = useFullScreenContext(section);
  const { i18n } = useTranslation();
  const [showMainSection, setShowMainSection] = useState(false);

  const renderDescription = (slideItem: CarouselSlideItem) => {
    if (i18n.language === "vi") return slideItem?.description.vi;
    return slideItem?.description?.en;
  };

  useEffect(() => {
    let delay: any;
    if (isInViewport) {
      delay = setTimeout(function () {
        setShowMainSection(true);
      }, 1500);
    }

    return () => {
      setShowMainSection(false);
      clearTimeout(delay);
    };
  }, [isInViewport]);

  return (
    <>
      <SectionFullScreen name={section}>
        <>
          {firstSection && !showMainSection && (
            <NormalSlide
              section={section}
              className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-[16px] bg-[transparent] pb-[32px] pt-[80px] sm:gap-[24px]"
            >
              <p className="text-[24px] font-semibold uppercase">{title}</p>
            </NormalSlide>
          )}
          {(!firstSection || showMainSection) && (
            <FadeInMotion isVisible={isInViewport} delay={0.1}>
              <div className="flex h-[100vh] w-full flex-col gap-[24px] px-[16px] py-[80px]">
                <div className="flex w-full flex-col items-center justify-center gap-[24px]">
                  <LineText content={title ?? ""} />
                  <div className="w-full ">
                    <Swiper
                      modules={[Pagination]}
                      spaceBetween={5}
                      centeredSlides={true}
                      slidesPerView={1.15}
                      scrollbar={{ draggable: true }}
                    >
                      {carouselSlideItems.map(
                        (item: CarouselSlideItem, index: number) => (
                          <SwiperSlide key={index}>
                            <div className="relative flex h-[calc(100vh-150px)] w-full flex-col justify-center rounded-[20px]">
                              <img
                                src={item.image_url ?? item.imageUrl}
                                alt="Works"
                                className="h-auto max-h-[calc(100%-100px)] w-full rounded-[20px] object-contain"
                              />
                              <div className="flex h-fit w-full items-center justify-center rounded-b-[20px] bg-black-alpha p-[16px] backdrop-blur-md">
                                <p className="text-[14px] font-semibold">
                                  {renderDescription(item)}
                                </p>
                              </div>
                            </div>
                          </SwiperSlide>
                        )
                      )}
                    </Swiper>
                  </div>
                </div>
              </div>
            </FadeInMotion>
          )}
        </>
      </SectionFullScreen>
    </>
  );
};

export default CarouselSlide;
