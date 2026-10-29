import {
  exploitationDigital,
  globalCustomer,
  identityAsset,
} from "@/assets/images";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";
import clsx from "clsx";

export const HowItWorkSection = () => {
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        "relative flex w-full flex-col gap-y-14 overflow-x-clip px-6 md:mt-28 lg:px-10",
      )}
    >
      <div className="md:absolute md:-top-[400px] md:right-[500px] md:h-[1440px] md:w-full md:rounded-full md:bg-gradient-blue"></div>
      <div className="md:absolute md:-top-[400px] md:left-[500px] md:h-[1440px] md:w-full md:rounded-full md:bg-gradient-blue"></div>
      <div className="z-10 flex h-full w-full flex-col gap-14 bg-[transparent]">
        <div className="flex flex-col items-center justify-center gap-3 md:px-[116px]">
          <p className="w-full text-center text-3xl font-semibold leading-[2.5rem] text-white md:text-4xl">
            {t("general.howToDigitalize")}
          </p>
          <p className="text-center text-lg md:w-[595px]">
            {parse(t("general.phygitalDescription"))}{" "}
            <span className="whitespace-nowrap text-white">
              {t("general.vietnameseBrands")}
            </span>
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row md:gap-10">
          <div className="flex w-2/5 flex-col items-center md:h-60 md:w-60 ">
            <img
              className="mb-2 w-full rounded-2xl md:rounded-4xl object-contain shadow-white-alpha backdrop-blur-1.5xl"
              src={identityAsset}
              alt="Identity asset"
            />
            <p className="w-[200px] text-center text-lg font-semibold leading-[1.5rem]">
              {t("general.phygital1")}
            </p>
          </div>
          <div className="flex w-2/5 flex-col items-center md:h-60 md:w-60">
            <img
              className="mb-2 w-full rounded-2xl md:rounded-4xl object-contain shadow-white-alpha backdrop-blur-1.5xl"
              src={exploitationDigital}
              alt="Exploitation digital"
            />
            <p className="w-[200px] text-center text-lg font-semibold leading-[1.5rem]">
              {t("general.phygital2")}
            </p>
          </div>
          <div className="flex w-2/5 flex-col items-center md:h-60 md:w-60">
            <img
              className="backdrop-blur-item mb-2 w-full rounded-2xl md:rounded-4xl object-contain shadow-white-alpha"
              src={globalCustomer}
              alt="Global customer"
            />
            <p className="w-[200px] text-center text-lg font-semibold leading-[1.5rem]">
              {t("general.phygital3")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
