import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import TickIcon from "../icons/TickIcon";
import OnChainInfo from "../OnChainInfo";
import { shortenString } from "@/utils/url";
import { FadeInMotion } from "@/components/common/FadeInMotion";
import { useTranslation } from "react-i18next";
import { useProductStory } from "@/hooks/useProductStory";

interface ProductInfoSectionProps {
  name: string;
  tags: string[];
  author: string;
  authorLabel: string;
  showNft: boolean;
  stoneLikes?: number;
  infoUrl: string;
  digitalAssetDetail: any;
  isLoaded3D?: boolean;
}

const ProductInfoSection: FunctionComponent<ProductInfoSectionProps> = ({
  name,
  tags,
  author,
  infoUrl,
  digitalAssetDetail,
  authorLabel,
  showNft,
  isLoaded3D = false,
}) => {
  const { t } = useTranslation();
  const { isUnesco } = useProductStory();
  return (
    <div className="z-10 flex w-full justify-between">
      <div className="flex flex-col justify-start gap-[4px] text-[22px] font-semibold">
        <FadeInMotion isVisible={isLoaded3D} delay={1.2}>
          <p>{name}</p>
        </FadeInMotion>
        <FadeInMotion isVisible={isLoaded3D} delay={1.2}>
          <div className="flex gap-[10px]">
            {tags?.map((data, index) => {
              if (infoUrl) {
                return (
                  <Link
                    key={index}
                    className="rounded-[100px] bg-[#2191FF] px-[12px] py-[2px] text-center text-[12px] font-semibold"
                    href={infoUrl}
                  >
                    {data.toUpperCase()}
                  </Link>
                );
              }

              return (
                <span
                  key={index}
                  className="rounded-[100px] bg-[#2191FF] px-[12px] py-[2px] text-center text-[12px] font-semibold"
                >
                  {data.toUpperCase()}
                </span>
              );
            })}
          </div>
        </FadeInMotion>
        <FadeInMotion isVisible={isLoaded3D} delay={1.4}>
          <p className="mt-[4px] flex items-center justify-start gap-[4px] text-[14px] font-light text-lightgrey">
            <OnChainInfo
              data={{
                chain: "Kardiachain",
                collection: "Fascinating",
                contractAddress: shortenString(
                  "0x88f9Da4AE918236FE4e0880885a07D670aAB2935"
                ),
                tokenStandard: "KRC-721",
                owner: author,
                tokenId: digitalAssetDetail.token_id,
              }}
              anchorElement={
                <>
                  {authorLabel}
                  <span className="text-[14px] font-semibold underline">
                    {author}
                  </span>
                  <TickIcon width="20" height="20" />
                </>
              }
              showNft={showNft}
            />
          </p>
        </FadeInMotion>
      </div>
    </div>
  );
};

export default ProductInfoSection;
