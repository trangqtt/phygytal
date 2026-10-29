import FormRow from '../../common/form-ui-kit/FormRow';
import TextInput from '../../common/form-ui-kit/TextInput';
import UploadFile from '../../common/form-ui-kit/UploadFile';

export default function StoneInfoFormFields({}) {
  return (
    <>
      <FormRow>
        <TextInput name="stoneName" title="Stone name" />
        <TextInput name="origin" title="Origin" />
      </FormRow>
      <FormRow>
        <TextInput name="clearPoint" title="Clear point" />
        <TextInput name="color" title="Color" />
      </FormRow>
      <FormRow>
        <TextInput name="rarity" title="Rarity" />
        <TextInput name="characteristic" title="Characteristic" />
      </FormRow>
      <FormRow>
        <UploadFile name='imageUrl' title='Image' />
      </FormRow>
    </>
  );
}
