import { ReactElement } from "react";

interface Props {
  children: ReactElement | string;
  className?: string;
  [key: string]: any;
}

const ButtonCustom = ({ children, className, ...rest }: Props) => {
  return (
    <button
      className={`border border-secondary rounded-[50px] lg:py-2.5 lg:px-5 py-2 px-3 w-fit text-secondary ${className} lg:text-base text-sm`}
      {...rest}>
      {children}
    </button>
  );
};

export default ButtonCustom;
