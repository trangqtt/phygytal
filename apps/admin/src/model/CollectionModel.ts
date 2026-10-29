import { Media } from "./general";

export interface Collection {
  id?: string;
  name: string;
  description: string;
  logo: Media;
  banner: Media;
  created_at: string;
  updated_at: string;
}
