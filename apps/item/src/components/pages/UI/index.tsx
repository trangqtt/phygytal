import { useProductStory } from "@/hooks/useProductStory";
import { Section } from "@/components/common/SectionFullScreen/SectionFullScreen";
import HomeSection from "./Sections/HomeSection";
import { useTranslation } from "react-i18next";
import { PageSteps } from "@/models/general";
import { FC } from "react";
import { Page, PageValue } from "@/models/product";
import ImageTextSection from "./Sections/ImageTextSection";
import VerticalCarouselSection from "./Sections/VerticalCarouselSection";
import AuthorSection from "./Sections/AuthorSection";
import { likeKey } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeProductItem } from "@/apis/product";
import { useAppStepContext } from "@/hooks/useAppStepContext";
import ContactSection from "./Sections/ContactSection";

function getValueFromProduct(product: any, key: string) {
  const keysSplit = key.split(".");
  if (keysSplit.length > 1) {
    let value: any;
    keysSplit.forEach((pathKey, index) => {
      if (index === 0) {
        value = product[pathKey];
      } else {
        value = value?.[pathKey];
      }
    });
    return value;
  }

  return product[key];
}

function getSectionProps(
  product: any,
  pageValues: Record<string, unknown>,
  pageValuesModel: PageValue[],
  keys: string[]
) {
  const pageValuesObj: Record<string, PageValue> = {};
  const rs: any = {};

  // pageValues?.forEach((page) => {
  //   pageValuesObj[page.key] = page;
  // });

  keys?.forEach((key) => {
    const pageValue = pageValues[key];
    const pageField = pageValuesModel.find((item: any) => item.key === key);
    rs[key] = pageField?.is_product_data
      ? getValueFromProduct(product, pageValue as string)
      : pageValue;
  });

  return rs;
}

const UI: FC = () => {
  const { currentStep } = useAppStepContext();

  const queryClient = useQueryClient();
  const { digitalAssetDetail, productDetail, productItemId, totalLike } =
    useProductStory();

  const { i18n } = useTranslation();

  const renderAuthorName = () => {
    if (i18n.language === "vi") return productDetail.author?.name?.vi;
    return productDetail.author?.name?.en;
  };

  const mutationLike = useMutation(
    (itemId: string) => likeProductItem(itemId),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["story"] });
      },
    }
  );

  const handleLike = () => {
    localStorage.setItem(`${likeKey}-${productItemId}`, "true");
    mutationLike.mutate(productItemId!);
  };

  const renderPage = (page: Page, _: number) => {
    switch (page.type) {
      case "home":
        return (
          <HomeSection
            id={page.id!}
            totalLike={totalLike}
            onLike={handleLike}
            digitalAssetDetail={digitalAssetDetail}
            isLoaded3D={currentStep === PageSteps.Normal}
            nextSlide={Section.Craftmen}
            author={renderAuthorName()}
            sectionData={getSectionProps(
              productDetail,
              page.values,
              page.values_model,
              [
                "name",
                "tags",
                "author_label",
                "show_nft",
                "meta_info",
                "video",
                "asset_three_dimension",
              ]
            )}
          />
        );
      case "imagetext":
        return (
          <ImageTextSection
            id={page.id!}
            sectionData={getSectionProps(
              productDetail,
              page.values,
              page.values_model,
              ["title", "text", "image", "background"]
            )}
          />
        );
      case "carousel":
        return (
          <VerticalCarouselSection
            id={page.id!}
            sectionData={getSectionProps(
              productDetail,
              page.values,
              page.values_model,
              ["title", "background", "list_images"]
            )}
          />
        );
      case "author":
        return (
          <AuthorSection
            id={page.id!}
            sectionData={getSectionProps(
              productDetail,
              page.values,
              page.values_model,
              ["name", "avatar", "experience_year", "artworks_count", "quote"]
            )}
          />
        );
      case "contact":
        return (
          <ContactSection
            id={page.id!}
            sectionData={getSectionProps(
              productDetail,
              page.values,
              page.values_model,
              ["email", "phone", "contact_name"]
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      id="snap-container"
      className="info relative m-auto h-[100vh] w-full snap-both snap-mandatory flex-col items-center justify-center overflow-x-hidden"
    >
      {(productDetail?.theme_pages as Page[]).map((page, index: number) =>
        renderPage(page, index)
      )}
    </div>
  );
};

export default UI;
