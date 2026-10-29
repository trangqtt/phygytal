import clsx from "clsx";
import { TypoProps } from ".";

export default function Quote({
  children,
  className,
  theme = "light",
}: TypoProps) {
  return (
    <p
      className={clsx(
        !!className && className,
        "text-2xl font-bold italic",
        theme === "light" ? "text-blue" : "text-white"
      )}
    >
      <span className="text-3xl mr-1">&quot;</span>
      {children}
      <span className="text-3xl ml-1">&quot;</span>
    </p>
  );
}
