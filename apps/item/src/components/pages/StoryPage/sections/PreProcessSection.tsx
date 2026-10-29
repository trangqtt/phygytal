import React from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import NextPage from "@/components/NextPage";
import { useCurrentBaseUrl } from "@/hooks/useCurrentBaseUrl";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import parse from "html-react-parser";

export default function PreProcessSection({
  preProcessingImageUrl,
  preProcessingAcidity,
  preProcessingSweet,
  preProcessingBitter,
  preProcessingDescription,
  preProcessingName,
}: {
  preProcessingImageUrl: string;
  preProcessingAcidity: string;
  preProcessingSweet: string;
  preProcessingBitter: string;
  preProcessingDescription: string;
  preProcessingName: string;
}) {
  const baseUrl = useCurrentBaseUrl();
  const { t, i18n } = useTranslation();
  const isEn = i18n?.language === "en";

  return (
    <div className="relative flex h-full w-full flex-col justify-between px-[24px] pt-[90px]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SectionTitle title={preProcessingName} />
      </motion.div>
      {preProcessingImageUrl && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="relative h-[220px] w-full">
            <img
              src={preProcessingImageUrl}
              alt="preprocess"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <p className="color-white mt-[16px] text-center text-[16px] leading-[24px]">
          {parse(preProcessingDescription)}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="relative mb-[10px] mt-[20px] h-[140px] w-full">
          <div className="flex w-full flex-col gap-[8px] rounded-[4px] border border-lesslightgrey px-[24px] py-[16px]">
            <p className="text-[14px] font-light leading-[22px]">
              {t("page.roast.flavor")}
            </p>
            <div className="flex w-full justify-between">
              <p className="text-[16px] font-medium leading-[24px]">
                {t("page.roast.acidity")}
              </p>
              <div className="h-[28px] w-[200px] rounded-[4px] border border-lightgrey px-[6px] py-[4px]">
                <div
                  className="h-full rounded-[2px] bg-lightgrey"
                  style={{ width: `${preProcessingAcidity}%` }}
                ></div>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <p className="text-[16px] font-medium leading-[24px]">
                {t("page.roast.sweet")}
              </p>
              <div className="h-[28px] w-[200px] rounded-[4px] border border-lightgrey px-[6px] py-[4px]">
                <div
                  className="h-full rounded-[2px] bg-lightgrey"
                  style={{ width: `${preProcessingSweet}%` }}
                ></div>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <p className="text-[16px] font-medium leading-[24px]">
                {t("page.roast.bitter")}
              </p>
              <div className="h-[28px] w-[200px] rounded-[4px] border border-lightgrey px-[6px] py-[4px]">
                <div
                  className="h-full rounded-[2px] bg-lightgrey"
                  style={{ width: `${preProcessingBitter}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <NextPage url={`${baseUrl}/tutorial`} title={t("next.instruction")} />
    </div>
  );
}
