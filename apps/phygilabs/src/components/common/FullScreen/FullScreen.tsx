import clsx from "clsx";
import { ScrollDown } from "../ScrollDown/ScrollDown";

export function FullScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[100svh] w-full snap-both snap-mandatory overflow-x-hidden">
      {children}
    </div>
  );
}

export function FullScreenSection({
  name,
  children,
  showScrollDown = true,
  theme = "light",
  className,
}: {
  name?: string;
  children?: React.ReactNode;
  showScrollDown?: boolean;
  theme?: string;
  className?: string;
}) {
  return (
    <section
      id={name}
      className={clsx(
        "relative m-auto h-[100svh] w-full snap-center snap-always pt-[64px] md:pt-[80px]",
        theme === "light" ? "bg-white" : "bg-blue",
        !!className && className
      )}
    >
      {/* {theme === "light" && (
        <div className="absolute top-0 z-10 h-[100svh] w-[100vw]">
          <img
            src="https://assets.nomion.io/phygilab-website/linear-bg-trans.png"
            className="hidden h-full w-full object-fill md:block"
            alt="phygilabs"
          />

          <img
            src="https://assets.nomion.io/phygilab-website/linear-bg-mobile.png"
            className="h-full w-full object-fill md:hidden"
            alt="phygilabs"
          />
        </div>
      )} */}
      {children}
      {showScrollDown && <ScrollDown theme={theme} />}
    </section>
  );
}
