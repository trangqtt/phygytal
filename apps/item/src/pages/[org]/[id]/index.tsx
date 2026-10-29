import Homepage from "@/components/pages/Homepage";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeadMetaTag from "@/components/common/HeaderMetaTag";
import { API_BASE_URL } from "@/constant";

export default function Index({ product }: any) {
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

  return (
    <>
      <HeadMetaTag
        description={getDescription()}
        image={imageUrl!}
        title={getTitle()}
      />
      <Homepage />
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
