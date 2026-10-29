export interface Media {
  type: "image" | "video" | "3D" | "audio";
  url: string;
  thumbnail_url: string;
}

export enum Languages {
  En = "en",
  Vi = "vi",
}

export type Translation = Record<Languages, any>;

export enum PageSteps {
  Splash = "splash",
  Video = "video",
  Normal = "normal",
}
export enum OS {
  Android = "Android",
  iOS = "iOS",
}
