import AboutPage from "@/components/pages/AboutPage";
import Homepage from "@/components/pages/Homepage";
import StoryPage from "@/components/pages/StoryPage";
import Tutorial from "@/components/pages/TutorialPage";
import { useRouter } from "next/router";
import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ScanErrorPage from "@/components/pages/ScanErrorPage";
import StoneInfoPage from "@/components/pages/StoneInfoPage/StoneInfoPage";
import CraftsmenPage from "@/components/pages/CraftsmenPage/CraftsmenPage";
import CraftVillagePage from "@/components/pages/CraftVillagePage/CraftVillagePage";
import LetterPage from "@/components/pages/LetterPage";
import HeadMetaTag from "@/components/common/HeaderMetaTag";
import { API_BASE_URL } from "@/constant";

export default function Index({ product }: any) {
  const router = useRouter();
  const { page } = router.query;
  const totalItem = product?.total_item;
  const productName = product?.product_name;
  const imageUrl = product?.image?.url;

  const getDescription = () => {
    let desc = productName || "";

    if (totalItem) {
      desc += `, Limited edition, total ${totalItem} items`;
    }

    return desc;
  };

  const getTitle = () => {
    const title = productName || "Nomion";
    return title;
  };

  const renderPage = (page: any) => {
    switch (page) {
      case "home":
        return <Homepage />;
      case "about":
        return <AboutPage />;
      case "story":
        return <StoryPage />;
      case "tutorial":
        return <Tutorial />;
      case "error":
        return <ScanErrorPage />;
      case "letter":
        return <LetterPage />;
      default:
        return <Homepage />;
    }
  };

  return (
    <>
      <HeadMetaTag
        description={getDescription()}
        image={imageUrl!}
        title={getTitle()}
      />
      {renderPage(page)}
    </>
  );
}

export async function getServerSideProps({ locale, params, query }: any) {
  // default is always ssr
  const ssr = query.s ?? "1";
  let response;

  if (ssr === "1") {
    const chipId = params?.id;
    if (typeof chipId === "string") {
      // call api here
      const res = await fetch(`${API_BASE_URL}/product/seo?tag_id=${chipId}`);
      response = await res.json();
    }
  }

  return {
    props: {
      product: response?.result || {},
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
}
