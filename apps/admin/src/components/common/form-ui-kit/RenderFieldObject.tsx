import { InputTypeEnum } from '../../../enum';
import CheckboxInput from './CheckboxInput';
import FormRow from './FormRow';
import ObjectInput from './ObjectInput';
import RichTextEditor from './RichTextEditor';
import TextInput from './TextInput';
import UploadImage from './UploadImage';
import UploadVideo from './UploadVideo';


export type FieldType = 'string' | 'integer' | 'float' | 'boolean' | 'image' | 'video' | 'html' | 'object' | '3D';
export interface ObjectInputProps{
  label: string;
  key: string;
  type: FieldType;
  subFields?: ObjectInputProps[];
}

export const renderField = (field: ObjectInputProps) => {
  let RenderComponent: any;
  let type;

  const name = field.key;
  const label = field.label;
  switch (field.type) {
    case 'string':
      RenderComponent =  TextInput;
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
    case 'object':
      RenderComponent = ObjectInput;
      break;
    default:
      RenderComponent = null;
      break;
  }
  return (
    RenderComponent && (
      <FormRow>
        <RenderComponent
          name={name}
          title={label}
          type={type}
          subFields={field?.subFields}
          renderField={renderField}
        />
      </FormRow>
    )
  );
};
