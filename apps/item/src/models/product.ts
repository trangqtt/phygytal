import { CarouselSlideItem } from "@/components/common/PageSlides/Carousel";
import { Media, Translation } from "./general";
import { CarouselItemV2, Theme } from "./theme";

export enum ProductOnchainStatus {
  Active = "Active",
  Pending = "Pending",
  Inactive = "Inactive",
}

export enum ProductType {
  Sculpture = "sculpture",
  Coffee = "coffee",
  Ortho = "ortho",
  Astronaut = "astronaut",
  Newspaper = "newspaper",
  Tomb = "tomb",
}

export interface Stone {
  image: Media;
  origin: string;
  clarity: string;
  color: string;
  name: string;
  properties: string;
  rarity: string;
  translation: Translation;
}

export interface Village {
  name: string;
  location_video: Media;
}

export interface ProductAttributes {
  sculpture_time: string;
  sculpture_weight: string;
  sculpture_pedestal: string;
  sculpture_size: string;
  sculpture_pedestal_size: string;
  sculpture_rank: string;
  craftsman: Author;
  stone: Stone;
  village: Village;
  translation: Translation;
  acidity: string;
  bitter: string;
  brewing_time: string;
  country_image: Media;
  country_name: string;
  country_video: Media;
  farm_area: string;
  farm_name: string;
  farm_video: Media;
  farm_height: string;
  link_buy_product: string;
  processes: CarouselItemV2[];
  sweet: string;
  varietal: string;
  description?: string;
  contact_name?: string;
  letter: string;
  histories: CarouselItemV2[];
  cultures: CarouselItemV2[];
}

export type PageValue = {
  key: string;
  type: string;
  is_product_data: boolean;
  value: string | number | boolean | Media | string[] | object;
};

export type PageType = "home" | "imagetext" | "carousel" | "author" | "contact";

export interface Page {
  id?: string;
  name: string;
  type: PageType;
  values: Record<string, PageValue>;
  values_model: PageValue[];
  has_animation: boolean;
  attributes?: any;
}

export interface Product {
  id: string;
  image: Media;
  three_dimension: Media;
  video: Media;
  org_id: string;
  origin: string;
  product_name: string;
  rating_score: number;
  status: ProductOnchainStatus;
  theme_id: string;
  total_item: number;
  type: ProductType;
  created_at: string;
  updated_at: string;
  attribute: ProductAttributes;
  craftman: Author;
  theme_pages: Page[];
  theme: Theme;
}

export interface Author {
  name: Translation;
  avatar: {
    url: string;
  };
  experience_year: any;
  artworks_count: number;
  phone: string;
  email: string;
  description: string;
  translation: Translation;
  highlight_artworks: any;
  prizes: any;
  contact_name?:string;
}
