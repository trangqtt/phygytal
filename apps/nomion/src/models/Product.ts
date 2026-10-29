import { Media, Translation } from "@/models/General";

export enum ProductOnchainStatus {
  Active = "Active",
  Pending = "Pending",
  Inactive = 'Inactive',
}

export enum ProductType {
  Sculpture = 'sculpture',
  Coffee = 'coffee',
  Ortho = 'ortho',
  Astronaut = 'astronaut',
}

export interface Stone {
  clarity: string;
  color: string;
  image: Media;
  name: string;
  origin: string;
  properties: string;
  rarity: string;
}

export interface Village {
  name: string;
  location_video: Media;
}

export interface ProductAttributes {
  sculpture_size: string;
  sculpture_time: string;
  sculpture_weight: string;
  sculpture_width: string;
  sculpture_height: string;
  sculpture_length: string;
  craftsman: ProductCraftman;
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
  process: string;
  sweet: string;
  varietal: string;
  description: string;
}

export interface Product {
  id: string;
  image: Media;
  three_dimension: Media;
  video: Media;
  tags: string[];
  org_id: string;
  origin: string;
  product_name: string;
  rating_score: number;
  status: ProductOnchainStatus;
  template_id: string;
  total_item: number;
  type: ProductType;
  created_at: string;
  updated_at: string;
  attribute: ProductAttributes;
}


export interface ProductCraftman {
  name: string;
  avatar: {
    url: string;
  };
  experience_year: any;
  artworks_count: number;
  phone: string;
  email: string;
  description: string;
}

export interface Author {
  id: string;
  name: {
    vi: string;
    en: string;
  };
  contact_name: string;
  phone: string;
  avatar: Media;
  status: string;
  experience_year: string;
  artworks_count: number;
  description: string;
  email: string;
}

export interface ProductTag {
  tag_id: string;
  token_id: number;
  total_like: number;
  standard: string;
  product_item_id: string;
  chain: string;
  collection_id: string;
  collection_name: string;
  contract_address: string;
  digital_asset_status: ProductOnchainStatus;
  product_detail: Product;
  author: Author;
}
