import { FC, useEffect, useState } from "react";
import LineText from "@/components/common/LineText";
import parse from "html-react-parser";
import { Author } from "@/models/product";
import { FadeInMotion } from "@/components/common/FadeInMotion";
import SectionFullScreen, {
  Section,
} from "@/components/common/SectionFullScreen/SectionFullScreen";
import { useFullScreenContext } from "@/hooks/useFullScreenContext";
import { useTranslation } from "react-i18next";
import NormalSlide from "@/components/common/PageSlides/Normal";
import Background from "@/assets/images/so-huu-co-vat-bg.webp";
import UnescoBackground from "@/assets/images/ho-van-quoc-tu.jpeg";
import DenTranNamDinh from "@/assets/images/dentran-namdinh.jpg";
import { useProductStory } from "@/hooks/useProductStory";
import clsx from "clsx";

export type CraftMenSectionProps = {
  craftman: Author;
  isHuePage?: boolean;
};

const CraftMenSection: FC<CraftMenSectionProps> = (props) => {
  const { t, i18n } = useTranslation();
  const { craftman, isHuePage } = props;
  const { isInViewport } = useFullScreenContext(Section.Craftmen);
  const [showMainSection, setShowMainSection] = useState(false);

  const { name, avatar, experience_year, artworks_count, translation } =
    craftman;

  const { isUnesco, isNgheDenTran } = useProductStory();

  const renderAuthorName = () => {
    if (i18n.language === "vi") return name.vi;
    return name?.en;
  };

  const renderAuthorQuote = () => {
    if (i18n.language === "vi") return translation?.vi?.quote;
    return translation?.en?.quote;
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

  const getBackgroundImg = () => {
    if (isNgheDenTran) {
      return DenTranNamDinh.src;
    }

    if (isUnesco) {
      return UnescoBackground.src;
    }

    return Background.src;
  };

  return (
    <SectionFullScreen name={Section.Craftmen}>
      {(isHuePage || isUnesco) && (
        <>
          <div className="absolute left-0 top-0 z-10 flex h-[100dvh] w-full flex-col items-center justify-center gap-[16px] bg-black-alpha-.8 px-[16px] pb-[32px] sm:gap-[24px]"></div>
          <FadeInMotion delay={0.2} className="h-full">
            <img
              src={getBackgroundImg()}
              alt="Background"
              className={clsx("h-[100dvh] w-full", isNgheDenTran && "object-cover")}
              fetchPriority="high"
            />
          </FadeInMotion>
        </>
      )}
      {!showMainSection && (
        <div className="absolute left-0 top-0 z-10 flex h-[100svh] w-full flex-col items-center justify-center gap-[16px] bg-[transparent] px-[16px] pb-[32px] sm:gap-[24px]">
          <NormalSlide section={Section.Craftmen}>
            <p className="text-[24px] font-semibold uppercase">
              {isHuePage || isUnesco ? "Sở hữu" : t("general.author")}
            </p>
          </NormalSlide>
        </div>
      )}
      {showMainSection && (
        <div className="absolute left-0 top-0 z-10 flex h-[100svh] w-full flex-col items-center justify-center gap-[16px] bg-[transparent] px-[16px] pb-[32px] pt-[100px] sm:gap-[24px]">
          <FadeInMotion isVisible={isInViewport} delay={0.2}>
            <LineText
              content={isHuePage || isUnesco ? "Sở hữu" : t("general.author")}
            />
          </FadeInMotion>
          <FadeInMotion
            isVisible={isInViewport}
            delay={0.4}
            className="aspect-square h-auto !w-auto"
          >
            <div className="avatar-wrapper relative  min-h-[150px] w-full max-w-full rounded-full">
              <img
                src={avatar.url || "/images/default-avatar.jpg"}
                alt="Artist avatar"
                className="m-auto aspect-square h-full max-h-[35vh] w-auto rounded-full"
              />
            </div>
          </FadeInMotion>
          <FadeInMotion isVisible={isInViewport} delay={0.6}>
            <p className="m-auto text-center text-[24px] font-semibold capitalize">
              {renderAuthorName()}
            </p>
          </FadeInMotion>
          {(experience_year || artworks_count) && (
            <FadeInMotion isVisible={isInViewport} delay={0.8}>
              <div
                className={`flex h-fit w-full items-center ${
                  artworks_count && experience_year
                    ? "justify-between"
                    : "justify-center"
                } rounded-[12px] border-[1px] border-[#454545] p-[12px] sm:p-[16px]`}
              >
                {experience_year && (
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <p className="text-[20px] font-semibold">
                      {experience_year}
                    </p>
                    <p className="text-[14px] text-[#BFBFBF]">
                      {t("general.experience")}
                    </p>
                  </div>
                )}
                {artworks_count && experience_year && (
                  <div className="w-[40px] rotate-90 rounded-lg border border-[#BFBFBF] bg-[#BFBFBF]"></div>
                )}
                {artworks_count && (
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <p className="text-[20px] font-bold">{artworks_count}</p>
                    <p className="text-[14px] text-[#BFBFBF]">
                      {t("general.artwork")}
                    </p>
                  </div>
                )}
              </div>
            </FadeInMotion>
          )}
          <FadeInMotion
            isVisible={isInViewport}
            delay={1}
            className="glow-[1] h-full"
          >
            <div className="craftmen-quote text-center text-[16px] font-light italic leading-[20px]">
              {parse(renderAuthorQuote() ?? "")}
            </div>
          </FadeInMotion>
        </div>
      )}
    </SectionFullScreen>
  );
};

export default CraftMenSection;
