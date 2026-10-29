import clsx from "clsx";
import { FC, HTMLAttributes, ReactElement } from "react";

export type VideoProps = {
  videoUrl: string;
  thumbnailUrl?: string;
  objectFit?: "contain" | "cover" | "fill";
  width?: string;
  height?: string;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  autoPlay?: boolean;
  onLoadEnded?(): void;
};

const Video: FC<VideoProps> = (props): ReactElement => {
  const {
    autoPlay = true,
    videoUrl,
    thumbnailUrl,
    objectFit = "contain",
    width = "100%",
    height = "100%",
    loop = false,
    controls = false,
    muted = false,
    onLoadEnded = () => {},
  } = props;

  return (
    <video
      autoPlay={autoPlay}
      loop={loop}
      playsInline
      muted={muted}
      controls={controls}
      poster={thumbnailUrl}
      onEnded={onLoadEnded}
      style={{
        width,
        height,
        objectFit,
      }}
    >
      <source src={videoUrl} className="w-full"></source>
    </video>
  );
};

export default Video;
