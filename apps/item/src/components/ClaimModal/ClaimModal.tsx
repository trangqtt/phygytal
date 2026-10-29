import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import Button from "../common/Button";
import AboutLej from "@/assets/images/about-lej.png";
import AuthModal from "../AuthModal/AuthModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { claimProductItem } from "@/apis/product";
import { useSelector } from "react-redux";
import { selectStory } from "@/redux/pageSlice";
import { selectUserUId } from "@/redux/userSlice";
import { useProductStory } from "@/hooks/useProductStory";

interface ModalProps {
  open: boolean;
  imageUrl?: string;
  onClose?(): void;
  onClaim?(key?: any): void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ClaimModal({
  open,
  imageUrl,
  onClose,
  onClaim,
}: ModalProps) {
  const [openAuth, setOpenAuth] = useState(false);
  const userUID = useSelector(selectUserUId);

  const { productItemId } = useProductStory();
  const mutationClaim = useMutation(
    (itemId: string) => claimProductItem(itemId),
    {
      onSuccess() {
        onClaim?.();
        onClose?.();
      },
    }
  );

  const handleClaim = () => {
    if (!userUID) {
      setOpenAuth(true);
    } else {
      mutationClaim.mutate(productItemId!);
    }
  };

  useEffect(() => {
    if (userUID) {
      setOpenAuth(false);
    }
  }, [userUID]);

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <div className="claim-blur-background h-full w-full bg-[#1F1F1F]">
        <div className="m-auto  flex h-[500px] flex-col justify-between p-[24px]">
          <p className="mb-[24px] text-[14px] font-semibold uppercase leading-[20px]">
            BẠN CÓ MUỐN SỞ HỮU SẢN PHẨM NÀY ?
          </p>
          <div className="relative h-[240px] w-full flex-1">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="product"
                className="m-auto h-full w-auto object-contain"
              />
            )}
          </div>
          <p className="mt-[12px] text-center text-[14px] font-semibold leading-[18px]">
            Limited Edition
          </p>
          <div className="mt-[16px] flex gap-[12px]">
            <Button variant="secondary" className="flex-1" onClick={onClose}>
              Hủy
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleClaim}>
              Xác nhận
            </Button>
          </div>
        </div>
      </div>

      <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
    </Dialog>
  );
}
