import { useProductStory } from "@/hooks/useProductStory";
import { shortenString } from "@/utils/url";
import { Popover } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC, ReactElement, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DenTranNamDinh from "@/assets/images/dentran-namdinh.jpg";

// hardcode for co vat hue on dev only

const CustomPopover = styled(Popover)(({ theme }) => ({
  "& .MuiModal-backdrop": {
    backgroundColor: "rgba(38, 38, 38, 0.8) !important",
    backdropFilter: "blur(10px)",
  },
  "& .MuiPopover-paper": {
    backgroundColor: "transparent",
    boxShadow: "none",
    top: "300px !important",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
}));

export type BlockchainInfo = {
  collection: string;
  contractAddress: string;
  tokenStandard: string;
  chain: string;
  owner: string;
  tokenId: number;
};

export type OnChainInfoProps = {
  data: BlockchainInfo;
  anchorElement: ReactElement;
  showNft?: boolean;
};

const OnChainInfo: FC<OnChainInfoProps> = (props) => {
  const { data, anchorElement, showNft } = props;
  const iconRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const { chipId, isHuePage, isUnesco, isNgheDenTran } = useProductStory();

  const getOwnerIcon = () => {
    if (isHuePage) {
      return "/images/ttbaotonhue.png";
    }

    if (isNgheDenTran) {
      return DenTranNamDinh.src;
    }

    if (isUnesco) {
      return "https://assets.nomion.io/images/user_id/1695976099-Screenshot2023-09-29at15.28.11.png";
    }

    return "/images/danang-logo.jpg";
  };

  const handleClick = () => {
    if (isUnesco || isNgheDenTran) return;
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        ref={iconRef}
        className="flex items-center justify-center gap-[8px]"
      >
        {/* <img
          height={32}
          width={32}
          src={getOwnerIcon()}
          alt={"Danang chain"}
          className="m-auto object-contain"
        /> */}
        {anchorElement}
      </div>
      {showNft && (
        <CustomPopover
          open={open}
          anchorEl={iconRef.current}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            maxWidth: "600px",
          }}
        >
          <div className="w-full rounded-[8px] border-[1px] border-[#454545] bg-[#000]">
            <div className="w-full border-b-[1px] border-b-[#454545] p-[12px] text-center font-semibold">
              {t("general.nft")}
            </div>
            <div className="flex w-full flex-col gap-[10px] p-[12px]">
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-medium text-[#bfbfbf]">
                  Token ID
                </p>
                <a
                  href={`https://testnets.opensea.io/assets?search[query]=${data.contractAddress}`}
                  target="_blank"
                  className="text-[14px] font-semibold text-[#f0f0f0] underline"
                >
                  #{data.tokenId}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-medium text-[#bfbfbf]">
                  Collection
                </p>
                <a
                  href={`https://testnets.opensea.io/assets?search[query]=${data.contractAddress}`}
                  target="_blank"
                  className="text-[14px] font-semibold text-[#f0f0f0] underline"
                >
                  {isHuePage ? "Cổ vật Huế" : "Đá Non Nước"}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-medium text-[#bfbfbf]">
                  Contract Address
                </p>
                <a
                  href={`https://sepolia.etherscan.io/address/${data.contractAddress}`}
                  target="_blank"
                  className="text-[14px] font-semibold text-[#f0f0f0] underline"
                >
                  {shortenString(data.contractAddress)}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-medium text-[#bfbfbf]">
                  Token Standard
                </p>
                <p className="text-[14px] font-semibold text-[#f0f0f0]">
                  DRC-721
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-medium text-[#bfbfbf]">Chain</p>
                <p className="text-[14px] font-semibold text-[#f0f0f0]">
                  DaNangChain
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-[8px] text-[14px] font-light leading-[22px] text-[#bfbfbf]">
            <img
              height={32}
              width={32}
              src={getOwnerIcon()}
              alt={"Danang chain"}
              className="rounded-full object-contain"
            />
            {t("general.ownedBy")}{" "}
            <span className="font-semibold text-[#f0f0f0] underline">
              {data.owner}
            </span>
          </div>
        </CustomPopover>
      )}
    </>
  );
};

export default OnChainInfo;
