import { IMG_NGHE } from "@/assets";
import HeadingCustom from "@/components/common/HeadingCustom";

const BackgroundStory = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center  w-full h-full">
      <div className="lg:w-1/2 flex flex-col justify-center space-y-8 w-3/4 lg:pl-[15%]">
        <div className="space-y-4">
          <HeadingCustom className="text-secondary text-xl">
            VÌ SAO LÀ
          </HeadingCustom>
          <HeadingCustom className="text-left text-xl">NGHÊ?</HeadingCustom>
        </div>
        <div className="relative text-neutral lg:text-base text-sm lg:w-[110%] space-y-5">
          <p>
            Dự án Tầm Chân khởi động bằng những nghiên cứu nhằm đưa hình ảnh
            Nghê – một linh thú thuần Việt – đi vào cuộc sống đương đại.
          </p>
          <p>
            Chúng tôi chọn Nghê Việt vì tính biểu tượng của loài linh thú này.
            Số phận của Nghê Việt đại diện cho những nỗ lực gìn giữ và bảo vệ
            văn hóa truyền thống Việt Nam trong thời đại toàn cầu hóa.
          </p>
        </div>
      </div>
      <img
        className="lg:w-1/2 lg:h-[100vh] h-1/2 object-contain px-5"
        src={IMG_NGHE}
        alt="Image back ground story"
      />
    </div>
  );
};

export default BackgroundStory;
