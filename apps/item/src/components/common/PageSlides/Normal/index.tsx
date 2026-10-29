import { FadeInMotion } from "@/components/common/FadeInMotion";
import { FC, ReactNode } from "react";
import { Section } from "../../SectionFullScreen/SectionFullScreen";

export type NormalSlideProps = {
  section?: Section | string;
  background?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
};

const NormalSlide: FC<NormalSlideProps> = ({ children, background, className = "", delay = 0.2}) => {
  return (
    <FadeInMotion delay={delay} duration={1}>
      <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden">
        {background && <img src={background} alt="Background" className="w-full h-full object-cover" fetchPriority="high" />}
        <div className={className}>
          {children}
        </div>
      </div>
    </FadeInMotion>
  );
};

export default NormalSlide;
