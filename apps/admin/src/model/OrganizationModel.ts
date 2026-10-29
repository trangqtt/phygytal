import { Media } from './general';

export interface OrganizationModel {
  id?: string;
  org_name: string;
  logo: Media;
  org_tag_name: string;
}
