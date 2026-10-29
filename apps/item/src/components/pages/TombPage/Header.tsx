import { motion } from "framer-motion";

export const TombHeader = () => {
  return (
    <div className="fixed z-50 flex h-[80px] w-full items-center">
        <div className="w-full h-full flex items-center justify-center bg-white max-w-[600px] m-auto">
          <img
            src="https://storage.googleapis.com/assets-fygito/item-website/black-nomion-logo.png"
            alt="nomion-logo"
            className="m-auto w-auto h-10 object-contain"
          />
        </div>
      </div>
  );
};
