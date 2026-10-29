import Link from "next/link";
import Image from "next/image";
import NomionBlack from "@/assets/images/nomion_logo_black.png";
import { useTranslation } from "next-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full bg-blue py-[20px] lg:pt-[60px]">
      <div className="m-auto flex w-full max-w-[1440px] flex-col items-center gap-[24px] px-[24px] lg:gap-6 lg:px-[40px]">
        <div className="logo">
          <img
            src="https://assets.nomion.io/phygilab-website/phygilab-yellow-logo.png"
            alt="phygital"
            className="h-6 w-auto object-contain md:h-8"
          />
        </div>

        <div className="flex flex-col items-center text-[16px] lg:gap-[12px]">
          <p className="font-medium text-white">{t("general.contactUsAt")}</p>
          <Link href="mailto:hello@phygilabs.io">
            <span className="font-bold text-white">hello@phygilabs.io</span>
          </Link>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-[8px] lg:flex-row lg:gap-0">
          <p className="text-xs font-medium leading-[150%] text-white md:text-base">
            © {new Date().getFullYear()} Phygital Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
