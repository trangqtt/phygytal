import Button from "@/components/common/Button/Button";
import { selectUserUId } from "@/redux/userSlice";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TutorialDetail, { Instruction } from "./TutorialDetail";
import Loader from "@/components/common/Loader";
import SectionTitle from "../StoryPage/sections/SectionTitle";
import Link from "next/link";
import { useProductStory } from "@/hooks/useProductStory";

export default function Index() {
  const { t } = useTranslation();
  const userUID = useSelector(selectUserUId);
  const {
    ownerInfo,
    isLoading,
    pageAttributes: {
      tutorial: { instructions, buyUrl },
    },
  } = useProductStory();
  const [selectedInstruction, setSelectedInstruction] =
    useState<Instruction | null>(null);

  const isOwnProduct = ownerInfo?.owner_id === userUID;

  const router = useRouter();
  const { asPath, query } = router;
  const onClickTutorial = (instruction: Instruction) => {
    setSelectedInstruction(instruction);
    router.push(`${asPath}?select=${instruction.id}`, undefined, {
      shallow: true,
    });
  };

  const renderInstructions = () => {
    return (
      <>
        {instructions?.map((item: Instruction, index: number) => (
          <div className="h-[240px] w-[294px]" key={index}>
            <div className="flex justify-center">
              <div
                className="relative h-[240px] w-[294px] cursor-pointer"
                onClick={() => onClickTutorial(item)}
              >
                <div className="margin-auto absolute flex h-full w-full items-center justify-center text-white no-underline">
                  <p className="relative z-[1]">{item?.name}</p>
                </div>
                <img
                  src={item?.coverUrl}
                  alt={"Tutorial cover"}
                  className="rounded-md brightness-50 w-full h-full"
                />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  useEffect(() => {
    if (!query?.select) {
      setSelectedInstruction(null);
    } else if (instructions) {
      const selected = (instructions as Instruction[]).find(
        (item: Instruction) => item.id === query?.select
      );

      if (selected) {
        setSelectedInstruction(selected);
      }
    }
  }, [query, instructions]);

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && !query?.select && (
        <div className="flex h-[100%] max-h-full flex-col items-center gap-[30px] pb-[20px] pt-[80px]">
          <SectionTitle title={t("next.instruction")} />
          <div className="flex h-fit w-full flex-col items-center gap-[16px]">
            {renderInstructions()}
          </div>
          {!isOwnProduct && (
            <Link
              href={buyUrl || ""}
              target="_blank"
              className="w-full px-[24px]"
            >
              <Button className="w-full">{t("general.buyToReveal")}</Button>
            </Link>
          )}
        </div>
      )}
      {selectedInstruction && (
        <TutorialDetail instruction={selectedInstruction} />
      )}
    </div>
  );
}
