import React from "react";
import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html className="flex h-full w-full items-center justify-center">
      <span className="canvas-load"></span>
      <p className="text-[14px] font-bold text-[#f1f1f1]">
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default Loader;
