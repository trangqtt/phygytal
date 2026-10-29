import Stone2023 from "@/components/pages/Stone2023";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

export default function Index() {
  return <Stone2023 collection="da-non-nuoc" />;
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}