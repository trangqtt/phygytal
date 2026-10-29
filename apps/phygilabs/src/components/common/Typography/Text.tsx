import clsx from "clsx";
import { TypoProps } from ".";

export default function Text({ children, className, theme = 'light' }: TypoProps) {
  return (
    <p
      className={clsx(
        !!className && className,
        "text-[18px]",
        theme === "light" ? "text-blue" : "text-white"
      )}
    >
      {children}
    </p>
  );
}
