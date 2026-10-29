import { FC } from "react";
import LoadingChif from "../../../assets/images/loader-nfc.png";
import { Backdrop } from "@mui/material";
import clsx from "clsx";

export type LoaderProps = {
  progress?: number;
};

const NFCLoader: FC<LoaderProps> = (props) => {
  const { progress = 0 } = props;
  return (
    <Backdrop open>
      <div className="flex h-screen max-h-screen w-full max-w-[600px] m-auto flex-col items-center justify-center gap-[20px]">
        <div className="progress-bar">
          <div className="circle border-spin"></div>
        </div>
        <div
          className={clsx(
            "relative flex h-[138px] w-[138px] items-center justify-center overflow-hidden rounded-full"
          )}
        >
          <div className="z-10 flex h-[132px] w-[132px] items-center justify-center rounded-full bg-black">
            <img
              className="h-[100px] w-[100px] rounded-full"
              src={LoadingChif.src}
              alt={""}
            />
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default NFCLoader;
