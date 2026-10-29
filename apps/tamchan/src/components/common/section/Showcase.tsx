import HeadingCustom from "@/components/common/HeadingCustom";
import NextIcon from "@/components/common/icons/NextIcon";
import ButtonCustom from "@/components/common/ButtonCustom";
import { SHOWCASE_IMAGES } from "@/constant/ShowcaseImages";

const Showcase = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center align-center space-y-4 lg:py-0 py-10">
      <HeadingCustom className="text-xl" center>
        HÌNH ẢNH, VIDEO
      </HeadingCustom>
      <div className="flex flex-wrap">
        {SHOWCASE_IMAGES.map(({ src, id, alt }) => (
          <img key={id} className="w-1/4" src={src} alt={alt} />
        ))}
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

export default Showcase;
