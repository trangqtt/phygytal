import Image from "next/image";
import React, { ReactElement } from "react";
import GrindSize from "@/components/common/icons/GrindSize";
import WeightIcon from "@/components/common/icons/Weight";
import WaterIcon from "@/components/common/icons/WaterIcon";
import WaterDropIcon from "@/components/common/icons/WaterDropIcon";
import ClockIcon from "@/components/common/icons/ClockIcon";
// import RecipeInformationBoard from "@/components/common/RecipeInformationBoard";
import { useTranslation } from "next-i18next";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TemperatureIcon from "@/components/common/icons/TemperatureIcon";
import YieldIcon from "@/components/common/icons/YieldIcon";
import Video from "@/components/common/Video";

type Formula = {
  coffeeYield: string;
  dosing: string;
  grindSize: string;
  id: string;
  maxPressure: string;
  water: string;
  waterHardLevel: string;
  weight: string;
  temperature: string;
}

type ExtractionStage = {
  id: string;
  stageTitle: string;
  stageDescription: string;
}

export type Instruction = {
  coverUrl: string;
  id: string;
  name: string;
  videoUrl: string;
  recommenedFormula: Formula[];
  extractionStages: ExtractionStage[];
}

type InstructionItem = {
  icon: ReactElement;
  title: string;
  value: string;
}

const InstructionCard = ({ item }: {
  item: InstructionItem
}) => {
  return (
    <>
      <div className="flex items-center justify-start gap-[10px] w-[40%]">
        <div className="w-fit h-fit">
          {item.icon}
        </div>
        <div className="flex flex-col items-start gap-[2px]">
          <p className="text-left text-[12px] font-light leading-[22px] whitespace-nowrap">
            {item.title}
          </p>
          <p className="text-left text-[14px] font-semibold whitespace-nowrap">
            {item.value}
          </p>
        </div>
      </div>
    </>
  );
}

export default function Tutorial({
  instruction,
}: {
  instruction: Instruction;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex h-[100%] max-h-full flex-col items-center gap-[20px] pb-[20px] pt-[80px]">
      <div className="border-b-[1px] border-solid border-white pb-[6px] text-[20px] font-semibold">
        {instruction.name.toUpperCase()}
      </div>
      {instruction.videoUrl ? (
        <div className="mx-[24px] h-fit gap-[16px] border-b-[1px] border-solid border-darkgrey pb-[25px]">
          <div className="text-center text-[16px] font-semibold">
            {t("page.instruction.video")}
          </div>
          <Video
          controls
            height="500px"
            videoUrl={instruction.videoUrl}
            thumbnailUrl={instruction.coverUrl}
            loop
          />
        </div>
      ) : (
        instruction.coverUrl && (
          <div className="mx-[24px] h-[214px] w-full gap-[16px] border-b-[1px] border-solid border-darkgrey px-[24px] pb-[25px]">
            <div className="relative h-full w-full">
              <img src={instruction.coverUrl} alt="Cover url" className="w-full h-full" />
            </div>
          </div>
        )
      )}
      <div className="flex w-full flex-col items-center gap-[29px] px-[22px]">
        <div className="text-[16px] font-semibold">
          {t("page.instruction.recommend")}
        </div>
        <div className=" grid w-full grid-cols-2 items-center justify-between gap-[16px] rounded-[4px] border border-solid border-lesslightgrey p-[20px] text-center">
          {instruction.recommenedFormula.map((item: Formula) => (
            <>
              {item.temperature && (
                <InstructionCard
                  item={{
                    icon: <TemperatureIcon />,
                    title: t("page.instruction.temperature"),
                    value: item.temperature,
                  }}
                />
              )}
              {item.water && (
                <InstructionCard
                  item={{
                    icon: <WaterIcon />,
                    title: t("page.instruction.waterVolume"),
                    value: item.water,
                  }}
                />
              )}
              {item.waterHardLevel && (
                <InstructionCard
                  item={{
                    icon: <WaterDropIcon />,
                    title: t("page.instruction.waterHardness"),
                    value: item.waterHardLevel,
                  }}
                />
              )}
              {item.grindSize && (
                <InstructionCard
                  item={{
                    icon: <GrindSize />,
                    title: t("page.instruction.coffeeGrind"),
                    value: item.grindSize,
                  }}
                />
              )}
              {item.weight && (
                <InstructionCard
                  item={{
                    icon: <WeightIcon />,
                    title: t("page.instruction.dosing"),
                    value: item.weight,
                  }}
                />
              )}
              {item.dosing && (
                <InstructionCard
                  item={{
                    icon: <WeightIcon />,
                    title: t("page.instruction.dosing"),
                    value: item.dosing,
                  }}
                />
              )}
              {item.maxPressure && (
                <InstructionCard
                  item={{
                    icon: <ClockIcon />,
                    title: t("page.instruction.maxPressure"),
                    value: item.dosing,
                  }}
                />
              )}
              {item.coffeeYield && (
                <InstructionCard
                  item={{
                    icon: <YieldIcon />,
                    title: t("page.instruction.coffeeYield"),
                    value: item.coffeeYield,
                  }}
                />
              )}
            </>
          ))}
        </div>
        {instruction.extractionStages.length > 0 && (
          <>
            <div className="w-[342px] border-b-[1px] border-solid border-darkgrey px-[24px]"></div>
            <div className="flex w-[342px] flex-col items-center justify-center gap-[16px] rounded-[4px] border border-solid border-lesslightgrey py-[16px] text-center">
              <p className="text-[14px] font-semibold leading-[22px]">
                {t("page.instruction.extractionPhases")}
              </p>
              <div className="w-[90%] border border-lesslightgrey px-[24px]"></div>
              <Timeline>
                {instruction.extractionStages.map(
                  (item: ExtractionStage, index: number) => (
                    <TimelineItem key={item.id}>
                      <TimelineOppositeContent>
                        {item.stageTitle}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                        {index !== instruction.extractionStages.length - 1 && (
                          <TimelineConnector />
                        )}
                      </TimelineSeparator>
                      <TimelineContent sx={{ paddingTop: 0 }}>
                        <div className="w-[40vw] flex-1 flex-grow break-words rounded bg-semiblack px-[16px] py-[8px] text-[14px] font-light">
                          {item.stageDescription}
                        </div>
                      </TimelineContent>
                    </TimelineItem>
                  )
                )}
              </Timeline>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
