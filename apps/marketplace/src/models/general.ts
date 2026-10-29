export type Media = {
  thumbnail_url: string;
  type: "image" | "video" | "3D";
  url: string;
};

export enum Languages {
  En = 'en',
  Vi = 'vi',
}

export type Translation = Record<Languages, any>

export type GoogleAuthResponse = {
  errorCode: string
  data: any
}
