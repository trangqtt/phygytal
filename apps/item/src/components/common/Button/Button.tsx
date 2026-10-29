import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  fluid?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?(): void;
  disable?: boolean;
}

export default function Button({
  type = "button",
  fluid = false,
  variant = "primary",
  children,
  className,
  disable,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disable}
      type={type}
      onClick={onClick}
      className={clsx(
        "text-center whitespace-nowrap rounded-[4px] border-[1px] border-solid border-[#DDDDDD] px-[24px] py-[15px] text-[14px] font-semibold leading-[18px]",
        fluid && "w-full",
        variant === "primary" && "bg-[#F0F0F0] text-[#1f1f1f]",
        variant === "secondary" && "bg-[#ffffff33] text-[#F0F0F0]",
        className && className
      )}
    >
      {children}
    </button>
  );
}
