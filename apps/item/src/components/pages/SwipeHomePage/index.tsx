import React, { FC } from "react";
import { FullScreen } from "@/hooks/useFullScreenContext";
import UI from "../UI";

export type SwipeHomePageProps = {
  stoneTags: string;
  digitalAssetDetail: any;
};

const SwipeHomePage: FC<SwipeHomePageProps> = (props) => {
  return (
    <FullScreen>
      <UI />
    </FullScreen>
  );
};

export default SwipeHomePage;
