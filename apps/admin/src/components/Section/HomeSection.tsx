import { FC } from 'react';
import { ModelField } from '../../model/ProductModelEntity';
import SectionWrapper from './SectionWrapper';

const fieldArr: ModelField[] = [
  { 
    label: 'Asset 3D',
    key: 'asset_three_dimension',
    type: '3D',
    is_array: false,
  },
  {
    label: 'Video intro',
    key: 'video',
    type: 'video',  
    is_array: false,
  },
  {
    label: 'Name',
    key: 'name',
    type: 'string',
    is_array: false,
  },
  {
    label: 'Author label',
    key: 'author_label',
    type: 'string',
    is_array: false,
  },
  {
    label: 'Is show NFT',
    key: 'show_nft',
    type: 'boolean',
    is_array: false,
  },
  {
    label: 'Tags',
    key: 'tags',
    type: 'string',
    is_array: true,
  },
  {
    label: 'Meta Info',
    key: 'meta_info',
    type: 'object',
    is_array: false,
    sub_fields: [
      {
        label: 'Reward',
        key: 'reward',
        type: 'string',
        is_array: false,
      },
      {
        label: 'Product time',
        key: 'product_time',
        type: 'string',
        is_array: false,
      },
      {
        label: 'Product weight',
        key: 'product_weight',
        type: 'string',
        is_array: false,
      },
      {
        label: 'Product size',
        key: 'product_size',
        type: 'string',
        is_array: false,
      },
      {
        label: 'Product pedestal size',
        key: 'product_pedestal_size',
        type: 'string',
        is_array: false,
      },
    ],
  },
];

export type HomeSectionProps = {
  dataFields: ModelField[];
};

const HomeSection: FC<HomeSectionProps> = ({ dataFields }) => {
  return <SectionWrapper fields={fieldArr} productModelFields={dataFields} />;
};

export default HomeSection;
