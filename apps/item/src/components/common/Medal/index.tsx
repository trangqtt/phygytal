import { FC } from "react";
import SecondMedalIcon from "../icons/SecondMedalIcon";
import WinnerMedalIcon from "../icons/WinnerMedalIcon";
import ThirdMedalIcon from "../icons/ThirdMedalIcon";
import FourthMedalIcon from "../icons/FourthMedalIcon";
import { useTranslation } from "react-i18next";

export enum MedalType {
  None = "none",
  Winner = "winner",
  Second = "second",
  Third = "third",
  Fourth = "fourth",
}

export type MedalProps = {
  type: MedalType;
};

const Medal: FC<MedalProps> = (props) => {
  const { type } = props;
  const { t } = useTranslation();

  const renderMedal = () => {
    switch (type) {
      case MedalType.Winner:
        return (
          <>
            <div className="winner m-auto h-full w-fit rounded-full p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-black px-[12px] py-[2px]">
                <WinnerMedalIcon />
                <p className="text-[12px] font-semibold">
                  {t("general.winnerPrize")} {`"Đá Non Nước 2023"`}
                </p>
              </div>
            </div>
          </>
        );
      case MedalType.Second:
        return (
          <>
            <div className="second m-auto h-full w-fit rounded-full p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-black px-[12px] py-[2px]">
                <SecondMedalIcon />
                <p className="text-[12px] font-semibold">
                  {t("general.secondPrize")} {`"Đá Non Nước 2023"`}
                </p>
              </div>
            </div>
          </>
        );
      case MedalType.Third:
        return (
          <>
            <div className="third m-auto h-full w-fit rounded-full p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-black px-[12px] py-[2px]">
                <ThirdMedalIcon />
                <p className="text-[12px] font-semibold">
                  {t("general.thirdPrize")} {`"Đá Non Nước 2023"`}
                </p>
              </div>
            </div>
          </>
        );
      case MedalType.Fourth:
        return (
          <>
            <div className="fourth m-auto h-full w-fit rounded-full p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-black px-[12px] py-[2px]">
                <FourthMedalIcon />
                <p className="text-[12px] font-semibold">
                  {t("general.consolationPrize")} {`"Đá Non Nước 2023"`}
                </p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="absolute left-0 top-0 h-[40px] w-full p-[2px]">
      {renderMedal()}
    </div>
  );
};

export default Medal;
