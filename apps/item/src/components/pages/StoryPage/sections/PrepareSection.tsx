import Image from "next/image";
import SectionTitle from "./SectionTitle";
import LocationImage from "../images/rang-1.png";
import LinearBackground from "@/components/common/LinearBackground/LinearBackground";

export default function PrepareSection() {
  return (
    <div className="flex h-full w-full flex-col px-[16px] pt-[90px]">
      <LinearBackground alpha={0.7} className="z-[1]" />
      <div className="absolute top-0 z-0 h-full w-full">
        <img
          src={LocationImage.src}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="z-[2] h-full w-full">
        <SectionTitle title="Phương pháp sơ chế" className="" />
        <div
          className="summary flex flex-col gap-[4px] rounded-lg border-[1px]
          border-solid border-white px-[24px] py-[8px] text-center"
        >
          <p className="text-[16px] font-semibold leading-[24px]">
            Anaerobic natural 240hr
          </p>
          <p className="text-[14px] font-light leading-[22px]">
            Cà-phê được lên men trong tổng thời gian là 240 tiếng chia làm 02
            giai đoạn
          </p>
        </div>
        <div className="step mt-[24px]">
          <div className="border-l-solid flex flex-col gap-[12px] border-l-[1px] border-l-white pb-[16px] pl-[16px] text-[14px] leading-[22px]">
            <p className="font-bold">Giai đoạn 1</p>
            <p className="font-light">
              Lên men yếm khí trái tươi trong 72 giờ để cà-phê lên men mạnh. Sau
              đó, cà-phê được phơi dưới ánh nắng trực tiếp trong 02 ngày để làm
              héo bề mặt quả cà-phê và ngay lập tức hạn chế quá trình lên men.
            </p>
          </div>
          <div className="border-l-solid flex flex-col gap-[12px] border-l-[1px] border-l-white pb-[16px] pl-[16px] text-[14px] leading-[22px]">
            <p className="font-bold">Giai đoạn 2</p>
            <p className="font-light">
              Cà-phê sau khi phơi làm mất độ ẩm được tiếp tục lên men trong
              thùng kín ở môi trường thoáng mát trong 168 tiếng để tiếp tục lên
              men sâu.
              <br />
              Cà-phê sau quá trình lên men sẽ được phơi trong bóng râm trong 20
              ngày để đạt được độ ẩm cần thiết.
            </p>
          </div>
        </div>
        <div className="summary text-center text-[16px] font-semibold leading-[24px]">
          “Cà phê được rang nhẹ (light)”
        </div>
      </div>
    </div>
  );
}
