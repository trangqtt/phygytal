import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LandingPage from "@/components/pages/LandingPage";

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function Index() {
  return <LandingPage />;
}
