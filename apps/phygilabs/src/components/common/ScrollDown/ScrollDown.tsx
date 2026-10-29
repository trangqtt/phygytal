import clsx from "clsx";
import ScrollDownIcon from "../icons/ScrollDownIcon";
import { useTranslation } from "next-i18next";

export const ScrollDown = ({ theme }: { theme?: string }) => {
  const { t } = useTranslation();
  return (
    <div className="absolute bottom-0 left-0 flex h-[40px] w-full cursor-pointer flex-col items-center justify-center gap-2 text-center md:h-[65px]">
      <p
        className={clsx(
          "hidden text-[10px] font-semibold uppercase md:block",
          theme === "black" ? "text-white" : "text-blue"
        )}
      >
        {t("general.explore")}
      </p>
      <div className="m-auto animate-bounce">
        <ScrollDownIcon width={30} height={30} theme={theme} />
      </div>
    </div>
  );
};
