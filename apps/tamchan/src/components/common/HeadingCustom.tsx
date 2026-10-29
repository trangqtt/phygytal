import { ReactElement } from "react";

interface Props {
  children: ReactElement | string;
  center?: boolean;
  className?: string;
  [key: string]: any;
}
const HeadingCustom = ({ children, className, center, ...rest }: Props) => {
  return (
    <h2
      // TODO: refactor the multiple className to clsx
      className={`uppercase text-primary lg:text-7xl font-lost-type ${
        center && "text-center"
      } ${className}`}
      {...rest}>
      {children}
    </h2>
  );
};

export default HeadingCustom;
