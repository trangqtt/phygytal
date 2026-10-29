import PrevIcon from "@/components/common/icons/PrevIcon";
import useDevice from "@/hooks/useDevice";
import Image from "next/image";
import {
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Navigation, Scrollbar, Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { ProductTag } from "@/models/Product";

interface CreationSwiperProps {
  currentCreationIndex: number;
  setCurrentCreationIndex: (creationName: any) => void;
  setIsExpandDetail: (value: SetStateAction<boolean>) => void;
  data: ProductTag[];
}

const ProductsCarousel: FunctionComponent<CreationSwiperProps> = ({
  currentCreationIndex,
  setCurrentCreationIndex,
  setIsExpandDetail,
  data,
}: CreationSwiperProps) => {
  const swiperRef = useRef<SwiperInstance | undefined>();
  const { isMobile, isTablet } = useDevice();
  const [firstTimeLoad, setFirstTimeLoad] = useState<boolean>(false);

  useEffect(() => {
    if (data.length && !firstTimeLoad) {
      setFirstTimeLoad(true);
    }
  }, [data]);

  const handleClick = () => {};

  return (
    <div className="flex items-center justify-between gap-[40px]">
      {!isMobile && (
        <div
          id="prev-btn"
          className="flex h-[40px] w-[40px] items-center justify-center rounded-full"
          onClick={() => {
            swiperRef.current && swiperRef.current.slidePrev();
          }}
        >
          <PrevIcon />
        </div>
      )}
      <Swiper
        modules={[Navigation, Scrollbar]}
        spaceBetween={24}
        slidesPerView={data.length >= 5 ? 5 : data.length}
        scrollbar={isMobile && true}
        onSwiper={(swiper: SwiperInstance) => {
          swiperRef.current = swiper;
        }}
        className=""
      >
        {data.map((item: ProductTag, index: number) => {
          return (
            <SwiperSlide key={index} className="cursor-pointer">
              <div
                className={`flex flex-col items-center justify-center gap-[8px] rounded-[12px] ${
                  !isMobile && !isTablet && "p-[8px]"
                } ${
                  currentCreationIndex == index &&
                  "border-[1px] border-solid border-lesslightgrey"
                }`}
                onClick={() => {
                  setCurrentCreationIndex(index);
                  setIsExpandDetail(true);
                }}
              >
                <img
                  src={
                    item?.product_detail.image?.url ||
                    item?.product_detail.three_dimension?.thumbnail_url
                  }
                  alt="Item"
                  width={isMobile ? 60 : 80}
                  height={isMobile ? 60 : 80}
                />
                {!isMobile && (
                  <p className="text-center">
                    {item?.product_detail?.product_name}
                  </p>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {!isMobile && (
        <div
          id="prev-btn"
          className="flex h-[40px] w-[40px] rotate-180 items-center justify-center rounded-full"
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
        >
          <PrevIcon />
        </div>
      )}
    </div>
  );
};

export default ProductsCarousel;
