import { useEffect } from 'react';
import Form, { FormProps } from '../common/form-ui-kit/Form';
import FormRow from '../common/form-ui-kit/FormRow';
import SelectInput from '../common/form-ui-kit/SelectInput';
import TextInput from '../common/form-ui-kit/TextInput';
import { Button } from '../common/shadcn-ui-kit/button';
import ManageLanguage from './ManageLanguage';
import ManageMenu from './ManageMenu';
import { useProducts } from '../../hooks/fetch/useProducts';
import { transformProductOptions } from '../../utils/helper';
import ManagePageV2 from './ManagePageV2';

export default function ThemeForm({ methods, onSubmit, defaultValues }: FormProps) {
  const { data: products } = useProducts();

  useEffect(() => {
    methods.reset(defaultValues)
  }, []);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <FormRow>
        <TextInput name="name" title="Theme name" />
        <SelectInput name="product_id" options={transformProductOptions(products)} title="Product" />
      </FormRow>
      <ManagePageV2 />
      <ManageMenu />
      <ManageLanguage defaultValues={defaultValues?.languages} />
      <Button type="submit" className="mt-[30px] w-full">
        Save
      </Button>
    </Form>
  );
}
