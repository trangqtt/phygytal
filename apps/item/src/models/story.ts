import { Organization } from "./organization";
import { Owner } from "./owner";
import { Author, Product } from "./product";
import { Theme } from "./theme";

export interface StoryResponse {
  mapping_detail?: {
    external_url?: string;
    claimable?: boolean;
  };
  product_detail?: Product;
  product_item_detail: {
    product_item_id?: string;
    item_index?: number;
    total_like?: number;
    claimable?: boolean;
  };
  owner_detail: Owner;
  organization_detail: Organization;
  template_detail: Theme;
  homepage_detail: {
    name?: string;
    url_link?: string;
    attributes?: {
      [key: string]: any;
    };
    type?: string;
  };
  digital_asset_detail: {
    chain: string;
    collection_id: string;
    collection_name: string;
    contract_address: string;
    digital_asset_id: string;
    standard: string;
    status: "Active" | "Pending" | "",
    token_id: number;
  },
  author: Author;
}
