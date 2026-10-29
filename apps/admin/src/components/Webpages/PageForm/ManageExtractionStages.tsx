import { Add } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import TableData from '../../common/TableData';
import Form from '../../common/form-ui-kit/Form';
import FormRow from '../../common/form-ui-kit/FormRow';
import TextInput from '../../common/form-ui-kit/TextInput';
import { Button } from '../../common/shadcn-ui-kit/button';

const columns: any[] = [{ label: 'Title' }, { label: 'Description' }];

const ManageExtractionStages = ({ lang }: { lang: 'vi' | 'en' }) => {
  const { control, formState } = useFormContext();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'attributes.extractionStages',
  });

  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const methods = useForm();

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
    <div className="w-full flex flex-col gap-[20px]">
      <Button
        type="button"
        className="w-fit whitespace-nowrap px-2"
        onClick={handleOpenModal}
      >
        Add Extraction Stages
        <Add className="button" />
      </Button>
      {!!fields?.length && (
        <TableData
          className="border rounded-md border-collapse mt-[10px]"
          columns={columns}
          data={fields}
          renders={[
            {
              field: 'stageTitle',
            },
            {
              field: 'stageDescription',
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

      <Dialog open={open} onClose={handleCloseModal} fullWidth>
        <DialogTitle>Extraction Stage</DialogTitle>
        <Form methods={methods} onSubmit={onSubmit}>
          <DialogContent>
            <FormRow>
              <TextInput name="stageTitle" title={`Title (${lang})`} />
            </FormRow>
            <FormRow>
              <TextInput name="stageDescription" title={`Description (${lang})`} />
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
};

export default ManageExtractionStages;
