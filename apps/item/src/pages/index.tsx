import Homepage from "@/components/pages/Homepage";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ScanErrorPage from "@/components/pages/ScanErrorPage";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default function Index() {
  return <ScanErrorPage />;
}
