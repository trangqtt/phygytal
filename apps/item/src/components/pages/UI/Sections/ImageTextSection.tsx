import LineText from "@/components/common/LineText";
import SectionFullScreen from "@/components/common/SectionFullScreen/SectionFullScreen";
import { FadeInMotion } from "@/components/common/FadeInMotion";
import { BaseSectionProps } from "@/models/SectionProps";
import { Media } from "@/models/general";
import parse from "html-react-parser";
import { FC } from "react";

interface ImageTextSectionProps extends BaseSectionProps {}

interface ImageTextSectionData {
  title: string;
  image: Media;
  text: string;
  background: Media;
}

const ImageTextSection: FC<ImageTextSectionProps> = ({
  id,
  sectionData,
  hasAnimation = true,
}) => {
  const { title, image, text, background } =
    sectionData as Partial<ImageTextSectionData>;

  return (
    <SectionFullScreen name={id}>
      <div className="absolute left-0 top-0 z-10 flex h-[100svh] w-full flex-col items-center justify-center gap-[16px] bg-black-alpha-.7 px-[16px] pb-[32px] sm:gap-[24px]"></div>
      {background?.url && (
        <FadeInMotion
          duration={!hasAnimation ? 0 : 0.5}
          delay={hasAnimation ? 0.1 : 0}
          className="h-full"
        >
          <img
            src={background?.url}
            alt="Background"
            className="h-[100dvh] w-full object-cover"
          />
        </FadeInMotion>
      )}
      <div className="absolute left-0 top-0 z-10 flex h-[100svh] w-full flex-col items-center justify-center gap-[16px] bg-[transparent] px-[16px] pb-[32px] pt-[100px] sm:gap-[24px]">
        {title && (
          <FadeInMotion
            duration={!hasAnimation ? 0 : 0.5}
            delay={hasAnimation ? 0.2 : 0}
          >
            <LineText content={title} />
          </FadeInMotion>
        )}
        <div className="flex h-full flex-1 flex-col gap-[32px]">
          <FadeInMotion
            duration={!hasAnimation ? 0 : 0.5}
            delay={hasAnimation ? 0.5 : 0}
            className="h-full"
          >
            {image?.url && (
              <img
                src={image?.url}
                alt="image"
                className="h-[50%] w-full object-contain"
              />
            )}
            {text && (
              <div className="h-[50%] text-[16px] font-light leading-[20px]">
                {parse(text)}
              </div>
            )}
          </FadeInMotion>
        </div>
      </div>
    </SectionFullScreen>
  );
};

export default ImageTextSection;
