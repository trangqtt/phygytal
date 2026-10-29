import React from "react";
import HeadMetaTag from "@/components/common/HeaderMetaTag";
import TombPage from "@/components/pages/TombPage";
import { TombHeader } from "@/components/pages/TombPage/Header";
import { TombInfo } from "@/assets/images";

export default function Index({ product }: any) {
  return (
    <>
      <HeadMetaTag
        description="Tiểu sử - Phan Văn Sự"
        image={TombInfo}
        title="Tiểu sử - Phan Văn Sự"
      />
      <TombHeader />
      <TombPage />
    </>
  );
}
