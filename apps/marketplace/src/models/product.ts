import { Media, Translation } from "./general";

export type ProductAttributes = {
  translation: Translation;
}

export type ProductVariants = {
  sku: string;
  label: string;
  quantity: number;
}

export type Product = {
  id: string;
  image: Media;
  tags: string[] | null;
  product_name: string;
  variants: ProductVariants[];
  attribute: ProductAttributes;
};
