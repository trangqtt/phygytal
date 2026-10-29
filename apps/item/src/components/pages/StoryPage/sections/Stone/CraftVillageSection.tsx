import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import { Dialog } from "@mui/material";
import { CloseIcon } from "@/components/common/icons";
import {
  CultureItem,
  CultureTab,
  HistoryItem,
  HistoryTab,
  LocationTab,
  VillageInfoTabs,
} from "./VillageTab";
import { FadeInMotion } from "@/components/common/FadeInMotion";
import { Section } from "@/components/common/SectionFullScreen/SectionFullScreen";
import { useFullScreenContext } from "@/hooks/useFullScreenContext";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { useProductStory } from "@/hooks/useProductStory";

var xDown: any = null;
var yDown: any = null;

function getTouches(evt: any) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "#000",
  },
}));

export type CraftVillageSectionProps = {
  locationVideoUrl: string;
  villageName: string;
  location: string;
  histories: HistoryItem[];
  cultures: CultureItem[];
};

interface TabSelectProps {
  imageUrl?: string;
  title: string;
  className?: string;
  isInViewport?: boolean;
  delay: number;
  onSelect(): any;
}

function TabSelect({
  imageUrl,
  title,
  className,
  isInViewport = false,
  delay,
  onSelect,
}: TabSelectProps) {
  return (
    <div
      className={clsx(
        "relative mb-[24px] h-[30%] w-full",
        !!className && className
      )}
      onClick={onSelect}
    >
      <FadeInMotion
        isVisible={isInViewport}
        delay={delay}
        className="relative h-full rounded-[12px] bg-[grey]"
      >
        <div className={clsx("relative h-full  rounded-[12px]")}>
          {imageUrl && (
            <>
              <img
                className="z-0 h-full w-full rounded-[12px] object-cover"
                src={imageUrl}
                alt={title}
              />
              <div className="absolute left-0 top-0 z-0 h-full w-full bg-[#00000066]" />
            </>
          )}
        </div>
        <p className="absolute z-[1] flex h-full w-full items-center justify-center text-center">
          {title}
        </p>
      </FadeInMotion>
    </div>
  );
}

const CraftVillageSection: FC<CraftVillageSectionProps> = (props) => {
  const { t } = useTranslation();
  const { locationVideoUrl, location, villageName, histories, cultures } =
    props;
  const { isHuePage } = useProductStory();
  const { isInViewport } = useFullScreenContext(Section.CraftVillage);

  const [currentTab, setCurrentTab] = useState<null | VillageInfoTabs>(null);

  const onSelectTab = (tab: VillageInfoTabs) => {
    setCurrentTab(tab);
  };

  function handleTouchStart(evt: any) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt: any) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* right swipe */
      } else {
        /* left swipe */
      }
    } else {
      console.log("yDiff", yDiff);
      if (yDiff > 10) {
        /* down swipe */
        setCurrentTab(null);
      } else if (yDiff < -10) {
        console.log("up swipe", yDiff);
        /* up swipe */
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }

  const handleCloseModal = () => {
    setCurrentTab(null);
  };

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-[24px] overflow-x-hidden px-[16px] pt-[90px]">
      <div className="flex w-full items-center justify-center text-center">
        <p className="text-[16px] font-bold uppercase">{villageName}</p>
      </div>

      <div className="tab-list relative flex w-full flex-grow-[1] flex-col pb-[20px]">
        <TabSelect
          title={t("general.geographicalLocation") as string}
          onSelect={() => onSelectTab(VillageInfoTabs.LOCATION)}
          isInViewport={isInViewport}
          delay={0.2}
          imageUrl="/images/vitridialy.png"
        />
        <TabSelect
          title={t("general.historyBegin") as string}
          onSelect={() => onSelectTab(VillageInfoTabs.HISTORY)}
          isInViewport={isInViewport}
          delay={0.6}
          imageUrl="/images/history.png"
        />
        <TabSelect
          title={
            isHuePage
              ? "Điểm nổi bật"
              : (t("general.culturalInterference") as string)
          }
          onSelect={() => onSelectTab(VillageInfoTabs.CULTURE)}
          isInViewport={isInViewport}
          delay={1}
          imageUrl="/images/culture.png"
        />
      </div>

      <CustomDialog
        fullScreen
        open={currentTab !== null}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
      >
        <button
          className="absolute right-2 top-2 z-[9999] cursor-pointer"
          onClick={handleCloseModal}
        >
          <CloseIcon />
        </button>

        {currentTab === VillageInfoTabs.LOCATION && (
          <LocationTab description={location} mediaUrl={locationVideoUrl} />
        )}

        {currentTab === VillageInfoTabs.HISTORY && (
          <HistoryTab histories={histories} />
        )}

        {currentTab === VillageInfoTabs.CULTURE && (
          <CultureTab cultures={cultures} />
        )}
      </CustomDialog>
    </div>
  );
};

export default CraftVillageSection;
