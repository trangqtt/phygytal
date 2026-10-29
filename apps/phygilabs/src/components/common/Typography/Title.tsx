import clsx from "clsx";
import { TypoProps } from ".";

export default function Title({
  children,
  className,
  theme = "light",
}: TypoProps) {
  return (
    <p
      className={clsx(
        !!className && className,
        "text-2xl font-bold uppercase md:text-4xl",
        theme === "light" ? "text-blue" : "text-primary"
      )}
    >
      {children}
    </p>
  );
}
