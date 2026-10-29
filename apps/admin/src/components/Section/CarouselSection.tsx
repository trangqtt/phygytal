import { FC, useState } from 'react';
import SectionWrapper, { SectionProps } from './SectionWrapper';
import { Fields, ModelField } from '../../model/ProductModelEntity';

const fieldArr: ModelField[] = [
  {
    label: 'Title',
    key: 'title',
    type: 'string',
    is_array: false,
  },
  {
    label: 'Background',
    key: 'background',
    type: 'image',
    is_array: false,
  },
  {
    label: 'List images',
    key: 'list_images',
    type: 'object',
    is_array: true,
    sub_fields: [
      {
        label: 'Title',
        key: 'title',
        type: 'string',
        is_array: false
      },
      {
        label: 'Description',
        key: 'description',
        type: 'string',
        is_array: false
      },
      {
        label: 'Poster',
        key: 'image',
        type: 'image',
        is_array: false
      },
    ],
  },
];

const CarouselSection: FC<SectionProps> = ({ dataFields }) => {
  return <SectionWrapper fields={fieldArr} productModelFields={dataFields} />;
};

export default CarouselSection;
