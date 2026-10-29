import clsx from "clsx";
import DoubleArrowDownIcon from "../icons/DoubleArrowDownIcon";
import { FadeInMotionV2 } from "../FadeInMotion";
import { Section } from "../SectionFullScreen/SectionFullScreen";

export const ScrollGuide = ({
    isVisible,
    delay,
    title,
    className,
    target,
  }: {
    title: string;
    isVisible: boolean;
    delay: number;
    className?: string;
    target?: string;
  }) => {
    const handleClickMenu = () => {
      const container = document.getElementById("snap-container");
      let top;
      if (target) {
        const targetEle = document.getElementById(target || Section.Home)!;
        top = targetEle.offsetTop;
      } else {
        top = screen.height + container!.scrollTop;
      }
  
      if (container) {
        container.scrollTo({
          top,
          behavior: "smooth", // Add smooth scrolling effect
        });
      }
    };
    return (
      <div
        className={clsx(
          "absolute bottom-0 left-0 flex h-[100px] w-full cursor-pointer flex-col items-center justify-center gap-[10px] text-center",
          !!className && className
        )}
        onClick={handleClickMenu}
      >
        <FadeInMotionV2 isVisible={isVisible} delay={delay}>
          <p className="text-[10px] font-semibold uppercase text-[#bfbfbf]">
            {title}
          </p>
          <div className="m-auto animate-bounce">
            <DoubleArrowDownIcon width={30} height={30} />
          </div>
        </FadeInMotionV2>
      </div>
    );
  };