import { useProductStory } from "@/hooks/useProductStory";
import { generateUrl } from "@/utils/url";
import { Dialog, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { CloseIcon } from "../common/icons";
import { Section } from "../common/SectionFullScreen/SectionFullScreen";
import { Languages } from "@/models/general";
import { MenuItem as MenuItemValue } from "@/models/menu";

interface MobileNavProps {
  open: boolean;
  onClose(): void;
}

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const normalizeLanguage = (language: string) => {
  switch (language) {
    case "vi":
      return "Vietnamese";
    case "en":
      return "English";
    default:
      return "Vietnamese";
  }
};

export default function MobileNav({ open = true, onClose }: MobileNavProps) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { pathname, query, asPath } = router;

  const { productDetail } = useProductStory();

  const menu = productDetail?.theme?.menu;
  const languages = productDetail?.theme?.languages;
  const lang = i18n.language === "vi" ? "vi" : "en";

  // useEffect(() => {
  //   document.addEventListener("touchstart", handleTouchStart, false);
  //   document.addEventListener("touchmove", handleTouchMove, false);
  // }, []);

  const onChangeLang = (event: SelectChangeEvent) => {
    router.push({ pathname, query }, asPath, {
      locale: event.target.value,
    });
  };

  const handleClickMenu = (e: any, target: string) => {
    const container = document.getElementById("snap-container");
    const targetEle = document.getElementById(target || Section.Home)!;
    const top = targetEle.offsetTop;
    if (container) {
      container.scrollTo({
        top,
        behavior: "smooth", // Add smooth scrolling effect
      });
    }
    onClose();
    e.stopPropagation();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <div className="relative h-full w-full touch-pan-y bg-black">
        <CloseIcon
          className="absolute left-[16px] top-[16px] block cursor-pointer"
          onClick={onClose}
        />
        <nav className="flex h-full w-full justify-center text-[#F0F0F0]">
          {!!menu?.length && (
            <ul className="flex flex-col gap-[40px] pt-[120px]">
              {menu.map((item: MenuItemValue, index: number) => (
                <li
                  key={index}
                  className="cursor-pointer text-[24px] font-normal leading-[30px]"
                  onClick={onClose}
                >
                  {item.url ? (
                    <Link href={item.url}>{item.title[lang]}</Link>
                  ) : (
                    <div onClick={(e) => handleClickMenu(e, item?.page_id)}>
                      {item.title[lang]}
                    </div>
                  )}
                </li>
              ))}

              {languages && languages?.length >= 2 && (
                <>
                  <li>
                    <Select
                      value={i18n.language}
                      label="Lang"
                      onChange={onChangeLang}
                      color="info"
                      sx={{
                        border: "1px solid white",
                        width: "100%",
                        color: "#fff",
                        background: "white",
                      }}
                      IconComponent={() => (
                        <ArrowDropDownIcon htmlColor="#fff" />
                      )}
                    >
                      {languages.map((lang, index) => (
                        <MenuItem key={index} value={lang}>
                          <span className="uppercase text-black">
                            {normalizeLanguage(lang)}
                          </span>
                        </MenuItem>
                      ))}
                    </Select>
                  </li>
                </>
              )}
            </ul>
          )}
        </nav>
      </div>
    </Dialog>
  );
}
