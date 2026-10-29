import clsx from "clsx";

interface LinearBackgroundProps {
  alpha?: number;
  className?: string;
}

export default function LinearBackground({
  alpha = 0.7,
  className,
}: LinearBackgroundProps) {
  return (
    <div
      className={clsx(
        "absolute left-0 top-0 z-[1] h-full w-full",
        !!className && className
      )}
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, ${alpha}), rgba(0, 0, 0, ${alpha}))`,
      }}
    ></div>
  );
}
