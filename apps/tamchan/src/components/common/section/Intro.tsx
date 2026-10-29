import { IMG_BACKGROUND } from "@/assets";
import HeadingCustom from "@/components/common/HeadingCustom";
import ButtonCustom from "@/components/common/ButtonCustom";

const Intro = () => {
  return (
    <div
      className="flex flex-col justify-center align-center items-center w-full h-full bg-cover bg-center text-center mb-10"
      style={{ backgroundImage: `url(${IMG_BACKGROUND})` }}>
      <div className="flex flex-col h-[85vh] align-center justify-center gap">
        <div className="-mt-28 space-y-7">
          <HeadingCustom className="text-4xl">Tầm Chân</HeadingCustom>
          <ButtonCustom className="font-semibold">
            PHYGITAL LABS x UNET
          </ButtonCustom>
          <div className="lg:text-3xl text-xl text-secondary">
            Ứng dụng tiến bộ công nghệ <div className="my-4" />
            vào bảo tồn phát triển và văn hoá Việt Nam
          </div>
        </div>
      </div>
      <div className="absolute bottom-[75px]">
        <div className="text-secondary">Bắt đầu với</div>
        <HeadingCustom className="mt-3 lg:text-sm">nghê văn miếu</HeadingCustom>
      </div>
    </div>
  );
};
export default Intro;
