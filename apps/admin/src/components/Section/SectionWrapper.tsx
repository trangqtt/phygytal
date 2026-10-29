import SectionForm from './SectionForm';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../common/shadcn-ui-kit/accordion';
import { FC, useEffect, useState } from 'react';
import { ModelField } from '../../model/ProductModelEntity';
import DynamicTextInput from '../common/form-ui-kit/DynamicTextInput';
import TextInput from '../common/form-ui-kit/TextInput';
import RichTextEditor from '../common/form-ui-kit/RichTextEditor';
import { InputTypeEnum } from '../../enum';
import CheckboxInput from '../common/form-ui-kit/CheckboxInput';
import UploadImage from '../common/form-ui-kit/UploadImage';
import UploadVideo from '../common/form-ui-kit/UploadVideo';
import Upload3D from '../common/form-ui-kit/Upload3d';
import DynamicObjectInput from '../common/form-ui-kit/DynamicObjectInput';
import ObjectInput from '../common/form-ui-kit/ObjectInput';
import FormRow from '../common/form-ui-kit/FormRow';
import SelectInput from '../common/form-ui-kit/SelectInput';
import { renderField } from '../common/form-ui-kit/RenderFieldObject';
import { useFormContext } from 'react-hook-form';

export interface SectionProps {
  dataFields: ModelField[];
}

export type SectionWrapperProps = {
  fields: ModelField[];
  productModelFields: ModelField[];
};

export const languagesOptions = [
  {
    label: 'Tiếng Việt',
    value: 'vi',
  },
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Thailand',
    value: 'thai',
  },
  {
    label: 'Japan',
    value: 'jp',
  },
];

const flatternProductFieldsOptions = (dataFields: ModelField[]) => {
  const options = [
    {
      label: 'Product name',
      value: 'product_name',
    },
    {
      label: 'Description',
      value: 'description',
    },
    {
      label: 'Type',
      value: 'type',
    },
    {
      label: 'Tags',
      value: 'tags',
    },
    {
      label: 'Image',
      value: 'image',
    },
    {
      label: 'Video',
      value: 'video',
    },
    {
      label: '3D',
      value: 'three_dimension',
    },
    {
      label: 'Author name',
      value: 'author.name.vi',
    },
    {
      label: 'Author email',
      value: 'author.email',
    },
    {
      label: 'Author phone',
      value: 'author.phone',
    },
    {
      label: 'Contact name',
      value: 'author.contact_name',
    },
    {
      label: 'Author avatar',
      value: 'author.avatar',
    },
    {
      label: 'Author Exp Year',
      value: 'author.experience_year',
    },
    {
      label: 'Author Artwords Count',
      value: 'author.artworks_count',
    },
    {
      label: 'Author quote',
      value: 'author.translation.vi.quote',
    },
    {
      label: 'Author Prizes',
      value: 'author.prizes',
    },
    {
      label: 'Author Artworks',
      value: 'author.highlight_artworks',
    },
  ];

  dataFields?.forEach((field) => {
    options.push({
      label: `model.${field.key}`,
      value: `data_model_value.${field.key}`,
    });
  });

  return options;
};

const SectionWrapper: FC<SectionWrapperProps> = ({ fields, productModelFields }) => {
  const methods = useFormContext();
  const getFieldIsProductDataValue = (path: string) => {
    return methods.watch(`${path}.is_product_data`);
  };
  const [language, setLanuage] = useState<string>('vi');

  const renderValueNormalInput = ({ type, is_array, key, sub_fields }: ModelField) => {
    let RenderComponent: any;
    let stringType;
    switch (type) {
      case 'string':
        RenderComponent = is_array ? DynamicTextInput : TextInput;
        break;
      case 'html':
        RenderComponent = RichTextEditor;
        break;
      case 'float':
        RenderComponent = TextInput;
        stringType = InputTypeEnum.FLOAT;
        break;
      case 'integer':
        RenderComponent = TextInput;
        stringType = InputTypeEnum.INTEGER;
        break;
      case 'boolean':
        RenderComponent = CheckboxInput;
        break;
      case 'image':
        RenderComponent = UploadImage;
        break;
      case 'video':
        RenderComponent = UploadVideo;
        break;
      case '3D':
        RenderComponent = Upload3D;
        break;
      case 'object':
        RenderComponent = is_array ? DynamicObjectInput : ObjectInput;
        break;
      default:
        RenderComponent = null;
        break;
    }

    return (
      RenderComponent && (
        <FormRow className="flex flex-col">
          {language !== 'vi' ? (
            <RenderComponent
              key={language}
              name={`translations.${language}.${key}`}
              title="Value"
              type={stringType}
              subFields={sub_fields}
              renderField={renderField}
            />
          ) : (
            <RenderComponent
              key={language}
              name={`values.${key}`}
              title="Value"
              type={stringType}
              subFields={sub_fields}
              renderField={renderField}
            />
          )}
        </FormRow>
      )
    );
  };

  const renderValueInjectProductData = (key: string) => {
    return (
      <FormRow>
        <SelectInput
          title="Value"
          name={`values.${key}`}
          options={flatternProductFieldsOptions(productModelFields ?? [])}
        />
      </FormRow>
    );
  };

  return (
    <>
      <SelectInput
        title="Language"
        name="language"
        options={languagesOptions}
        defaultValue={language}
        onChange={(value: string) => setLanuage(value)}
      />
      <Accordion type="single" className="w-full">
        {fields?.map((item, index) => (
          <AccordionItem key={index} className="shadow-md p-4" value={item.label}>
            <AccordionTrigger itemScope className="font-medium">
              {item.label}
            </AccordionTrigger>
            <AccordionContent>
              <SectionForm
                path={`values_model.${index}`}
                type={item.type}
                keyValue={item.key}
                productModelFields={productModelFields}
              />

              {!getFieldIsProductDataValue(`values_model.${index}`)
                ? renderValueNormalInput(item)
                : renderValueInjectProductData(item.key)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default SectionWrapper;
