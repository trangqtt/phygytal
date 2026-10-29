import { FC } from "react";
import { SectionItem } from "../StoryPage/StoryPage";
import CraftMenSection from "../StoryPage/sections/Stone/CraftMenSection";
import { generateUrl } from "@/utils/url";
import { useRouter } from "next/router";
import Loader from "@/components/common/Loader";
import { useProductStory } from "@/hooks/useProductStory";
import { Section } from "@/components/common/SectionFullScreen/SectionFullScreen";
import CarouselSlide from "@/components/common/PageSlides/Carousel";
import { useTranslation } from "react-i18next";

const CraftsmenPage: FC = () => {
  const { i18n } = useTranslation();
  const { author, isLoading: isLoadingCraftMen, isHuePage } = useProductStory();
  const renderAuthorName = () => {
    if (i18n.language === "vi") return author?.name?.vi;
    return author?.name?.en;
  };

  const { highlight_artworks } = author!;

  return (
    <>
      {isLoadingCraftMen && <Loader />}
      <div className="info relative h-[100vh] snap-both snap-mandatory overflow-x-hidden overflow-y-scroll">
        {!isLoadingCraftMen && (
          <>
            <SectionItem>
              <CraftMenSection craftman={author!} isHuePage={isHuePage} />
            </SectionItem>
            {highlight_artworks?.length ? (
              <SectionItem>
                <CarouselSlide
                  carouselSlideItems={highlight_artworks ?? []}
                  craftmenName={renderAuthorName()}
                  section={Section.TypicalWork}
                />
              </SectionItem>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default CraftsmenPage;
