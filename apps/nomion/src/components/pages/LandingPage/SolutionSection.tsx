import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import {
  nfcBlockchain,
  lidar3D,
  nfcChip,
  gallery,
  library,
  storyTelling,
  marketplace,
  nfcBlockchainMobile,
  lidar3DMobile,
  nfcChipMobile,
  galleryMobile,
  libraryMobile,
  storyTellingMobile,
  marketplaceMobile,
} from "@/assets/images";
import { useTranslation } from "next-i18next";

export type SlideItemProps = {
  image: string;
  image2: string;
  solutionName: string;
  name: string;
};

const SlideItem: SlideItemProps[] = [
  {
    image: nfcChip,
    image2: nfcChipMobile,
    solutionName: "general.solution1",
    name: "Identity Chip",
  },
  {
    image: lidar3D,
    image2: lidar3DMobile,
    solutionName: "general.solution2",
    name: "Lidar 3D",
  },
  {
    image: gallery,
    image2: galleryMobile,
    solutionName: "general.solution3",
    name: "Digital Gallery",
  },
  {
    image: nfcBlockchain,
    image2: nfcBlockchainMobile,
    solutionName: "general.solution4",
    name: "NFT Blockchain",
  },
  {
    image: storyTelling,
    image2: storyTellingMobile,
    solutionName: "general.solution5",
    name: "Story Telling",
  },
  {
    image: marketplace,
    image2: marketplaceMobile,
    solutionName: "general.solution6",
    name: "Marketplace",
  },
  {
    image: library,
    image2: libraryMobile,
    solutionName: "general.solution7",
    name: "Digital Library",
  },
];

function SolutionItem({ image, image2, solutionName, name }: SlideItemProps) {
  const { t } = useTranslation();
  return (
    <div className="relative h-full">
      <div className="absolute bottom-0 h-112.5 w-full rounded-2xl bg-gradient-black"></div>
      <p className="absolute bottom-0 pb-5 pl-5 text-xl font-semibold md:left-2">
        {t(solutionName)}
      </p>
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet={`${image2} 560w`}
          sizes="768px"
        />
        <source srcSet={`${image} 1000w`} sizes="1000px" />
        <img src={image} className="h-full w-full rounded-2xl object-cover" />
      </picture>
    </div>
  );
}

export const SolutionSection = () => {
  const { t } = useTranslation();
  return (
    <div className="black-one m-auto max-w-[1440px] pb-10">
      <div className="relative mt-[120px] flex h-screen flex-col gap-14 md:mt-[357px] md:h-full">
        <div className="md:absolute md:top-[100px] md:right-[500px] md:h-[1440px] md:w-full md:rounded-full md:bg-gradient-blue"></div>
        <p className="z-10 w-full text-center text-3xl font-semibold leading-[2.5rem] md:text-4xl">
          {t("general.solutionTitle")}
        </p>
        <div className="h-full">
          <Swiper
            className="mySwiper"
            slidesPerView={1.5}
            spaceBetween={24}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
          >
            {SlideItem.map((item, index) => (
              <SwiperSlide key={index}>
                <SolutionItem {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
