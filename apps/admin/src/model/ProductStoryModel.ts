export interface ProductStoryModel {
  menu: MenuModel[];
  language: LanguageModel[];
}

export interface MenuModel {
  title: string;
  url: string;
}

export interface LanguageModel {
  label: string;
  value: string;
}
