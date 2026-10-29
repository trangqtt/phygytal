import { Media } from "./general";

export enum CollectionType {
  LeJ = "lej",
  DanonNuoc = "danonnuoc",
  Hotieu = "hotieu",
}

export type Collection = {
  id: string;
  name: string;
  banner: Media;
  logo: Media;
  description: string;
}
