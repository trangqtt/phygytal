import { getProductStoryData } from "@/apis/product";
import { Page } from "@/models/page";
import { ProductType } from "@/models/product";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export function useProductStory() {
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();
  const { data: story, isLoading } = useQuery(
    ["product-story", id],
    () => {
      if (window.location.search) {
        const sessionId = new URLSearchParams(window.location.search).get(
          "sessionId"
        );
        const newURL = window.location.href.split("?")[0];
        window.history.replaceState("", "", newURL);
        return getProductStoryData(id as string, sessionId as string);
      }
      return getProductStoryData(id as string);
    },
    {
      enabled: !!id,
      onError: (error: any) => {
        router.push("/error");
      },
    }
  );
  const { i18n } = useTranslation();

  const author = story?.author;
  const productDetail = { author: author, ...story?.product_detail };
  const ownerInfo = story?.owner_detail;
  const itemInfo = story?.product_item_detail;
  const totalItems = story?.product_detail?.total_item;
  const itemIndex = itemInfo?.item_index;
  const organization = story?.organization_detail;
  const org = organization?.org_tag_name || "";
  const logoUrl = organization?.org_logo_url || "";
  const productItemId = itemInfo?.product_item_id;
  const totalLike = itemInfo?.total_like || 0;
  const templateDetail = story?.template_detail;
  const mapping = story?.mapping_detail;
  const digitalAssetDetail = story?.digital_asset_detail;

  let pageAttributes: any = {
    craftsmen: {},
    craft_village: {},
    home: {},
    tutorial: {},
    about: {},
    letter: {},
    stone_info: {},
    story: {},
  };

  productDetail?.theme_pages?.forEach((page) => {
    const attributes = page?.["attributes"];
    const pageType = page.type!;
    let pageAttribute: any = attributes || {};

    if (!!attributes) {
      const currentLang = i18n.language;
      const translationData = attributes[currentLang];

      pageAttribute = {
        ...pageAttribute,
        ...translationData,
      };

      pageAttributes[pageType] = pageAttribute;
    }
  });

  return {
    org,
    chipId: id as string,
    ownerInfo,
    itemInfo,
    totalItems,
    itemIndex,
    productItemId,
    pageAttributes,
    story,
    logoUrl,
    totalLike,
    templateDetail,
    mapping,
    isLoading,
    organization,
    digitalAssetDetail,
    author,
    productDetail,
    isAstronautPage: productDetail?.type === ProductType.Astronaut,
    isCoffeePage: productDetail?.type === ProductType.Coffee,
    isStonePage: productDetail?.type === ProductType.Sculpture,
    isBaoNhanDan: productDetail?.type === ProductType.Newspaper,
    isTombPage: productDetail?.type === ProductType.Tomb,
    isHuePage: org === "hue",
    isUnesco: org === "unesco",
    isNgheDenTran: org === "unesco" && id === "0006-000002",
    isGomBatTRang: org === "demo" && id === "0008-000001",
  };
}
