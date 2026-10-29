import Form, { FormProps } from '../common/form-ui-kit/Form';
import FormRow from '../common/form-ui-kit/FormRow';
import TextInput from '../common/form-ui-kit/TextInput';
import { Button } from '../common/shadcn-ui-kit/button';
import ManageModelFields from './ManageModelFields';

interface ProductProps extends FormProps {}

export default function ProductModelForm({
  methods,
  onSubmit,
}: ProductProps) {
  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <FormRow>
          <TextInput name="name" title="Name" />
        </FormRow>

        <ManageModelFields />
        <Button type="submit" className="mt-[20px] w-full">
          Save
        </Button>
      </Form>
    </>
  );
}
