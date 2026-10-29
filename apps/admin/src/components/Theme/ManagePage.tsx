import { PlusIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getWebpages } from '../../api/webpage';
import EditPageModal from '../Webpages/EditPageModal';
import CreatePageModal from '../Webpages/CreatePageModal';
import TableData from '../common/TableData/index';
import Form from '../common/form-ui-kit/Form';
import { Button } from '../common/shadcn-ui-kit/button';

const columns: any[] = [{ label: 'Name' }, { label: 'Type' }];

function getDataWithNewField(data: any[], callback: (id: any) => void): any[] {
  data.forEach((item) => {
    item.page_detail = callback(item.page_id);
  });
  return data;
}

export default function ManagePage() {
  const [open, setOpen] = useState(false);
  const [openCreatePageModal, setOpenCreatePageModal] = useState(false);
  const [openEditPageModal, setOpenEditPageModal] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const { control } = useFormContext();
  const { fields, append, remove, update, swap } = useFieldArray({
    control,
    name: 'pages',
  });

  const { data: listPage } = useQuery(['pages'], getWebpages);

  const methods = useForm({
    defaultValues: {
      id: '',
      page_id: '',
    },
  });

  useEffect(() => {
    if (listPage?.length) {
      methods.reset({
        page_id: listPage[0].id,
      });
    }
  }, [listPage]);

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenModal = () => {
    methods.reset();
    setFormMode('create');
    setOpen(true);
  };

  const handleEdit = (index: number) => {
    setOpen(true);
    const data: any = fields[index];
    methods.reset(data);
    setFormMode('edit');
  };

  const getPageDetail = (pageId: string) => {
    return listPage?.find((page: any) => page.id === pageId);
  };

  const onCreateNewPage = (pageId: string) => {
    append({
      page_id: pageId,
    });
    handleCloseModal();
    setOpenCreatePageModal(false);
  };

  const handleCloseEditPageModal = () => {
    setOpenEditPageModal(false);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    swap(result.source.index, result.destination.index);
  };

  return (
    <div className="my-[20px]">
      <Button type="button" onClick={handleOpenModal}>
        Add page to theme
        <PlusIcon />
      </Button>
      {!!fields?.length && (
        <TableData
          className="border rounded-md border-collapse mt-[10px]"
          columns={columns}
          data={getDataWithNewField(fields, getPageDetail)}
          renders={[
            {
              field: ['page_detail', 'name'],
            },
            {
              field: ['page_detail', 'type'],
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
          isDrag={true}
          handleDragEnd={handleDragEnd}
        ></TableData>
      )}

      {/* <CreatePageModal
        onCreateNewPage={onCreateNewPage}
        open={open}
        handleCloseModal={handleCloseModal}
      /> */}

      {/* <EditPageModal
        pageId={editPageId}
        open={openEditPageModal}
        handleCloseModal={handleCloseEditPageModal}
      /> */}
    </div>
  );
}
