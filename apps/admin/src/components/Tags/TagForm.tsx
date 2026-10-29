import Form, { FormProps } from '../common/form-ui-kit/Form';
import FormRow from '../common/form-ui-kit/FormRow';
import TextInput from '../common/form-ui-kit/TextInput';
import UploadDocumentFile from '../common/form-ui-kit/UploadDocumentFile';
import { Button } from '../common/shadcn-ui-kit/button';
import { InputTypeEnum } from '../../enum/index';

interface TagFormProps extends FormProps {
  tabType?: string;
}

export default function TagForm({ methods, tabType, onSubmit }: TagFormProps) {
  return (
    <>
      {tabType === 'Type' ? (
        <Form methods={methods} onSubmit={onSubmit}>
          <FormRow>
            <TextInput name="tag_id" title="Tag ID" required />
            <TextInput name="org_id" title="Organization ID" required />
          </FormRow>
          <FormRow>
            <TextInput name="tag_type" title="Tag Type" />
            <TextInput name="encrypt_mode" title="Encrypt Mode" />
          </FormRow>
          <FormRow>
            <TextInput name="raw_data" title="Raw Data" />
            <TextInput name="scan_counter" title="Scan Counter" type={InputTypeEnum.INTEGER} />
          </FormRow>
          <FormRow>
            <TextInput name="hardware_id" title="Hardware ID" />
          </FormRow>
          <Button type="submit" className="mt-[20px] w-full">
            Save
          </Button>
        </Form>
      ) : (
        <Form methods={methods} onSubmit={onSubmit}>
          <FormRow>
            <TextInput name="product_id" title="Product ID" required />
            <TextInput name="org_id" title="Organization ID" required />
          </FormRow>
          <FormRow>
            <UploadDocumentFile name="file" title="Excel" required />
          </FormRow>
          <Button type="submit" className="mt-[20px] h-9">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
}
