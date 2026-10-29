import { useTranslation } from "next-i18next";

export default function Intro() {
  const { t } = useTranslation();
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-10 text-center md:pb-[10%] pb-10">
      <h1 className="z-10 text-6xl md:text-8xl font-bold uppercase text-primary">{t("general.phygital")}</h1>
      <h4 className="z-10 text-2xl md:text-4xl font-bold text-primary">Phygital = Physical + Digital</h4>
      <div className="absolute z-0 w-full h-[100vh] top-[-64px] md:top-[-80px]">
        <div className="bg-softBlue absolute z-10 h-full w-full"></div>
        <video
          playsInline
          muted={true}
          autoPlay={true}
          loop={true}
          className="z-0 w-full h-full object-cover"
          poster="https://assets.nomion.io/phygilab-website/poster-1-opt.png"
        >
          <source
            src="https://assets.nomion.io/phygilab-website/main.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}
