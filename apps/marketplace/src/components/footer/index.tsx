"use client";

import { FC } from "react";
import { nomionblack } from "../../assets/images";
import { usePathname } from "next/navigation";
import { cn } from "@lib/utils";

const Footer: FC = () => {
  const pathName = usePathname();

  return (
    <div className={cn(
      "w-full h-70 px-16 py-10 flex flex-col justify-between items-center",
      pathName === "/" && "bg-[#F7F7F8]",
      pathName !== "/" && "bg-n0",
      pathName.includes("/collection") && "border-t"
    )}>
      <img src={nomionblack.src} alt="logo" />
      <div className="flex flex-col text-center">
        <p>Liên lạc với chúng tôi tại</p>
        <b>hello@nomion.io</b>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-base font-medium text-n6">© 2023 Nomion. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <p className="text-base font-medium text-n6">Terms of Service</p>
          <p className="text-base font-medium text-n6">Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
