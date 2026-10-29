import { IMG_DESCRIPTION, IMG_DESCRIPTION_TEXT } from "@/assets";
import CustomHeading from "@/components/common/HeadingCustom";
import ButtonCustom from "@/components/common/ButtonCustom";
import NextIcon from "@/components/common/icons/NextIcon";

const Description = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center w-full">
      <img
        className="lg:w-1/2 h-[35vh] lg:h-[100vh] lg:object-cover object-contain"
        src={IMG_DESCRIPTION}
        alt="Image Description"
      />
      <div className="flex flex-col lg:px-16 lg:items-start justify-center items-center lg:w-1/2 space-y-8 pt-10">
        <div className="space-y-4 w-fit text-xl">
          <CustomHeading className="text-secondary">Về dự án</CustomHeading>
          <CustomHeading>TẦM CHÂN</CustomHeading>
        </div>
        <img
          className="h-[200px] w-3/4 lg:w-auto object-contain"
          src={IMG_DESCRIPTION_TEXT}
          alt="Image Description Text"
        />
        <p className="text-neutral lg:text-base text-sm lg:w-full w-3/4">
          Dự án là kết quả hợp tác giữa start-up công nghệ Phygital Labs và
          Trung tâm thông tin UNESCO (UNET). Tầm Chân sử dụng các công nghệ “vật
          lý số” do công ty Phygital Labs phát triển nhằm lưu giữ, trưng bày,
          quảng bá và ứng dụng văn hóa truyền thống Việt Nam vào cuộc sống đương
          đại.
        </p>
        <ButtonCustom className="flex items-center">
          <>
            TÌM HIỂU THÊM
            <div className="pl-1">
              <NextIcon />
            </div>
          </>
        </ButtonCustom>
        <div></div>
      </div>
    </div>
  );
};

export default Description;
