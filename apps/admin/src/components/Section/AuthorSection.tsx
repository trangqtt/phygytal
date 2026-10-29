import { FC } from 'react';
import { ModelField } from '../../model/ProductModelEntity';
import SectionWrapper from './SectionWrapper';

const fieldArr: ModelField[] = [
  {
    label: "Name",
    key: "name",
    type: "string",
    is_array: false,
  },
  {
    label: "Avatar",
    key: "avatar",
    type: 'image',
    is_array: false,
  },
  {
    label: "Experience year",
    key: "experience_year",
    type: "string",
    is_array: false,
  },
  {
    label: "Artworks count",
    key: "artworks_count",
    type: "string",
    is_array: false,
  },
  {
    label: "Quote",
    key: "quote",
    type: "html",
    is_array: false,
  }
]

export type AuthorSectionProps = {
  dataFields: ModelField[];
}

const AuthorSection: FC<AuthorSectionProps> = ({ dataFields }) => {
  return (
    <SectionWrapper fields={fieldArr} productModelFields={dataFields} />
  );
};

export default AuthorSection;
