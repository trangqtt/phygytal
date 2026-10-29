export interface FormDataObject {
  [key: string]: any;
};

export interface SelectInputOption {
  label: string;
  value: string;
}

export enum MediaType {
  Image = 'image',
  Video = 'video',
  ThreeD = '3D',
}

export interface Media {
  type: MediaType;
  url: string;
  thumbnail_url: string;
}

export enum Languages {
  En = 'en',
  Vi = 'vi',
}

export type Translation = Record<Languages, any>

export type TableColumn = {
  label: string;
}

export enum FormType {
  CREATE = 'create',
  UPDATE = 'update',
}
