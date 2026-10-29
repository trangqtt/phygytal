import { useTranslation } from "next-i18next";
import Subtext from "../common/Typography/Subtext";
import Subtitle from "../common/Typography/Subtitle";
import Text from "../common/Typography/Text";
import Title from "../common/Typography/Title";

const items = [
  {
    url: "https://assets.nomion.io/phygilab-website/icons/id-icon.png",
    title: "ID",
    description: "(định danh số)",
  },
  {
    url: "https://assets.nomion.io/phygilab-website/icons/item-icon.png",
    title: "Item",
    description: "(vật thể, sản phẩm)",
  },
  {
    url: "https://assets.nomion.io/phygilab-website/icons/location-icon.png",
    title: "Location",
    description: "(nơi chốn)",
  },
  {
    url: "https://assets.nomion.io/phygilab-website/icons/event-icon.png",
    title: "Event",
    description: "(sự kiện / hoạt động)",
  },
];

export default function Description() {
  const { t, i18n } = useTranslation();
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 bg-white px-4 pb-[10%] text-center md:justify-center md:px-10 md:pb-10">
      <Title className="z-10 mt-4 md:mt-0">
        {t("general.physicalDigitalConvergence")}
      </Title>
      <Subtitle className="z-10 mb-3 md:mt-8">
        {t("general.physicalToDigital")}
      </Subtitle>
      <div className="text-left md:text-center">
        <Text className="max-w-content text-center" theme="light">
          {t("general.phygitalSolution")}
        </Text>
        <Text className="max-w-content text-center" theme="light">
          {t("general.phygitalGenerate")}
        </Text>
        <Text className="mt-3 max-w-content md:mt-10 text-center" theme="light">
          {t("general.fourTypeOfData")}
        </Text>
      </div>

      <div className="mt-4 w-full max-w-[900px] gap-4 md:gap-0 md:px-20 grid grid-cols-2 md:grid-cols-4 justify-center items-center">
        {items.map((item: any, index) => (
          <div
            key={index}
            className="flex w-full justify-center items-center gap-2 flex-col md:justify-start md:gap-1"
          >
            <img
              alt="item"
              src={item.url}
              className="h-10 w-10 object-contain md:h-16 md:w-16"
            />
            <div>
              <Text className="whitespace-nowrap">{item.title}</Text>
              {i18n.language === "vi" && (
                <Subtext className="whitespace-nowrap">
                  {item.description}
                </Subtext>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
