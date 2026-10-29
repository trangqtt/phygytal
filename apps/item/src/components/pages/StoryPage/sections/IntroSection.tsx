import LinearBackground from "@/components/common/LinearBackground";
import React from "react";
import Image from "next/image";
import AboutLeJ from "@/assets/images/about-lej.png";
import SectionTitle from "./SectionTitle";

export default function IntroSection() {
  return (
    <div className="relative h-full w-full">
      <img src={AboutLeJ.src} alt="Lej Coffee" className="h-full w-full" />
      <LinearBackground className="z-[1]" />

      <div className="absolute z-[2] flex h-full w-full flex-col items-center p-[40px] pt-[120px]">
        <SectionTitle title="Giống THA1" />
        <div className=" text-[16px] font-light leading-[24px]">
          <p>
            THA1 là con cháu thế hệ F5 của con lai TN1 (lai giữa vật liệu KH3-1
            có nguồn gốc từ Ethiopia) và Catimor để lai tạo ra một giống cà-phê
            với năng suất cao, chống chọi bệnh tật và chất lượng tốt.
          </p>
          <br />
          <p>
            Những năm gần đây, THA1 trở thành một trong những loại cà-phê có
            hương vị nổi bật tại Việt Nam và giành được nhiều giải thưởng của
            Hiệp hội cà-phê đặc sản, THA1 được xem là giống cà-phê mới đầy triển
            vọng và dần được canh tác rộng rãi hơn ở các vùng canh tác cà-phê
            Việt Nam.
          </p>
        </div>
      </div>
    </div>
  );
}
