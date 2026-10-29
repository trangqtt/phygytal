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
        "px-[24px] py-[15px] text-[14px] font-semibold leading-[18px] whitespace-nowrap",
        fluid && "w-full",
        variant === "primary" && "bg-[#F0F0F0] text-[#1f1f1f]",
        variant === "secondary" && "bg-[transparent] border border-[#454545] rounded-full text-[#F0F0F0]",
        className && className
      )}
    >
      {children}
    </button>
  );
}
