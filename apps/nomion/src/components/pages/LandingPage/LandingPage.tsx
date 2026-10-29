import Footer from "@/components/common/Footer";
import Layout from "@/components/common/Layout/Layout";
import Image, { StaticImageData } from "next/image";
import Ortho from "@/assets/images/ortho.png";
import TheHoTieu from "@/assets/images/thehotieu.png";
import Stone from "@/assets/images/da-non-nuoc.png";
import Hue from "@/assets/images/disanhue.jpeg";
import Lej from "@/assets/images/lej.png";
import Earth from "@/assets/images/earth.png";
import Earth2 from "@/assets/images/earth-2.png";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";
import clsx from "clsx";

const products: ProductItemProps[] = [
  {
    url: "/danonnuoc2023",
    image: Stone,
    name: "general.danonnuoc",
  },
  {
    url: "/hue",
    image: Hue,
    name: "general.hue",
    objectFit: "contain",
  },
  {
    url: "https://vi.thehotieu.com/",
    image: TheHoTieu,
    name: "The Hồ Tiêu",
    objectFit: "contain",
    target: "_blank",
  },
  {
    url: "/lej",
    image: Lej,
    name: "Le J' Cafe",
  },
  {
    url: "https://ortho.fashion",
    image: Ortho,
    name: "general.ortho",
    target: "_blank",
  },
];

interface ProductItemProps {
  image: StaticImageData;
  name: string;
  url: string;
  objectFit?: any;
  target?: string;
}

function ProductItem({
  image,
  name,
  url,
  objectFit = "cover",
  target,
}: ProductItemProps) {
  const { t } = useTranslation();
  return (
    <div className="mb-[50px] h-[300px] px-[22px] lg:w-1/3">
      <Link href={url} target={target || "_self"}>
        <div className="relative h-[250px]">
          <img
            src={image.src}
            alt={name}
            className={`object-${objectFit} h-full w-full`}
          />
        </div>
        <p className="mt-[10px] border-t-[1px] border-solid border-[#E4E4E4] pt-[8px] text-[20px] font-bold leading-[26px] text-black">
          {t(name)}
        </p>
      </Link>
    </div>
  );
}

export default function LandingPage() {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <div className="black-one m-auto max-w-[1440px] px-[24px] py-[80px] lg:px-[40px]">
        <div className="section flex flex-col gap-8 lg:flex-row-reverse">
          <div className="flex flex-1 items-center justify-center lg:pb-[120px]">
            <div className="relative h-full w-full shrink-0 grow lg:max-h-[600px] lg:w-1/2 lg:max-w-[800px]">
              <img
                src={Earth.src}
                alt="kardia"
                style={{ objectFit: "contain" }}
                className="h-full"
              />
            </div>
          </div>
          <div className="flex flex-col justify-start lg:justify-center lg:pb-[120px]">
            <h1 className="text-[24px] font-bold text-[#e2e2e2] underline underline-offset-[14px] lg:text-[52px] lg:leading-[72px]">
              {t("general.phygital")}
            </h1>
            <p className="mt-[20px] text-[20px] font-medium text-[#ececec] lg:w-[550px] lg:text-[44px] lg:leading-[60px]">
              {t("general.phygitalDescription1")}
            </p>
          </div>
        </div>

        <div className="mt-[16px] flex flex-col lg:mt-0 lg:flex-row">
          <div className="video lg:w-1/2">
            <img
              src={Earth2.src}
              alt="kardia"
              style={{ objectFit: "contain" }}
              className="h-full"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="flex flex-col text-[24px] font-normal leading-[28px] lg:pt-[60px] lg:text-[46px] lg:leading-[55px]">
              {parse(t("general.howToDigitalize"))}
            </div>
            <div className="mt-[32px] text-[14px] leading-[18px] lg:text-[18px] lg:leading-[30px]">
              <p className="mb-4">
                Giải pháp vật lý số Nomion được phát triển bởi công ty Phygital
                Labs giúp các doanh nghiệp gia tăng giá trị sản phẩm,{" "}
                <b>nâng cao độ nhận diện thương hiệu</b> và{" "}
                <b>tiếp cận đa dạng tệp khách hàng trong thời đại số.</b> Cụ
                thể, chúng tôi:
              </p>
              <p className="mb-2">1. Tạo định danh số duy nhất</p>
              <p className="mb-2">
                2. Xác thực nguồn gốc, chứng thực tính độc bản và lan tỏa câu
                chuyện toàn cầu
              </p>
              <p className="mb-2">
                3. Loại bỏ các giới hạn địa lý, cho phép tương tác đa chiều với
                các công cụ kết nối thực-số
              </p>
              <p className="mb-2">
                4. Tạo ra một nền kinh tế thực - số liền mạch
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="white-one w-full bg-white px-[8x] py-[24px] lg:px-[24px] lg:py-[80px]">
        <div className="m-auto flex max-w-[1440px] flex-col flex-wrap lg:flex-row">
          <div className="flex flex-row justify-center gap-[8px] px-[22px] text-[24px] font-bold uppercase leading-[72px] text-black lg:h-[300px] lg:w-1/3 lg:flex-col lg:gap-0 lg:text-[67px]">
            {i18n.language === "vi" ? (
              <>
                <p className="mb-[20px] text-black">{t("general.projects")}</p>
                <p className="text-[#4a4a4a]">{t("general.our")}</p>
              </>
            ) : (
              <>
                <p className="text-[#4a4a4a]">{t("general.our")}</p>
                <p className="text-black">{t("general.projects")}</p>
              </>
            )}
          </div>

          {products.map((product, index) => (
            <ProductItem key={index} {...product} />
          ))}
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
