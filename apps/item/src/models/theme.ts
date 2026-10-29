import { Multilang } from "@/components/common/PageSlides/Carousel";
import { MenuItem } from "./menu";
import { Page } from "./page";
import { Media } from "./general";

export interface Theme {
  name?: string;
  pages?: Page[];
  menu?: MenuItem[];
  languages?: string[];
}

export type CarouselItemV2 = {
  description: Multilang;
  title: Multilang;
  imageUrl: string | Media;
  image_url: string | Media;
};
