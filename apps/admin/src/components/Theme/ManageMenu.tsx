import { Add } from '@mui/icons-material';
import { useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import TableData from '../common/TableData';
import Form from '../common/form-ui-kit/Form';
import FormRow from '../common/form-ui-kit/FormRow';
import TextInput from '../common/form-ui-kit/TextInput';
import { Button } from '../common/shadcn-ui-kit/button';
import SelectInput from '../common/form-ui-kit/SelectInput';
import { transformPagesOptions } from '../../utils/helper';
import Popup from '../common/Popup';
import { getWebpages } from '../../api/webpage';
import { useQuery } from 'react-query';

const columns: any[] = [
  { label: 'Title (VI)' },
  { label: 'Title (EN)' },
  { label: 'Link to page' },
  { label: 'External Url' },
];

function getDataWithNewField(data: any[], callback: (id: any) => void): any[] {
  data.forEach((item) => {
    item.page_detail = callback(item.page_id);
  });
  console.log('data: ', data);
  return data;
}

export default function ManageMenu() {
  const { control, getValues, watch } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'theme.menu', // unique name for your Field Array
  });

  const methods = useForm();
  const { data: listPage, refetch } = useQuery(['pages'], getWebpages, {
    refetchOnWindowFocus: false,
  });
  const getPageDetail = (pageId: string) => {
    return listPage?.find((page: any) => page.id === pageId);
  };

  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const handleCloseModal = () => {
    methods.reset();
    setOpen(false);
    setFormMode('create');
  };
  const handleOpenModal = () => {
    refetch();
    setOpen(true);
  };

  const onSubmit = (data: any) => {
    if (formMode === 'create') {
      append(data);
    } else {
      const index = fields.findIndex((field: any) => field.id === data.id);
      update(index, data);
    }
    handleCloseModal();
  };

  const handleEdit = (index: number) => {
    refetch();
    setOpen(true);
    const data: any = fields[index];
    methods.reset(data);
    setFormMode('edit');
  };

  return (
    <div className="my-[20px]">
      <Button type="button" onClick={handleOpenModal}>
        Add menu
        <Add className="button" />
      </Button>
      {!!fields?.length && (
        <TableData
          className="border rounded-md border-collapse mt-[10px]"
          columns={columns}
          data={getDataWithNewField(fields, getPageDetail)}
          renders={[
            {
              field: ['title', 'vi'],
            },
            {
              field: ['title', 'en'],
            },
            {
              field: ['page_detail', 'name'],
            },
            {
              field: 'url',
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

      <Popup
        title="Menu"
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
            <TextInput name="title.vi" title="Title (VI)" />
            <TextInput name="title.en" title="Title (EN)" />
          </FormRow>
          <FormRow>
            <SelectInput
              name="page_id"
              title="Page Id"
              options={transformPagesOptions(getValues('theme_pages'))}
            />
          </FormRow>
          <FormRow>
            <TextInput name="url" title="External url" />
          </FormRow>
        </Form>
      </Popup>
    </div>
  );
}
