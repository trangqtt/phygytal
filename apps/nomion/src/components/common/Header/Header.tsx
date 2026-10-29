import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fingerPrint, nomionLogo } from "@/assets/images";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";
import { useTranslation } from "next-i18next";
import {NomionLogo} from "@/components/common/icons"

interface HeaderProps {
  title?: string;
}
const Header = ({ title }: HeaderProps) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { pathname, query, asPath } = router;

  const handleChangeLanguage = (value: string) => {
    router.push({ pathname, query }, asPath, {
      locale: value,
    });
  };

  return (
    <div className="header fixed z-50 flex h-[64px] w-full backdrop-blur">
      <div className="flex w-full max-w-[1440px] items-center justify-between px-5 py-4 md:m-auto md:px-20 lg:px-[40px]">
        <Link href="/">
          <div className="relative flex h-7 w-40 cursor-pointer flex-row gap-2 md:h-10"> 
             <NomionLogo className="w-full h-full"/> 
          </div>
        </Link>
        <Select value={i18n.language} onValueChange={handleChangeLanguage} >
          <SelectTrigger className="bg-opacity-white hover:bg-opacity-white-hover p-2 text-white backdrop-blur-md rounded-full">
          </SelectTrigger>
          <SelectContent className="bg-opacity-white w-32 text-white backdrop-blur-md">
            <SelectItem className="hover:bg-opacity-white-hover rounded-[4px]" value="vi">Tiếng Việt</SelectItem>
            <SelectItem className="hover:bg-opacity-white-hover rounded-[4px]" value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {title && (
        <div className="absolute inset-0 -z-20 m-auto hidden w-full max-w-[1440px]  items-center justify-center py-[16px] md:flex">
          <p className="text-[16px] font-semibold leading-normal">{title}</p>
        </div>
      )}
    </div>
  );
};

export default Header;
