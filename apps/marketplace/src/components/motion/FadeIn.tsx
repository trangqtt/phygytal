import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@lib/utils";

export type FadeInProps = {
  children: ReactNode;
  key?: string;
  className?: string;
};

const FadeIn: FC<FadeInProps> = ({ children, key, className = "" }) => {
  return (
    <motion.div
      className={cn("w-full h-full", className)}
      key={key}
      initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
