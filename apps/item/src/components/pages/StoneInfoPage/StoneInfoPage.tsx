import Loader from "@/components/common/Loader";
import { useProductStory } from "@/hooks/useProductStory";
import Image from "next/image";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export type StoneDetailType = {
  title: string;
  value: string;
};

const StoneInfoPage: FC = () => {
  const {
    isLoading,
    productDetail,
  } = useProductStory();
  const { t, i18n } = useTranslation();
  const stoneInfo = productDetail?.attribute?.stone;

  const renderTranslation = () => {
    const stoneTranslation = stoneInfo?.translation;
    if (!stoneTranslation) return;
    if (i18n.language === "vi") return stoneTranslation?.vi;
    return stoneTranslation?.en
  };

  const translation = renderTranslation();

  const stoneDetailBoardValue: StoneDetailType[] = [
    {
      title: t("general.origin"),
      value: stoneInfo?.origin,
    },
    {
      title: t("general.clarity"),
      value: translation?.clarity,
    },
    {
      title: t("general.color"),
      value: translation?.color,
    },
    {
      title: t("general.rarity"),
      value: translation?.rarity,
    },
    {
      title: t("general.characteristic"),
      value: translation?.properties,
    },
  ];

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="flex flex-col items-center gap-[12px] pt-[92px]">
          <div className="px-[20px] py-[8xp] text-center uppercase">{t("general.aboutStone")}</div>
          <div className="flex flex-col items-center gap-[24px]">
            <div className="flex justify-center px-[24px]">
              <img
                src={stoneInfo?.image?.url ?? ""}
                alt={`Picture about ${stoneInfo?.translation?.vi?.name}`}
                width={342}
                height={256}
                className="rounded-[12px]"
              />
            </div>
            <div className=" flex flex-col items-center gap-[20px]">
              <p className="text-center font-bold">{translation?.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 px-[24px]">
              {stoneDetailBoardValue.map((stone, index) => {
                const isLastRowAndOdd =
                  index === stoneDetailBoardValue.length - 1 && index % 2 === 0;

                const gridItemClasses = `flex flex-col gap-[4px] ${
                  isLastRowAndOdd ? "col-span-2" : ""
                } ${index % 2 !== 0 ? "items-end" : "items-start"}`;

                return (
                  <div key={index} className={gridItemClasses}>
                    <p className="text-14 text-start font-normal text-lightgrey">
                      {stone.title}
                    </p>
                    <p className="text-14 text-start font-semibold">
                      {stone.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StoneInfoPage;
