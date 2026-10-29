import FormRow from '../../common/form-ui-kit/FormRow';
import RichTextEditor from '../../common/form-ui-kit/RichTextEditor';
import UploadFile from '../../common/form-ui-kit/UploadFile';

export default function AboutThemeFormFields({}) {
  return (
    <>
      <FormRow>
        <RichTextEditor name="attributes.en.title" title="Page Title (En)" />
        <RichTextEditor name="attributes.en.description" title="Description (En)" />
      </FormRow>

      <FormRow>
        <RichTextEditor name="attributes.vi.title" title="Page Title (Vi)" />
        <RichTextEditor name="attributes.vi.description" title="Description (Vi)" />
      </FormRow>
      <FormRow>
        <UploadFile name="attributes.imageUrl" title="Image" />
      </FormRow>
    </>
  );
}
