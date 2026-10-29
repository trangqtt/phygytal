import PlayIcon from "@/components/common/icons/PlayIcon";
import { motion } from "framer-motion";
import { FC, useRef, useState } from "react";
import { Backdrop } from "@mui/material";
import { Media } from "@/models/general";
import { useTranslation } from "react-i18next";
import VideoRef from "@/components/common/Video/VideoRef";

export type IntroThumbnailProps = {
  onLoadEnd: () => void;
  video: Media;
};

const IntroThumbnail: FC<IntroThumbnailProps> = (props) => {
  const { onLoadEnd, video } = props;
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Backdrop
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
      open={true}
    >
      <motion.div
        className="relative m-auto flex h-[100svh] w-full max-w-[600px] flex-col items-center justify-center overflow-hidden px-[24px] py-[20px]"
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
        }}
      >
        {isPlay && (
          <div className="absolute bottom-[10px] z-20 flex w-full justify-end p-[12px]">
            <button
              className="h-[40px] w-[120px] gap-[8px] rounded-full border-[1px] border-[#595959] bg-[rgba(0,0,0,0.4)] text-center"
              onClick={onLoadEnd}
            >
              <p>{t("general.skip")}</p>
            </button>
          </div>
        )}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: isPlay ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="absolute h-full w-full"
        >
          <VideoRef videoUrl={video?.url} onLoadEnded={onLoadEnd} ref={videoRef} />
        </motion.div>
        {!!video?.thumbnail_url && !isPlay && (
          <img
            src={video.thumbnail_url}
            alt="Intro Thumbnail"
            className="h-full max-h-[700px] w-full object-cover"
          />
        )}
        {!isPlay && (
          <div className="cursor absolute flex h-full w-full items-center justify-center">
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="absolute inline-flex h-[55px] w-[55px] animate-ping rounded-full bg-white"></div>
              <div
                className="z-50 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-black"
                onClick={() => {
                  videoRef.current?.play();
                  setIsPlay(true);
                }}
              >
                <PlayIcon />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </Backdrop>
  );
};

export default IntroThumbnail;
