import { Add } from '@mui/icons-material';

import { useState } from 'react';
import { useFieldArray, useForm, useFormContext, useWatch } from 'react-hook-form';
import TableData from '../common/TableData';
import Form from '../common/form-ui-kit/Form';
import FormRow from '../common/form-ui-kit/FormRow';
import SelectInput from '../common/form-ui-kit/SelectInput';
import TextInput from '../common/form-ui-kit/TextInput';
import { Button } from '../common/shadcn-ui-kit/button';
import Popup from '../common/Popup';
import ManageSubfields from './ManageSubfields';
import CheckboxInput from '../common/form-ui-kit/CheckboxInput';

export const columns = [
  { label: 'Key' },
  { label: 'Label' },
  { label: 'Type' },
  { label: 'Is Array' },
];

export const subfieldType = [
  {
    label: 'Text',
    value: 'string',
  },
  {
    label: 'Number (Int)',
    value: 'integer',
  },
  {
    label: 'Number (Float)',
    value: 'float',
  },
  {
    label: 'Boolean',
    value: 'boolean',
  },
  {
    label: 'Rich Text Editor',
    value: 'html',
  },
  {
    label: 'Image',
    value: 'image',
  },
  {
    label: 'Video',
    value: 'video',
  },
];

export const fieldTypes = [
  ...subfieldType,
  {
    label: 'Object',
    value: 'object',
  },
];
export default function ManageModelFields() {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'data_fields',
  });

  const methods = useForm({
    defaultValues: {
      type: 'string',
    },
  });

  const typeValue = methods.watch('type');

  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const handleCloseModal = () => {
    methods.reset();
    setOpen(false);
    setFormMode('create');
  };
  const handleOpenModal = () => {
    setOpen(true);
  };

  const onSubmit = (data: any) => {
    if (formMode === 'create') {
      append({ ...data });
    } else {
      const index = fields.findIndex((field) => field.id === data.id);
      update(index, data);
    }
    handleCloseModal();
  };

  const handleEditField = (index: number) => {
    setOpen(true);
    const data: any = fields[index];
    methods.reset(data);
    setFormMode('edit');
  };

  return (
    <div className="mt-[10px] mb-[10px]">
      <Button type="button" onClick={handleOpenModal}>
        Add field
        <Add className="button" />
      </Button>
      {!!fields?.length && (
        <TableData
          columns={columns}
          data={fields}
          renders={[
            {
              field: 'key',
            },
            {
              field: 'label',
            },
            {
              field: 'type',
            },
            {
              field: 'is_array',
              type: 'boolean',
            },
          ]}
          actions={[
            {
              type: 'edit',
              action: (_, index) => handleEditField(index),
            },
            {
              type: 'delete',
              action: (_, index) => remove(index),
            },
          ]}
        />
      )}
      <Popup
        title="Product Model Fields"
        open={open}
        onOpenChange={setOpen}
        actionEle={
          <>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={methods.handleSubmit(onSubmit)}>Save</Button>
          </>
        }
      >
        <Form methods={methods} onSubmit={onSubmit}>
          <FormRow>
            <TextInput name="key" title="Key" />
            <TextInput name="label" title="Label" />
            <SelectInput
              name="type"
              options={fieldTypes}
              title="Type"
              defaultValue={fieldTypes[0].value}
            />
          </FormRow>
          <FormRow>
            <CheckboxInput
              className="flex items-baseline gap-3"
              name="is_array"
              title="Is Array"
              defaultChecked={false}
            />
          </FormRow>
          {/* manage subfield for object here */}
          {typeValue === 'object' && <ManageSubfields />}
        </Form>
      </Popup>
    </div>
  );
}
