import { UseFormReturn } from 'react-hook-form';
import { OrganizationModel } from '../../model/OrganizationModel';
import Form from '../common/form-ui-kit/Form';
import FormRow from '../common/form-ui-kit/FormRow';
import TextInput from '../common/form-ui-kit/TextInput';
import UploadImage from '../common/form-ui-kit/UploadImage';
import { Button } from '../common/shadcn-ui-kit/button';

interface OrganizationFormProps {
  methods: UseFormReturn<any, any>;
  defaultValues?: any;
  onSubmit?(data: OrganizationModel): void;
  className?: string;
}

export default function OrganizationForm({
  methods,
  className,
  onSubmit,
}: OrganizationFormProps) {
  return (
    <Form methods={methods} onSubmit={onSubmit} className={className}>
      <FormRow>
        <TextInput
          name="org_name"
          title="Organization name"
          placeholder="Organization name"
        />
      </FormRow>
      <FormRow>
        <TextInput
          name="org_tag_name"
          title="Organization tag"
          placeholder="Organization tag"
        />
      </FormRow>
      <FormRow>
        <UploadImage name="logo" title="Logo URL" />
      </FormRow>
      <Button className="w-full" type="submit">
        Save
      </Button>
    </Form>
  );
}
