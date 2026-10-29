import HeadingCustom from "@/components/common/HeadingCustom";
import { IMG_PARTNER_1, IMG_PARTNER_2, IMG_PARTNER_3 } from "@/assets";

const Partner = () => {
  return (
    <div className="flex lg:h-full flex-col justify-center items-center space-y-10 h-[75vh]">
      <HeadingCustom className="text-xl" center>
        Đơn vị đồng hành
      </HeadingCustom>
      <div className="flex flex-col lg:flex-row justify-center gap-3 w-3/4">
        <img src={IMG_PARTNER_1} alt="Partner 1" />
        <img src={IMG_PARTNER_2} alt="Partner 2" />
        <img src={IMG_PARTNER_3} alt="Partner 3" />
      </div>
    </div>
  );
};

export default Partner;
