import { FC } from "react";
import { motion } from "framer-motion";
import { CollectionType } from "../../models/collection";

export type CollectionCardProps = {
  background: string;
  title: string;
  onClick?: () => void;
  currentCollection: string;
  id: string;
};

const CollectionCard: FC<CollectionCardProps> = ({ background, title, onClick = () => {}, id, currentCollection }) => {
  return (
    <motion.div
      className="w-77.5 h-50 relative cursor-pointer rounded-xl"
      onClick={onClick}
      animate={{
        y: id === currentCollection ? -15 : 0,
        boxShadow: id === currentCollection ? '0px 0px 32px 0px rgba(255, 255, 255, 0.50)' : ''
      }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={background}
        alt="collection"
        className="w-full h-full rounded-xl"
      />
      <div className="absolute inset-0 w-full h-full bg-banner-overlay rounded-xl"></div>
      <div className="absolute bottom-0 w-full bg-transparent rounded-xl">
        <p className="p-4 font-semibold text-xl text-white capitalize">
          {title}
        </p>
      </div>
    </motion.div>
  );
};

export default CollectionCard;
