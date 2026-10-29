import clsx from "clsx";
import { TypoProps } from ".";

export default function Subtext({ children, className, theme = 'light' }: TypoProps) {
  return (
    <p
      className={clsx(
        !!className && className,
        "text-md text-blue font-thin",
        theme === "light" ? "text-blue" : "text-white"
      )}
    >
      {children}
    </p>
  );
}
