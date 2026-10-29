import {
  daNonNuocBanner,
  hotieuBanner,
  hueBanner,
  lejBanner,
  nhiepAnhBanner,
  orthoBanner,
} from "@/assets/images";
import GreaterIcon from "@/assets/images/GreaterIcon.png";
import clsx from "clsx";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export type ProductItemProps = {
  image: string;
  name: string;
  url: string;
  objectFit?: any;
  blur?: any;
  size?: any;
  target?: string;
  titleHover?: string;
  descHover?: string;
  museumUrl?: string;
  isCommingSoon: boolean;
};

const products: ProductItemProps[] = [
  {
    url: "https://ortho.fashion",
    image: orthoBanner,
    name: "general.ortho",
    target: "_blank",
    titleHover: "general.orthoHoverTitle",
    descHover: "general.orthoHoverDesc",
    isCommingSoon: false,
  },
  {
    url: "/lej",
    image: lejBanner,
    name: "Le J' Cafe",
    titleHover: "general.lejHoverTitle",
    descHover: "general.lejHoverDesc",
    isCommingSoon: false,
  },
  {
    url: "/danonnuoc2023",
    image: daNonNuocBanner,
    name: "general.danonnuoc",
    titleHover: "general.danonnuocHoverTitle",
    descHover: "general.danonnuocHoverDesc",
    museumUrl:
      "https://www.spatial.io/s/Nomion-Da-Non-Nuoc-Gallery-64df8d83ace3fe3b9c26a4c0?share=0",
    isCommingSoon: false,
  },
  {
    url: "https://vi.thehotieu.com/",
    image: hotieuBanner,
    name: "The Hồ Tiêu (Coming Soon)",
    objectFit: "contain",
    blur: "blur",
    target: "_blank",
    isCommingSoon: true,
  },
  {
    url: "/hue",
    image: hueBanner,
    name: "general.hue",
    objectFit: "contain",
    blur: "blur",
    isCommingSoon: true,
  },
  {
    url: "https://ortho.fashion",
    image: nhiepAnhBanner,
    name: "general.nghethuat",
    target: "_blank",
    blur: "blur",
    isCommingSoon: true,
  },
];

function ProductItem({
  image,
  name,
  url,
  objectFit = "cover",
  blur,
  size,
  target,
  titleHover,
  descHover,
  museumUrl,
  isCommingSoon,
}: ProductItemProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-[50px] flex h-full justify-center px-[24px] lg:w-1/2">
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute top-2 z-10 w-fit rounded-6xl bg-gray-transparent md:top-6">
          <p className="px-[20px] py-[4px] text-center text-base font-semibold md:text-xl">
            {t(name)}
          </p>
        </div>
          <img
            src={image}
            alt={name}
            className={clsx(
              `object-${objectFit} h-full w-full rounded-lg md:max-w-lg ${blur}`,
              size && `${size}`
            )}
          />
        <div
          className={clsx(
            "flex w-full flex-col gap-3 rounded-lg bg-gray-transparent-2 p-4 transition-all duration-300 hover:opacity-100 md:absolute md:bottom-2 md:z-10 md:h-fit md:w-[95%] md:opacity-0",
            isCommingSoon && "hidden"
          )}
        >
          <p className="font-medium">{t(titleHover ?? "")}</p>
          <p className="h-5/6 overflow-scroll text-[#BFBFBF] md:h-full">
            {t(descHover ?? "")}
          </p>
          <div
            className={clsx(
              "flex gap-3 md:justify-start",
              (!museumUrl || !url) && "justify-center"
            )}
          >
            <div className="flex items-center rounded-lg border px-2 py-2 md:gap-2 md:px-4">
              <Link
                href={url}
                target={target}
                className="text-sm font-semibold"
              >
                {t("general.library")}
              </Link>
              <img
                src={GreaterIcon.src}
                alt="GreaterIcon"
                className="h-4 w-4"
              />
            </div>
            {museumUrl && (
              <div className="flex items-center rounded-lg border px-2 py-2 md:gap-2 md:px-4">
                <Link
                  href={museumUrl}
                  target="_blank"
                  className="text-sm font-semibold"
                >
                  {t("general.museum")}
                </Link>
                <img
                  src={GreaterIcon.src}
                  alt="GreaterIcon"
                  className="h-4 w-4"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const ProductSection = () => {
  return (
    <div
      className={clsx(
        "white-one relative w-full overflow-x-clip px-2 py-6 lg:px-6 lg:py-20"
      )}
    >
      <div className="md:absolute md:top-[100px] md:left-[500px] md:h-[1440px] md:w-full md:rounded-full md:bg-gradient-blue"></div>
      <div className="m-auto flex max-w-[1440px] flex-col flex-wrap lg:flex-row">
        {products.map((product, index) => (
          <ProductItem key={index} {...product} />
        ))}
      </div>
    </div>
  );
};
