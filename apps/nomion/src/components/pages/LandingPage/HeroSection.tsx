import { earthRotate, fingerPrint } from "@/assets/images";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { NomionSingle } from "@/components/common/icons";

export const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <div className="black-one m-auto">
      <div
        className={clsx(
          "relative flex h-screen w-full flex-col items-center justify-center bg-cover bg-center"
        )}
      >
        <div className="md:absolute md:-top-[650px] md:h-[1440px] md:w-full md:rounded-full md:bg-gradient-blue"></div>
        <div className="absolute inset-0 -top-[120px] w-full bg-gradient-blue-mobile blur-[150px] md:hidden"></div>

        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={earthRotate} type="video/mp4" />
        </video>
        <div className="top-50 left-50 absolute z-10 flex flex-col items-center">
          <div className="mb-[16px] flex flex-col items-center justify-center md:flex-row">
            <p className="text-6xl font-bold leading-[4rem] md:text-8xl md:leading-[5rem] ">
              {t("general.phygitalTitle1")}
            </p>
            <div className="mx-[16px] hidden items-center justify-center md:flex md:h-[72px] md:w-[72px]">
              <NomionSingle className="h-full w-full" />
            </div>
            <p className="text-6xl font-bold leading-[4rem] md:text-8xl md:leading-[5rem]">
              {t("general.phygitalTitle2")}
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold leading-[1.875rem] text-[#BFBFBF] md:text-4xl">
              {t("general.phygitalDescription1")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
