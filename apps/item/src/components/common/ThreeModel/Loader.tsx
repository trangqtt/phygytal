import React from "react";
import { Html, useProgress } from "@react-three/drei";
import * as Progress from '@radix-ui/react-progress';

export const ProgressLoader = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(90), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Progress.Root
        className="relative overflow-hidden bg-blackA9 rounded-full w-1/2 h-[5px] border"
        style={{
          // Fix overflow clipping in Safari
          // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
          transform: 'translateZ(0)',
        }}
        value={progress}
      >
        <Progress.Indicator
          className="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </>
  );
};


const Loader = () => {
  return (
    <Html className="flex h-full w-full items-center justify-center text-center">
      <span className="canvas-load"></span>
      <div className="w-full flex justify-center items-center">
        <ProgressLoader />
      </div>
    </Html>
  );
};

export default Loader;
