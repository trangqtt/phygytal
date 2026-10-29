import { useOrganizationsSelect } from '../../hooks/fetch/useOrganizations';
import Form, { FormProps } from '../common/form-ui-kit/Form';
import FormRow from '../common/form-ui-kit/FormRow';
import RichTextEditor from '../common/form-ui-kit/RichTextEditor';
import SelectInput from '../common/form-ui-kit/SelectInput';
import TextInput from '../common/form-ui-kit/TextInput';
import UploadImage from '../common/form-ui-kit/UploadImage';
import { Button } from '../common/shadcn-ui-kit/button';

interface ProductProps extends FormProps {}

export default function CollectionForm({
  methods,
  onSubmit,
}: ProductProps) {

  const { data: orgsData, } = useOrganizationsSelect();

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <FormRow>
          <TextInput name="name" title="Name" />
        </FormRow>
        <FormRow>
          <RichTextEditor name="description" title="Description" />
        </FormRow>
        <FormRow>
          <SelectInput name="org_id" options={orgsData || []} title="Organization" />
        </FormRow>
        <FormRow>
          <UploadImage name="logo" title="Logo" />
          <UploadImage name="banner" title="Banner" />
        </FormRow>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </Form>
    </>
  );
}
