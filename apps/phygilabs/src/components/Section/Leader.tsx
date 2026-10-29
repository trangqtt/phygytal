import parse from "html-react-parser";
import { FullScreenSection } from "../common/FullScreen";
import LinkedinIcon from "../common/icons/LinkedinIcon";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const leaders = [
  {
    name: "Huy Nguyễn",
    url: "https://assets.nomion.io/phygilab-website/leader/huynguyen.png",
    title: "CEO & Founder",
    linkedin: "https://www.linkedin.com/in/huny/",
  },
  {
    name: "Nam Đỗ",
    url: "https://assets.nomion.io/phygilab-website/leader/namdo.png",
    title: "CTO & Co-Founder",
    linkedin: "https://www.linkedin.com/in/nam-do-01264327/",
  },
  {
    name: "Julie Phạm",
    url: "https://assets.nomion.io/phygilab-website/leader/juliepham.png",
    title: "COO",
    linkedin: "",
  },
];

interface LeaderItemProps {
  name: string;
  title: string;
  url: string;
  linkedin: string;
}

function LeaderItem({ name, title, url, linkedin, }: LeaderItemProps) {
  return (
    <>
      <div className="leader-item flex h-full w-full flex-col gap-1 px-2 py-1 md:h-auto md:w-1/3 md:gap-2 md:px-4 md:py-2">
        <img
          alt={name}
          src={url}
          className="w-full h-auto"
        />
        <h4 className="text-center text-xl font-bold text-blue md:text-2xl">
          {name}
        </h4>

        <div className="[&>*]:text-md [&>*]:font-thin  text-blue [&>*]:mb-1 [&>*]:text-blue  md:[&>*]:mb-2 flex justify-between items-center">
          {title}
          <Link href={linkedin} target={linkedin ? "_blank" : ""}>
            <LinkedinIcon />
          </Link>
        </div>
      </div>
    </>
  );
}

export function Leader() {
  const { t } = useTranslation();
  return (
    <div className="relative flex h-full w-full flex-col gap-2 bg-white px-4 md:justify-center md:px-10 md:pb-4">
      <div className="mt-4 flex h-full flex-1 flex-col items-center justify-center gap-1 pb-4 md:h-auto md:gap-0 md:pb-0 lg:mt-0">
        <div className="flex flex-col text-center text-2xl font-bold uppercase leading-[28px] text-blue md:text-4xl lg:leading-[55px]">
          {t("general.meetTheTeam")}
        </div>
        <div className="mt-0 flex w-full h-[calc(100%-80px)] flex-col gap-3 md:mt-4 md:h-auto md:max-w-7xl md:flex-row md:gap-10">
          {leaders.map((data, index) => (
            <LeaderItem key={index} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LeaderMobile() {
  const { t } = useTranslation();
  return (
    <>
      {leaders.map((data, index) => (
        <FullScreenSection
          name="product"
          theme="light"
          key={index}
          className="block md:hidden"
          showScrollDown={index !== leaders.length - 1}
        >
          <div className="relative flex h-full w-full flex-col gap-2 bg-white px-4 md:justify-center md:px-10 md:pb-4">
            <div className="mt-3 flex h-full flex-1 flex-col items-center gap-1 pb-4 md:h-auto md:justify-center md:gap-0 md:pb-0 lg:mt-0">
              <div className="flex flex-col text-center text-2xl font-bold uppercase leading-[28px] text-blue md:text-4xl lg:leading-[55px]">
                {t("general.meetTheTeam")}
              </div>
              <div className="mt-1 flex w-full h-[calc(100%-80px)] flex-col gap-3 md:mt-10 md:h-auto md:flex-row md:gap-10">
                <LeaderItem {...data} />
              </div>
            </div>
          </div>
        </FullScreenSection>
      ))}
    </>
  );
}
