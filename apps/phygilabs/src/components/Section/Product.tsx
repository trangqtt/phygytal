import { useTranslation } from "next-i18next";
import Subtitle from "../common/Typography/Subtitle";
import Text from "../common/Typography/Text";
import Title from "../common/Typography/Title";

const products = [
  {
    translation: {
      vi: {
        name: "Nomion - Định danh vạn vật",
        description:
          "Giải pháp định danh số giúp cho quá trình định danh sản phẩm vật lý trên không gian số, mở ra không gian tương tác không bị giới hạn bởi biên giới hay khoảng cách.",
      },
      en: {
        name: "Nomion - Digital Identity",
        description:
          "The digital identity solution helps with the digital identification of physical products in the digital space, opening up an interaction space without limitations from borders or distance.",
      },
    },
    url: "https://assets.nomion.io/phygilab-website/nomion-logo-final.png",
    link: "https://nomion.io",
  },
  {
    translation: {
      vi: {
        name: "Raramuri - Hoạt động số",
        description:
          "Giải pháp định danh số giúp cho quá trình định danh sản phẩm vật lý trên không gian số, mở ra không gian tương tác không bị giới hạn bởi biên giới hay khoảng cách.",
      },
      en: {
        name: "Raramuri - Digital Activities",
        description:
          "The technology platform that helps elevate the process of organizing, participating and tracking sporting events, creating a seamless and holistic experience for users between the physical and digital platforms.",
      },
    },
    url: "https://assets.nomion.io/phygilab-website/rrmr.png",
    link: "https://raramuri.io",
  },
];

export default function Product() {
  const { t, i18n } = useTranslation();
  const productTranslation = (translation: any) => {
    return translation[i18n.language];
  }
  return (
    <div className="relative flex h-full w-full flex-col gap-2 px-5 md:px-10 md:justify-center md:pb-20">
      <Title className="mt-4 text-center" theme="dark">{t("general.ourProducts")}</Title>
      <div className="mt-6 flex flex-col gap-10 md:mt-10 md:flex-row items-center md:items-start md:justify-center md:gap-28">
        {products.map(({ translation, url, link }, index) => (
          <a
            href={link}
            target="_blank"
            key={index}
            className="w-full max-w-[350px] md:w-1/2"
          >
            <div className="flex flex-col gap-4">
              <Subtitle className="text-center md:text-left text-white md:whitespace-nowrap">{productTranslation(translation).name}</Subtitle>
              <img
                alt={productTranslation(translation).name}
                src={url}
                className="w-fit object-cover md:h-[200px] rounded"
              />
              <Text className="hidden md:block font-thin" theme="dark">
                {productTranslation(translation).description}
              </Text>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
