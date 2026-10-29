import { FC, useEffect, useState } from "react";
import LineText from "@/components/common/LineText";
import parse from "html-react-parser";
import { FadeInMotion } from "@/components/common/FadeInMotion";
import SectionFullScreen, {
  Section,
} from "@/components/common/SectionFullScreen/SectionFullScreen";
import { useFullScreenContext } from "@/hooks/useFullScreenContext";
import { useTranslation } from "react-i18next";
import HueBackground from "@/assets/images/thong-tin-hien-vat-bg.webp";
import UnescoBackground from "@/assets/images/vanmien_background.png";
import ProductInfoBackground from "@/assets/images/product-info-bg.jpg";
import DenTranNamDinh2 from "@/assets/images/le-hoi-khai-an.jpg";
import NormalSlide from "@/components/common/PageSlides/Normal";
import { useProductStory } from "@/hooks/useProductStory";

export type InfoProps = {
  imageUrl: string;
  description: string;
};

const InfoSection: FC<InfoProps> = ({ description, imageUrl }) => {
  const { t } = useTranslation();
  const { isInViewport } = useFullScreenContext(Section.Info);
  const [showMainSection, setShowMainSection] = useState(false);
  const { isHuePage, isUnesco, isNgheDenTran } = useProductStory();

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

  const getBackgroundImg = () => {
    if (isHuePage) {
      return HueBackground.src;
    }

    if (isNgheDenTran) {
      return DenTranNamDinh2.src;
    }

    if (isUnesco) {
      return UnescoBackground.src;
    }

    return ProductInfoBackground.src;
  };

  return (
    <SectionFullScreen name={Section.Info}>
      <div className="absolute left-0 top-0 z-10 flex h-[100svh] w-full flex-col items-center justify-center gap-[16px] bg-black-alpha-.7 px-[16px] pb-[32px] sm:gap-[24px]"></div>
      <FadeInMotion delay={0.2} className="h-full">
        <img
          src={getBackgroundImg()}
          alt="Background"
          className="h-[100dvh] w-full object-cover"
        />
      </FadeInMotion>
      {!showMainSection && (
        <div className="absolute left-0 top-0 z-10 flex h-[100svh] w-full flex-col items-center justify-center gap-[16px] bg-[transparent] px-[16px] pb-[32px] sm:gap-[24px]">
          <NormalSlide section={Section.Info}>
            <p className="text-[24px] font-semibold uppercase">
              {isHuePage
                ? t("general.artifactInformation")
                : t("general.productInformation")}
            </p>
          </NormalSlide>
        </div>
      )}
      {showMainSection && (
        <div className="absolute left-0 top-0 z-10 flex h-[100svh] w-full flex-col items-center justify-center gap-[16px] bg-[transparent] px-[16px] pb-[32px] pt-[120px] sm:gap-[24px]">
          <FadeInMotion delay={0.2}>
            <LineText
              content={
                isHuePage
                  ? t("general.artifactInformation")
                  : t("general.productInformation")
              }
            />
          </FadeInMotion>
          <div className="flex h-full flex-1 flex-col gap-[32px]">
            <FadeInMotion delay={0.5} className="h-full">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Background"
                  className="h-[50%] w-full object-contain"
                />
              )}
              <div className="h-[50%] text-[16px] font-light leading-[20px]">
                {parse(description)}
              </div>
            </FadeInMotion>
          </div>
        </div>
      )}
    </SectionFullScreen>
  );
};

export default InfoSection;
