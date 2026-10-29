import { FC, useEffect } from 'react';
import FormRow from '../common/form-ui-kit/FormRow';
import TextInput from '../common/form-ui-kit/TextInput';
import SelectInput from '../common/form-ui-kit/SelectInput';
import CheckboxInput from '../common/form-ui-kit/CheckboxInput';
import { useFormContext } from 'react-hook-form';
import { subfieldType } from '../ProductModels/ManageModelFields';
import { InputTypeEnum } from '../../enum';
import UploadImage from '../common/form-ui-kit/UploadImage';
import UploadVideo from '../common/form-ui-kit/UploadVideo';
import RichTextEditor from '../common/form-ui-kit/RichTextEditor';
import FormItemTitle from '../common/form-ui-kit/FormItemTitle';
import ObjectInput from '../common/form-ui-kit/ObjectInput';
import { ModelField } from '../../model/ProductModelEntity';
import { renderField } from '../common/form-ui-kit/RenderFieldObject';
import DynamicTextInput from '../common/form-ui-kit/DynamicTextInput';
import DynamicObjectInput from '../common/form-ui-kit/DynamicObjectInput';
import Upload3D from '../common/form-ui-kit/Upload3d';

export type SectionFormProps = {
  path: string;
  title?: string;
  keyValue: string;
  type: string;
  productModelFields?: ModelField[];
  subFields?: ModelField[];
  isArray?: boolean;
};

const SectionForm: FC<SectionFormProps> = ({ path, title, keyValue, type, productModelFields, subFields, isArray }) => {
  const methods = useFormContext();

  useEffect(() => {
    if (keyValue && type) {
      methods.setValue(`${path}.key`, keyValue);
      methods.setValue(`${path}.type`, type);
    }
  },[])

  const renderValueNormalInput = () => {
    let RenderComponent: any;
    switch (type) {
      case 'string':
        RenderComponent = isArray ? DynamicTextInput : TextInput;
        break;
      case 'html':
        RenderComponent = RichTextEditor;
        break;
      case 'float':
        RenderComponent = TextInput;
        type = InputTypeEnum.FLOAT;
        break;
      case 'integer':
        RenderComponent = TextInput;
        type = InputTypeEnum.INTEGER;
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
        RenderComponent = isArray ? DynamicObjectInput : ObjectInput;
        break;
      default:
        RenderComponent = null;
        break;
    }

    return (
      RenderComponent && (
        <FormRow>
          <RenderComponent
            name={`${path}.value`}
            title="Value"
            subFields={subFields}
            renderField={renderField}
          />
        </FormRow>
      )
    );
  };

  return (
    <>
      {title && (
        <FormItemTitle title={title} />
      )}
      <FormRow>
        <TextInput name={`${path}.key`} title="Key" defaultValue={keyValue} className='hidden' />
        <SelectInput name={`${path}.type`} title="Type" options={subfieldType} defaultValue={type} className='hidden' />
      </FormRow>
      <FormRow>
        <CheckboxInput
          name={`${path}.is_product_data`}
          title="Inject product data"
        />
      </FormRow>
    </>
  );
};

export default SectionForm;
