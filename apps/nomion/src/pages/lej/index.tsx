import LejGallery from "@/components/pages/LejGallery";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

export default function Index() {
  return <LejGallery />;
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}