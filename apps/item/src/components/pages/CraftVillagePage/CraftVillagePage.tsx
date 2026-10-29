import { FC } from "react";
import { SectionItem } from "../StoryPage/StoryPage";
import CraftVillageSection from "../StoryPage/sections/Stone/CraftVillageSection";
import Loader from "@/components/common/Loader";
import { useTranslation } from "react-i18next";
import { useProductStory } from "@/hooks/useProductStory";

const CraftVillagePage: FC = () => {
  const {
    productDetail,
    pageAttributes: {
      craft_village: {
        histories,
        cultures,
      },
    },
    isLoading,
  } = useProductStory();

  const { i18n } = useTranslation();

  const { attribute } = productDetail || {};
  const { village, translation } = attribute || {};

  const renderLocationVideoDescription = () => {
    if (i18n.language === "vi") return translation?.vi?.village_location ?? "";

    return translation?.en?.village_location ?? "";
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="info relative h-[100vh] snap-both snap-mandatory overflow-x-hidden">
        {!isLoading && (
          <SectionItem>
            <CraftVillageSection
              cultures={cultures}
              locationVideoUrl={village?.location_video.url ?? ""}
              location={renderLocationVideoDescription()}
              histories={histories}
              villageName={village?.name ?? ""}
            />
          </SectionItem>
        )}
      </div>
    </>
  );
};

export default CraftVillagePage;
