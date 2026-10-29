import { useEffect } from "react";
import NormalSlide from "@/components/common/PageSlides/Normal";
import { useFullScreenContext } from "@/hooks/useFullScreenContext";
import { Media } from "@/models/general";
import { BaseSectionProps } from "@/models/SectionProps";
import parse from "html-react-parser";
import SectionFullScreen from "@/components/common/SectionFullScreen";

interface MediaItem {
  image: Media;
  title?: string;
  description?: string;
}

interface VerticalCarouselSectionProps extends BaseSectionProps {}

interface VerticalCarouselSectionData {
  title: string;
  background: Media;
  list_images: MediaItem[];
}

export default function VerticalCarouselSection({
  id,
  sectionData,
}: VerticalCarouselSectionProps) {
  const {
    title,
    background,
    list_images: listImage,
  } = sectionData as Partial<VerticalCarouselSectionData>;
  const { isInViewport } = useFullScreenContext(`${id!}-first`);

  useEffect(() => {
    let delay: any;
    if (isInViewport) {
      delay = setTimeout(() => {
        const container = document.getElementById("snap-container");
        const targetEle = document.getElementById(`${id!}-second`)!;
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
  }, [id, isInViewport]);

  return (
    <>
      <SectionFullScreen name={`${id!}-first`}>
        <NormalSlide
          section={`${id!}-first`}
          background={background?.url}
          className="absolute left-0 top-0 z-20 flex h-[100dvh] w-full flex-col items-center justify-center gap-[16px] bg-black-alpha-.8 pb-[32px] pt-[80px] sm:gap-[24px]"
        > 
          <div className="relative flex h-[100svh] w-full flex-col pt-[80px] justify-center items-center">
            <p className="text-[24px] font-semibold uppercase leading-[30px] text-center">
              {title}
            </p>
          </div>
        </NormalSlide>
      </SectionFullScreen>
      {listImage?.map(({ image, title, description }, index: number) => (
        <SectionFullScreen name={`${id!}-second`} key={index}>
          <NormalSlide
            delay={0.4}
            section={`${id!}-second-${index}`}
            className="absolute left-0 top-0 z-10 flex h-[100dvh] w-full flex-col items-center justify-center gap-[16px] bg-[transparent] sm:gap-[24px]"
          >
            <div className="relative flex h-full w-full flex-col justify-center gap-[15px] bg-black">
              <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center pt-[80px] backdrop-blur">
                <img
                  src={image?.url}
                  alt="Culture"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-end bg-[transparent] pt-[80px]">
                <div className="min-h-20 flex max-h-40 w-full flex-col items-start justify-center overflow-y-hidden bg-black-alpha px-6 py-4 backdrop-blur-md">
                  {title && (
                    <p className="text-[14px] font-semibold text-white">{title}</p>
                  )}
                  {description && (
                    <p className="text-[14px] font-light">
                      {parse(description)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </NormalSlide>
        </SectionFullScreen>
      ))}
    </>
  );
}
