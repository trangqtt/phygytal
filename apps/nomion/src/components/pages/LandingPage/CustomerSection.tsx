import { danangLogo, hotieuLogo, lejLogo, orthoLogo } from "@/assets/images";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

export const CustomerSection = () => {
  const { t } = useTranslation();
  return (
    <div className={clsx(
      "relative flex flex-col gap-2 md:gap-10 w-full h-full overflow-x-clip",
    )}>
      <div className="w-full h-full z-10 bg-[transparent]">
        <p className="w-full text-center text-3xl md:text-4xl font-semibold leading-[2.5rem]">
          {t("general.partner")}
        </p>
        <div className="flex flex-row flex-wrap items-center justify-center md:gap-10">
          <div className="flex w-1/2 items-center px-7 py-12 md:px-4 md:py-6 md:w-[192px]">
            <img
              className="w-full object-scale-down"
              src={orthoLogo}
              alt="Ortho"
            />
          </div>
          <div className="flex w-1/2 items-center px-7 py-12 md:px-4 md:py-6 md:w-[150px]">
            <img className="w-full object-scale-down" src={lejLogo} alt="Lej" />
          </div>
          <div className="flex w-1/2 items-center px-7 py-12 md:px-4 md:py-6 md:w-[192px]">
            <img
              className="w-full object-scale-down"
              src={danangLogo}
              alt="Da Nang"
            />
          </div>
          <div className="flex w-1/2 items-center px-7 py-12 md:px-4 md:py-6 md:w-[192px]">
            <img
              className="w-full object-scale-down"
              src={hotieuLogo}
              alt="Ho Tieu"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
