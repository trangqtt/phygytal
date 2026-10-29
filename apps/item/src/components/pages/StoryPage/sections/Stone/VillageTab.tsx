
import { Multilang } from "@/components/common/PageSlides/Carousel";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export enum VillageInfoTabs {
  LOCATION,
  HISTORY,
  CULTURE,
}

export type VillageTabProps = {
  title: string;
  value: VillageInfoTabs;
  selected: boolean;
  onSelect(tab: VillageInfoTabs): void;
};

type LocationTabProps = {
  mediaUrl: string;
  description: string;
};


export type HistoryItem = {
  description: Multilang;
  title: Multilang;
  imageUrl: string;
};

export type HistoryTabProps = {
  histories: HistoryItem[];
};

export type CultureItem = {
  description: Multilang;
  title: Multilang;
  imageUrl: string;
};

export type CultureTabProps = {
  cultures: CultureItem[];
};

export const LocationTab: FC<LocationTabProps> = (props) => {
  const { mediaUrl, description } = props;

  return (
    <div className="flex h-full w-full max-w-[600px] m-auto flex-col gap-[16px] bg-black text-center">
      <div className="relative h-full w-full">
        <video
          className="h-full w-full object-cover"
          autoPlay
          playsInline
          muted
        >
          <source src={mediaUrl} className="w-full" type=""></source>
        </video>
      </div>
      {description && (
        <p className="text-[14px] font-semibold">{description}</p>
      )}
    </div>
  );
};


export const HistoryTab: FC<HistoryTabProps> = (props) => {
  const { histories } = props;
  const { i18n } = useTranslation();

  const renderHistoryItemTitle = (history: HistoryItem) => {
    if (i18n.language === "vi") return history?.title?.vi;

    return history?.title.en;
  };

  const renderHistoryItemDesc = (history: HistoryItem) => {
    if (i18n.language === "vi") return history?.description?.vi;

    return history?.description?.en;
  };

  return (
    <div className="h-full w-full max-w-[600px] m-auto">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: false }}
        scrollbar={{ hide: true }}
        // autoplay
        className="h-full"
      >
        {histories.map((item: HistoryItem, index: number) => (
          <SwiperSlide key={index} className="h-full">
            <div className="relative h-full w-full bg-black flex flex-col justify-center gap-[15px]">
              <img
                src={item.imageUrl}
                alt="History"
                className="h-auto w-full object-contain max-h-[calc(100%-100px)]"
              />
              <div className="flex h-[85px] w-full flex-col items-start justify-center bg-black-alpha px-[24px] py-[16px] backdrop-blur-md">
                <p className="text-[14px] font-semibold">
                  {renderHistoryItemTitle(item)}
                </p>
                <p className="text-[14px] font-light">
                  {renderHistoryItemDesc(item)}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const CultureTab: FC<CultureTabProps> = (props) => {
  const { cultures } = props;
  const { i18n } = useTranslation();
  const renderCultureItemTitle = (culture: CultureItem) => {
    if (i18n.language === "vi") return culture?.title?.vi;

    return culture?.title?.en;
  };

  const renderCultureItemDesc = (culture: CultureItem) => {
    if (i18n.language === "vi") return culture?.description?.vi;

    return culture?.description?.en;
  };
  return (
    <div className="w-full max-w-[600px] m-auto h-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // autoplay
        className="h-full"
      >
        {cultures.map((item: CultureItem, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full bg-black flex flex-col justify-center gap-[15px]">
              <img
                src={item.imageUrl}
                alt="Culture"
                className="h-auto w-full object-contain max-h-[calc(100%-100px)]"
              />
              <div className="flex h-[85px] w-full flex-col items-start justify-center bg-black-alpha px-[24px] py-[16px]	backdrop-blur-md">
                <p className="text-[14px] font-semibold">
                  {renderCultureItemTitle(item)}
                </p>
                <p className="text-[14px] font-light">
                  {renderCultureItemDesc(item)}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};