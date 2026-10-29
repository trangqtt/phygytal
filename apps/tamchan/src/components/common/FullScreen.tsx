import { ScrollDown } from "@/components/common/ScrollDown";

export function FullScreen({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="full-screen"
      className="relative h-[100svh] w-full lg:snap-both lg:snap-mandatory overflow-x-hidden">
      {children}
    </div>
  );
}

export function FullScreenSection({
  name,
  children,
  showScrollDown = false,
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
      // className={clsx(
      //   "relative m-auto h-[100svh] w-full snap-center snap-always  ",
      //   theme === "light" ? "bg-white" : "bg-blue",
      //   !!className && className
      // )}>
      className="relative m-auto lg:h-[100svh] w-full lg:snap-center lg:snap-always ">
      {children}
      {showScrollDown && <ScrollDown theme={theme} />}
    </section>
  );
}
