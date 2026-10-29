import { CloseIcon } from "@/components/common/icons";
import MailIcon from "@/components/common/icons/MailIcon";
import PhoneIcon from "@/components/common/icons/PhoneIcon";
import { Dialog } from "@mui/material";
import Image from "next/image";
import { FunctionComponent } from "react";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import DefaultAvatar from "../../../assets/images/default-avatar.jpg";
import TickIcon from "@/components/common/icons/TickIcon";
import {ProductTag} from "@/models/Product";

interface CraftsmenDialogProps {
  authorizerDialogOpen: boolean;
  setAuthorizerDialogOpen: (status: boolean) => void;
  data: ProductTag | undefined;
}

const CraftsmenDialog: FunctionComponent<CraftsmenDialogProps> = ({
  authorizerDialogOpen,
  setAuthorizerDialogOpen,
  data,
}: CraftsmenDialogProps) => {
  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`${type} has been copied to your clipboard`);
  };

  const craftman = data?.author;

  return (
    <Dialog
      open={authorizerDialogOpen}
      onClose={() => setAuthorizerDialogOpen(false)}
      style={{ borderRadius: 12 }}
      classes={{ paper: "craftsmen-dialog-paper" }}
    >
      {data && (
        <div className="flex flex-col items-center justify-center gap-[24px] rounded-[12px] bg-semiblack px-[0px] pb-[32px] pt-[12px] md:px-[24px] md:pt-[24px]">
          <div className=" relative w-full px-[20px] py-[8px] text-center text-[16px] font-bold">
            NGHỆ NHÂN
            <div
              className="absolute right-[10px] top-0 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-lesslightgrey md:right-0"
              onClick={() => setAuthorizerDialogOpen(false)}
            >
              <CloseIcon width="24" height="24" />
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-[24px] px-[24px]">
            <div className="flex w-full flex-col items-center justify-center gap-[24px]">
              <div className="flex flex-col items-center justify-center gap-[16px] px-[24px]">
                <div className="relative h-[130px] w-[130px] rounded-full border-[2px] border-white md:h-[180px] md:w-[180px]">
                  <img
                    src={craftman?.avatar?.url ?? DefaultAvatar.src}
                    alt="Artist avatar"
                    style={{
                      borderRadius: "100%",
                    }}
                    className="w-full h-full object-fill"
                  />
                </div>
                {craftman && (
                  <div className="flex items-center gap-[4px] text-[18px] font-semibold">
                    {craftman?.name.vi}
                    <TickIcon />
                  </div>
                )}
              </div>
              {(craftman?.experience_year || craftman?.artworks_count) && (
                <div className="boder-lesslightgrey flex w-full items-center justify-around gap-[6px] rounded-[12px] border-[1px] border-solid border-darkgrey px-[16px] py-[10px]">
                  {craftman?.experience_year && (
                    <div className="flex flex-col justify-center gap-[6px] text-center">
                      <p className="text-[18px] font-bold">
                        {`${craftman?.experience_year} năm`}
                      </p>
                      <p className="text-[16px] font-normal text-lightgrey">
                        Hành nghề
                      </p>
                    </div>
                  )}
                  {craftman?.experience_year && craftman?.artworks_count && (
                    <div className="w-[20px] rotate-90 border-b-[1px] border-lightgrey"></div>
                  )}
                  {craftman?.artworks_count && (
                    <div className="flex flex-col justify-center gap-[6px] text-center">
                      <p className="text-[18px] font-bold">
                        {craftman?.artworks_count}
                      </p>
                      <p className="text-[16px] font-normal text-lightgrey">
                        Tác phẩm
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="craftmen-quote text-center text-[14px] font-light italic leading-[20px]">
              {parse(craftman?.description ?? "")}
            </div>
          </div>
          <div className="flex justify-center gap-[16px]">
            {craftman?.phone && (
              <a
                href={`tel:${craftman?.phone}`}
                className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full bg-darkgrey"
              >
                <PhoneIcon width="20" height="20" />
              </a>
            )}
            {craftman?.email && (
              <a
                href={`mailto:${craftman?.email}`}
                className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full bg-darkgrey"
              >
                <MailIcon width="20" height="20" />
              </a>
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default CraftsmenDialog;
