"use client"

import { FC, useEffect, useState } from "react";
import { nomionblack, nomionwhite } from "../../assets/images";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@lib/utils";
import CartIcon from "@components/ui/icons/CartIcon";
import { BuyOrderInfo } from "../../models/order";
import ProfileIcon from "@components/ui/icons/ProfileIcon";
import { SignInDialog } from "@components/dialog/SignInDialog";

const Header: FC = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [itemsInCart, setItemsInCart] = useState<number>(0);
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const buyOrderInfos = localStorage.getItem("buy_order_infos");

    if (!buyOrderInfos) return;

    setItemsInCart((JSON.parse(buyOrderInfos) as BuyOrderInfo[])?.length);
  }, [])

  const onClickProfile = () => {
    setIsSignInDialogOpen(true);
  }

  return (
    <>
      <div
        className={cn(
          "w-full h-18 fixed inset-0 px-16 py-4 z-10 flex items-center justify-between",
          pathName === "/" && "bg-black-0.5",
          pathName !== "/" && "bg-white"
        )}
      >
        {pathName === "/" && (
          <img
            className="cursor-pointer"
            src={nomionwhite.src}
            alt="logo"
            onClick={() => router.push("/")}
          />
        )}
        {pathName !== "/" && (
          <img
            className="cursor-pointer"
            src={nomionblack.src}
            alt="logo"
            onClick={() => router.push("/")}
          />
        )}
        <div className="flex items-center gap-3">
          <CartIcon
            onClick={() => router.push("/cart")}
            className="cursor-pointer"
            color={pathName === "/" ? "white" : "black"}
          />
          <ProfileIcon
            onClick={() => onClickProfile()}
            color={pathName === "/" ? "white" : "black"}
          />
        </div>
      </div>
      <SignInDialog
        isOpen={isSignInDialogOpen}
        onClose={() => setIsSignInDialogOpen(false)}
      />
    </>
  );
};

export default Header;
