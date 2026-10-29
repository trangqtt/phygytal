import { FunctionComponent } from "react";
import TemperatureIcon from "../icons/TemperatureIcon";
import ClockIcon from "../icons/ClockIcon";
import WeightIcon from "../icons/Weight";
import YieldIcon from "../icons/YieldIcon";
import PressureClockIcon from "../icons/PressureClockIcon";
import WaterDropIcon from "../icons/WaterDropIcon";
import { useTranslation } from "next-i18next";

type recipeInformationType = {
  temperature: string;
  exportTime: string;
  dosing: string;
  yield: string;
  maximumPressure: string;
  waterHardness: string;
};

interface RecipeInformationBoardProps {
  recipeInformation: recipeInformationType;
}

const RecipeInformationBoard: FunctionComponent<
  RecipeInformationBoardProps
> = ({ recipeInformation }: RecipeInformationBoardProps) => {
  const { t } = useTranslation();

  return (
    <div className="gap-16px flex flex-col rounded border-[1px] border-solid border-lesslightgrey p-[16px]">
      <div className="1 flex w-full border-b-[1px] border-solid border-lesslightgrey py-[16px]">
        <div className="temperature-box flex w-[50%] items-center gap-[12px]">
          <div>
            <TemperatureIcon />
          </div>
          <div className="flex  flex-col gap-[4px]">
            <div className="text-[14px] font-light text-neutral">{t("page.instruction.temperature")}</div>
            <div className="text-[16px] font-semibold text-white">
              {recipeInformation.temperature}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className=" w-[32px] rotate-90 border-t-[1px] border-solid border-lesslightgrey"></div>
        </div>
        <div className="exportTime-box flex w-[50%] items-center gap-[12px]">
          <div>
            <ClockIcon />
          </div>
          <div className="flex  flex-col gap-[4px]">
            <div className="text-[14px] font-light text-neutral">
              {t("page.instruction.brewingTime")}
            </div>
            <div className="text-[16px] font-semibold text-white">
              {recipeInformation.exportTime}
            </div>
          </div>
        </div>
      </div>
      <div className="2 flex w-full border-b-[1px] border-solid border-lesslightgrey py-[16px]">
        <div className="dosing-box flex w-[50%] items-center gap-[12px]">
          <div>
            <WeightIcon />
          </div>
          <div className="flex  flex-col gap-[4px]">
            <div className="text-[14px] font-light text-neutral">
              {t("page.instruction.dosing")}
            </div>
            <div className="text-[16px] font-semibold text-white">
              {recipeInformation.dosing}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className=" w-[32px] rotate-90 border-t-[1px] border-solid border-lesslightgrey"></div>
        </div>
        <div className="yield-box flex w-[50%] items-center gap-[12px]">
          <div>
            <YieldIcon />
          </div>
          <div className="flex  flex-col gap-[4px]">
            <div className="text-[14px] font-light text-neutral">
              {t("page.instruction.coffeeYield")}
            </div>
            <div className="text-[16px] font-semibold text-white">
              {recipeInformation.yield}
            </div>
          </div>
        </div>
      </div>
      <div className="3 flex w-full pt-[16px]">
        <div className="maximumPressure-box flex w-[50%] items-center gap-[12px]">
          <div>
            <PressureClockIcon />
          </div>
          <div className="flex  flex-col gap-[4px]">
            <div className="text-[14px] font-light text-neutral">
              {t("page.instruction.maxPressure")}
            </div>
            <div className="text-[16px] font-semibold text-white">
              {recipeInformation.maximumPressure}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className=" w-[32px] rotate-90 border-t-[1px] border-solid border-lesslightgrey"></div>
        </div>
        <div className="waterHardness-box flex w-[50%] items-center gap-[12px]">
          <div>
            <WaterDropIcon />
          </div>
          <div className="flex  flex-col gap-[4px]">
            <div className="text-[14px] font-light text-neutral">
              {t("page.instruction.waterHardness")}
            </div>
            <div className="text-[16px] font-semibold text-white">
              {recipeInformation.waterHardness}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeInformationBoard;
