import { useTranslation } from "next-i18next";
import Quote from "../common/Typography/Quote";
import Text from "../common/Typography/Text";
import Title from "../common/Typography/Title";

export default function Vision() {
  const { t } = useTranslation();
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 px-4 pb-[10%] md:px-10">
      <div className="absolute top-[-64px] z-0 h-[100vh] w-[100vw] md:top-[-80px]">
        <div className="absolute z-10 h-full w-full bg-softBlue"></div>
        <video
          controls={false}
          playsInline={true}
          muted={true}
          autoPlay={true}
          loop={true}
          className="h-full w-full object-cover"
          poster="https://assets.nomion.io/phygilab-website/poster-2-opt.png"
        >
          <source
            src="https://assets.nomion.io/phygilab-website/phygital-intro.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="flex flex-col justify-center pb-[10%] md:mt-24 md:flex-row md:pb-0">
        <div className="z-10 md:mt-8">
          <Title className="whitespace-nowrap text-center" theme="dark">
            {t("general.ourBelief")}
          </Title>
          <div className="mt-4 text-center text-xl md:mt-[32px] md:text-2xl">
            <Text className="mb-4 max-w-content" theme="dark">
              {t("general.ourBeliefDescription")}
              <br />
              <br />
            </Text>
            <Quote theme="dark" className="max-w-[700px]">
              {t("general.ourBeliefQuote")}
            </Quote>
          </div>
        </div>
      </div>
    </div>
  );
}
