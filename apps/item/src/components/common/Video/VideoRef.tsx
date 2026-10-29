import { RefObject, forwardRef } from "react";

export type VideoRefProps = {
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
  videoRef?: RefObject<HTMLVideoElement>;
};

const VideoRef = forwardRef<HTMLVideoElement, VideoRefProps>((props, ref) => {
  const {
    autoPlay = false,
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
      ref={ref}
    >
      <source src={videoUrl} className="w-full"></source>
    </video>
  );
})

VideoRef.displayName = "VideoRef"

export default VideoRef;
