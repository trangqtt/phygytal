import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';
import { useOrganizations } from '../../hooks/fetch/useOrganizations';
import { useProductModelAction, useProductModels } from '../../hooks/fetch/useProductModels';
import BackdropLoader from '../common/BackdropLoader';
import TableData from '../common/TableData';
import { Button } from '../common/shadcn-ui-kit/button';
import Typo from '../common/Typo';

const columns: any[] = [{ label: 'Name' }, { label: 'Created date' }];

export default function ListProductModel() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce<string>(searchValue, 500);
  useOrganizations();
  const { data: models, isLoading } = useProductModels();
  const { deleteMutation } = useProductModelAction();
  const navigate = useNavigate();

  const handleNew = () => {
    navigate('create');
  };

  const handleEditModel = (id: string) => {
    navigate(`/models/edit/${id}`);
  };

  const handleDeleteModel = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    toast.info('Delete model successful');
  };

  return (
    <>
      <BackdropLoader open={isLoading} />
      <div className="flex flex-col w-full h-full gap-[20px]">
        <div className="flex justify-between">
          <Typo variants='h6'>List Model</Typo>

          <Button onClick={handleNew} className="self-end">
            New Model
          </Button>
        </div>
   
        <TableData
          columns={columns}
          data={models}
          renders={[
            {
              field: 'name',
            },
            {
              field: 'created_at',
              type: 'date',
            },
          ]}
          actions={[
            {
              type: 'edit',
              action: (item) => handleEditModel(item.id),
            },
            {
              type: 'delete',
              action: (item) => handleDeleteModel(item.id),
            },
          ]}
        />
      </div>
    </>
  );
}
