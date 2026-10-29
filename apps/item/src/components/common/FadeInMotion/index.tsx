import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export const FadeInMotion: FC<{
    isVisible?: boolean;
    delay: number;
    duration?: number;
    children: ReactNode;
    className?: string;
  }> = (props) => {
    const {
      duration = 0.5,
      delay = 0.5,
      children,
      className,
    } = props;
    return (
      <motion.div
        className={clsx(
          "flex w-full flex-col gap-[16px]",
          !!className && className
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    );
  };
  
  export const FadeInMotionV2: FC<{
    isVisible: boolean;
    delay: number;
    duration?: number;
    children: ReactNode;
  }> = (props) => {
    const { duration = 0.5, delay = 0.5, isVisible = true, children } = props;
    if (!isVisible) return <></>;
    return (
      <motion.div
        className={clsx(
          "flex w-full flex-col gap-[16px]",
          isVisible && "visible",
          !isVisible && "invisible"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    );
  };