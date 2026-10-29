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
import { columns, subfieldType } from './ManageModelFields';

export default function ManageSubfields() {
  const { control } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'sub_fields',
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
      <div className="flex gap-4 items-center mb-4">
        <h4 className="font-semibold text-xl">Object Subfield</h4>
        <Button type="button" onClick={handleOpenModal}>
          Add
          <Add className="button" />
        </Button>
      </div>

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
        title="Subfields"
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
              options={subfieldType}
              title="Type"
              defaultValue={subfieldType[0].value}
            />
          </FormRow>
        </Form>
      </Popup>
    </div>
  );
}
