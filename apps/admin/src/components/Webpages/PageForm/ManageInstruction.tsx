import { Add } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import TableData from '../../common/TableData';
import Form from '../../common/form-ui-kit/Form';
import FormRow from '../../common/form-ui-kit/FormRow';
import TextInput from '../../common/form-ui-kit/TextInput';
import UploadFile from '../../common/form-ui-kit/UploadFile';
import { Button } from '../../common/shadcn-ui-kit/button';
import ManageExtractionStages from './ManageExtractionStages';
import ManageFormula from './ManageFormula';

const columns: any[] = [
  { label: 'Name' },
  { label: 'Cover URL' },
  { label: 'Video URL' },
];

const ManageInstruction = ({ lang }: { lang: 'vi' | 'en' }) => {
  const { control, formState } = useFormContext();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: `attributes.${lang}.instructions`,
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
    <>
      <Button
        type="button"
        className="w-fit whitespace-nowrap px-2"
        onClick={handleOpenModal}
      >
        Add instruction {lang}
        <Add className="button" />
      </Button>
      {/* {!!fields?.length && (
        <TableContainer className="w-full border rounded-md border-collapse">
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#E5E5E5' }}>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Cover URL</TableCell>
                <TableCell>Video URL</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((field: any, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>
                    <Link to={field.coverUrl}>{field.coverUrl}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={field.videoUrl}>{field.videoUrl}</Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-[5px]">
                      <Button
                        className="mr-2"
                        type="button"
                        onClick={() => handleEdit(index)}
                      >
                        <Edit />
                      </Button>
                      <Button type="button" onClick={() => remove(index)}>
                        <Delete />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )} */}
      {!!fields?.length && (
        <TableData
          className="border rounded-md border-collapse mt-[10px]"
          columns={columns}
          data={fields}
          renders={[
            {
              field: 'name',
            },
            {
              field: 'coverUrl',
            },
            {
              field: 'videoUrl',
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
        <DialogTitle>Instruction</DialogTitle>
        <Form methods={methods} onSubmit={onSubmit}>
          <DialogContent>
            <FormRow>
              <TextInput name="name" title={`Tutorial Name (${lang})`} />
            </FormRow>
            <FormRow>
              <UploadFile name="coverUrl" title="Cover" />
            </FormRow>
            <FormRow>
              <UploadFile name="videoUrl" title="Video" />
            </FormRow>
            <div className="w-full flex flex-col gap-[20px]">
              <ManageFormula lang={lang} />
              <ManageExtractionStages lang={lang} />
            </div>
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
    </>
  );
};

export default ManageInstruction;
