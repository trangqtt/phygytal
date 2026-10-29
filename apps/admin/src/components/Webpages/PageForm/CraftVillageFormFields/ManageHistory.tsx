import { Add } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import TableData from '../../../common/TableData';
import Form from '../../../common/form-ui-kit/Form';
import FormRow from '../../../common/form-ui-kit/FormRow';
import TextInput from '../../../common/form-ui-kit/TextInput';
import UploadImage from '../../../common/form-ui-kit/UploadImage';
import { Button } from '../../../common/shadcn-ui-kit/button';

const columns: any[] = [
  { label: 'Title (VI)' },
  { label: 'Title (EN)' },
  { label: 'Description (VI)' },
  { label: 'Description (EN)' },
  { label: 'Image' },
];

export default function ManageHistory() {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'attribute.histories',
  });

  const methods = useForm();

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

  const handleEdit = (index: number) => {
    setOpen(true);
    const data: any = fields[index];
    methods.reset(data);
    setFormMode('edit');
  };

  return (
    <div className="mt-[10px] mb-[10px]">
      <Button type="button" onClick={handleOpenModal}>
        Add history
        <Add className="button" />
      </Button>
      {!!fields?.length && (
        <TableData
          className="border rounded-md border-collapse mt-[10px]"
          columns={columns}
          data={fields}
          renders={[
            {
              field: ['title', 'vi'],
            },
            {
              field: ['title', 'en'],
            },
            {
              field: ['description', 'vi'],
            },
            {
              field: ['description', 'en'],
            },
            {
              field: 'imageUrl',
            },
          ]}
          actions={[
            {
              type: 'edit',
              action: (item, index) => handleEdit(index as number),
            },
            {
              type: 'delete',
              action: (item, index) => remove(index),
            },
          ]}
        ></TableData>
      )}

      <Dialog open={open} onClose={handleCloseModal} maxWidth="xl">
        <DialogTitle>Historyss</DialogTitle>
        <Form methods={methods} onSubmit={onSubmit}>
          <DialogContent>
            <FormRow>
              <TextInput name="title.vi" title="Title (VI)" />
              <TextInput name="title.en" title="Title (EN)" />
            </FormRow>
            <FormRow>
              <TextInput name="description.vi" title="Description (VI)" />
            </FormRow>
            <FormRow>
              <TextInput name="description.en" title="Description (EN)" />
            </FormRow>
            <FormRow>
              <UploadImage name="imageUrl" title="Image" />
            </FormRow>
          </DialogContent>
          <DialogActions
            sx={{
              padding: '0px 24px 24px 0',
            }}
          >
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={methods.handleSubmit(onSubmit)}>Save</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
}
