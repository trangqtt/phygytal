import clsx from "clsx";
import { TypoProps } from ".";

export default function Subtitle({
  children,
  className,
  theme = "light",
}: TypoProps) {
  return (
    <p
      className={clsx(
        !!className && className,
        "text-xl font-semibold md:text-2xl",
        theme === "light" ? "text-blue" : "text-primary"
      )}
    >
      {children}
    </p>
  );
}
