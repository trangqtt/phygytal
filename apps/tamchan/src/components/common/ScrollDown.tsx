// import clsx from "clsx";

import ScrollDownIcon from "@/components/common/icons/ScrollDownIcon";

export const ScrollDown = ({ theme }: { theme?: string }) => {
  return (
    <div className="absolute bottom-0 left-0 flex h-[40px] w-full cursor-pointer flex-col items-center justify-center gap-2 text-center md:h-[65px]">
      <p
        // className={clsx(
        //   "hidden text-[10px] font-semibold uppercase md:block",
        //   theme === "black" ? "text-white" : "text-blue"
        // )}>
        className={"hidden text-[10px] font-semibold uppercase md:block"}>
        {/*{t("general.explore")}*/}
        {/*Scroll Down*/}
      </p>
      <div className="flex flex-col align-center m-auto animate-bounce lg:text-base text-sm text-[#B7B7B7]">
        Tìm hiểu thêm
        <div className="mx-auto lg:text-base text-sm">
          <ScrollDownIcon />
        </div>
      </div>
    </div>
  );
};
