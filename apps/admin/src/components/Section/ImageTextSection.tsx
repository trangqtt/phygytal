import { FC } from 'react';
import { ModelField } from '../../model/ProductModelEntity';
import SectionWrapper from './SectionWrapper';

const fieldArr: ModelField[] = [
  {
    label: "Title",
    key: "title",
    type: "string",
    is_array: false,
  },
  {
    label: "Image",
    key: "image",
    type: "image",
    is_array: false,
  },
  {
    label: "Text",
    key: "text",
    type: "html",
    is_array: false,
  },
  {
    label: "Background",
    key: "background",
    type: "image",
    is_array: false,
  },
]

export type ImageTextProps = {
  dataFields: ModelField[];
}

const ImageText: FC<ImageTextProps> = ({ dataFields }) => {
  return (
    <SectionWrapper fields={fieldArr} productModelFields={dataFields} />
  );
};

export default ImageText;
