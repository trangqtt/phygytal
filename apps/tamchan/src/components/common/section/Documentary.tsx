"use client";

import HeadingCustom from "@/components/common/HeadingCustom";
import ButtonCustom from "@/components/common/ButtonCustom";
import NextIcon from "@/components/common/icons/NextIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  IMG_NGHE_DOCUMENTARY_1,
  IMG_NGHE_DOCUMENTARY_2,
  IMG_NGHE_DOCUMENTARY_3,
} from "@/assets";
import useDevice from "@/hooks/useDevice";

interface DocumentaryItemProps {
  title: string;
  author: string;
  image: string;
}

const DocumentItem: DocumentaryItemProps[] = [
  {
    title: "Nghê Việt tinh tuyển",
    author: "Chủ biên: Trần Hậu Yên Thế",
    image: IMG_NGHE_DOCUMENTARY_1,
  },
  {
    title: "Các con vật linh",
    author: "Chủ biên: Đinh Hồng Hải",
    image: IMG_NGHE_DOCUMENTARY_2,
  },
  {
    title: "Phác họa Nghê - Gã linh vật bên rìa",
    author: "Chủ biên: Trần Hậu Yên Thế",
    image: IMG_NGHE_DOCUMENTARY_3,
  },
];

const DocumentaryItem = ({ title, author, image }: DocumentaryItemProps) => {
  return (
    <div>
      <img src={image} alt="Documentary" className="max-h-[300px]" />
      <div className="text-white p-2 lg:block hidden">
        <p className="font-medium">{author}</p>
        <p className="font-light">{title}</p>
      </div>
    </div>
  );
};

const Documentary = () => {
  const { isMobile } = useDevice();

  return (
    <div className="lg:h-full w-full flex flex-col justify-center align-center space-y-5 lg:py-0 py-10">
      <div className="space-y-4">
        <HeadingCustom center className="text-secondary">
          Tư liệu
        </HeadingCustom>
        <HeadingCustom className="text-xl" center>
          nghiên cứu về nghê
        </HeadingCustom>
      </div>
      <div className="w-full relative">
        {/* <div className="bg-gradient-linear rotate-180 absolute w-36 h-full top-0 -left-2 z-20"></div> */}
        <Swiper
          className="mySwiper"
          slidesPerView={isMobile ? 1.3 : 4}
          spaceBetween={24}
          centeredSlides={true}
          loop={true}
          navigation={true}
          autoplay={{
            delay: 2500,
          }}
          modules={[Autoplay, Navigation]}>
          {[...DocumentItem, ...DocumentItem, ...DocumentItem].map(
            (item, index) => (
              <SwiperSlide key={index}>
                <DocumentaryItem {...item} />
              </SwiperSlide>
            )
          )}
        </Swiper>
        {/* <div className="bg-gradient-linear absolute w-36 h-full top-0 -right-2 z-20"></div> */}
      </div>
      <div className="w-100 flex justify-center">
        <ButtonCustom className="flex">
          <>
            KHÁM PHÁ THÊM
            <div className="pl-1">
              <NextIcon />
            </div>
          </>
        </ButtonCustom>
      </div>
    </div>
  );
};

export default Documentary;
