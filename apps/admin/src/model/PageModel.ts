import { PageValue } from "../components/Theme/CreateTheme";
import { MenuModel } from "./ProductStoryModel";

export interface PageModel {
  type: string; // page type
  url_link?: string;
  name: string;
  attributes: any[];
  values: any;
  values_model: PageValue[],
  translations: Record<string, any>;
}

export interface ThemeModel {
  id?: string;
  menu: MenuModel[];
  pages: any[];
}