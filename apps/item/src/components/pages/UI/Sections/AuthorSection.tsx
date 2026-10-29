import { FC, useEffect, useState } from "react";
import LineText from "@/components/common/LineText";
import parse from "html-react-parser";
import { FadeInMotion } from "@/components/common/FadeInMotion";
import SectionFullScreen, {
  Section,
} from "@/components/common/SectionFullScreen/SectionFullScreen";
import { useFullScreenContext } from "@/hooks/useFullScreenContext";
import { useTranslation } from "react-i18next";
import NormalSlide from "@/components/common/PageSlides/Normal";
import { BaseSectionProps } from "@/models/SectionProps";
import { Media } from "@/models/general";

interface AuthorSectionData {
  name: string;
  avatar: Media;
  experience_year: string;
  artworks_count: string;
  quote: string;
}

export interface AuthorSectionProps extends BaseSectionProps {}

const AuthorSection: FC<AuthorSectionProps> = ({ sectionData, id }) => {
  const { t, i18n } = useTranslation();
  const { isInViewport } = useFullScreenContext(id);
  const [showMainSection, setShowMainSection] = useState(false);

  const { name, avatar, experience_year, artworks_count, quote } =
    sectionData as AuthorSectionData;

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
    <SectionFullScreen name={id}>
      {!showMainSection && (
        <div className="absolute left-0 top-0 z-10 flex h-[100svh] w-full flex-col items-center justify-center gap-[16px] bg-[transparent] px-[16px] pb-[32px] sm:gap-[24px]">
          <NormalSlide section={Section.Craftmen}>
            <p className="text-[24px] font-semibold uppercase">
              {t("general.author")}
            </p>
          </NormalSlide>
        </div>
      )}
      {showMainSection && (
        <div className="absolute left-0 top-0 z-10 flex h-[100svh] w-full flex-col items-center justify-center gap-[16px] bg-[transparent] px-[16px] pb-[32px] pt-[100px] sm:gap-[24px]">
          <FadeInMotion delay={0.2}>
            <LineText content={t("general.author")} />
          </FadeInMotion>
          <FadeInMotion
          
            delay={0.4}
            className="aspect-square h-auto !w-auto"
          >
            <div className="avatar-wrapper relative  min-h-[150px] w-full max-w-full rounded-full">
              <img
                src={avatar?.url || "/images/default-avatar.jpg"}
                alt="Artist avatar"
                className="m-auto aspect-square h-full max-h-[35vh] w-auto rounded-full"
              />
            </div>
          </FadeInMotion>
          <FadeInMotion delay={0.6}>
            <p className="m-auto text-center text-[24px] font-semibold capitalize">
              {name}
            </p>
          </FadeInMotion>
          {(experience_year || artworks_count) && (
            <FadeInMotion delay={0.8}>
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
          
            delay={1}
            className="glow-[1] h-full"
          >
            <div className="craftmen-quote text-center text-[16px] font-light italic leading-[20px]">
              {parse(quote ?? "")}
            </div>
          </FadeInMotion>
        </div>
      )}
    </SectionFullScreen>
  );
};

export default AuthorSection;
