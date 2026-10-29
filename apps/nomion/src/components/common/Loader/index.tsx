import { FC } from "react";

const LoadersBoucing: FC = () => {
  return (
    <div className="flex w-fit gap-[20px]">
      <div className="loader w-[20px] h-[20px] rounded-full bg-[#8d8d8d]"></div>
      <div className="loader w-[20px] h-[20px] rounded-full bg-[#8d8d8d]"></div>
      <div className="loader w-[20px] h-[20px] rounded-full bg-[#8d8d8d]"></div>
    </div>
  );
};

const Loader: FC = () => {
  return (
    <div className="w-full max-h-screen h-screen flex justify-center items-center">
      <LoadersBoucing />
    </div>
  )
}

export default Loader
