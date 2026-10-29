import clsx from "clsx";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  className?: string;
}

export default function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-center">
        <h6
          className={clsx(
            "mb-[12px] border-b-[1px] border-solid border-white text-center text-[18px] font-semibold uppercase leading-[24px]",
            !!className && className
          )}
        >
          {title}
        </h6>
      </div>
    </motion.div>
  );
}
