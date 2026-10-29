import Link from "next/link";
import Image from "next/image";
import NomionBlack from "@/assets/images/nomion_logo_black.png";
import Line from "@/assets/images/line.png";
import { useTranslation } from "next-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full py-[40px] lg:pt-[60px]">
      <div className="m-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-[24px] px-[24px] lg:px-[40px]">
        <div className="flex flex-col items-center">
          <p className="mr-[8px] leading-[1.5rem] text-[#8C8C8C]">
            {t("general.contactUsAt")}
          </p>
          <Link href="mailto:hello@nomion.io">
            <span className="font-semibold underline underline-offset-4">
              hello@nomion.io
            </span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-x-[10px] md:gap-x-[40px]">
          <p className="text-center text-xs md:text-base font-medium leading-[1.5rem] text-[#8C8C8C]">
            {/* Powered by{" "} */}
            © 2023 Powered by{" "}
            <Link href="https://vatlyso.vn/" target="_blank">
            <span className="font-medium underline underline-offset-2">Phygital Labs</span>
            </Link>
            .{" "}All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
