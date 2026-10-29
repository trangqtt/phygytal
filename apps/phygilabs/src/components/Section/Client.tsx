import { useTranslation } from "next-i18next";
import Text from "../common/Typography/Text";
import Title from "../common/Typography/Title";

const clientLogos = [
  {
    url: "https://assets.nomion.io/phygilab-website/clients/Logo%20Da%20nang.png",
  },
  {
    url: "https://assets.nomion.io/phygilab-website/clients/Logo%20The%20Ho%20Tieu.png",
  },
  {
    url: "https://assets.nomion.io/phygilab-website/clients/Logo%20Ortho.png",
  },
  {
    url: "https://assets.nomion.io/phygilab-website/clients/Logo%20Le%20J.png",
  },
  {
    url: "https://assets.nomion.io/phygilab-website/clients/Logo%20Coolmate.png",
  },
  {
    url: "https://assets.nomion.io/phygilab-website/clients/Logo%20Skechers.png",
  },
  {
    url: "https://assets.nomion.io/phygilab-website/clients/Logo%20to%20Ong.png",
  },
  // {
  //   url: "https://assets.nomion.io/phygilab-website/clients/TRu%CC%9Bo%CC%9B%CC%80ng%20FPT%20LOGO.png",
  // },
  {
    url: "https://assets.nomion.io/phygilab-website/clients/Logo%20VietRace365.png",
  },
  {
    url: "https://assets.nomion.io/phygilab-website/clients/Logo%20MTB.png",
  },
  {
    url: "https://assets.nomion.io/phygilab-website/clients/Logo%20La%20An.png",
  },
  // {
  //   url: "https://assets.nomion.io/phygilab-website/clients/Logo%20FujiFilm.png",
  // },
];

export default function Client() {
  const { t } = useTranslation();
  return (
    <div className="relative flex h-full w-full flex-col items-center gap-2 bg-white px-4 md:justify-center md:px-10">
      <div className="mt-[16px] flex flex-col items-center md:mt-0">
        <div className="max-w-content text-black">
          <Title className="mt-4 text-center" theme="light">
            {t("general.ourClients")}
          </Title>
          <div className="mt-2 max-w-content text-[14px] leading-[18px] md:mt-4 md:text-[18px] md:leading-[24px]">
            <Text className="text-center">
              {t("general.ourClientsDescription")} {' '}
              <span className="text-blue whitespace-nowrap">
                {t("general.onGlobalMarket")}
              </span>
            </Text>
          </div>
        </div>
        <div className="mt-4 md:mt-12">
          <div className="flex flex-wrap gap-y-[2px] md:max-w-[1000px] md:justify-center md:gap-y-0">
            {clientLogos.map((logo: any, index) => (
              <div key={index} className="h-[70px] w-1/2 md:h-[120px] md:w-1/4">
                <img
                  src={logo.url}
                  alt="logo"
                  className="m-auto h-full w-auto bg-white object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
