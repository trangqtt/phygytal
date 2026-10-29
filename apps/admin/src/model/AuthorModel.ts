import { Media, Translation } from "./general";

export interface HighlightArtWorks {
  description: Translation,
  image_url: string;
}

export interface AuthorModel {
  id: string;
  name: {
    vi: string;
    en: string;
  };
  contact_name: string;
  avatar: Media;
  artworks_count: string;
  email: string;
  experience_year: string;
  phone: string;
  type: 'person' | 'organization';
  translation: Translation;
  highlight_artworks: HighlightArtWorks;
}
