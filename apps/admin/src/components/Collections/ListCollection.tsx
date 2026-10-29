import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';
import { useCollectionAction, useCollections } from '../../hooks/fetch/useCollections';
import { useOrganizations } from '../../hooks/fetch/useOrganizations';
import { Collection } from '../../model/CollectionModel';
import BackdropLoader from '../common/BackdropLoader';
import TableData from '../common/TableData';
import { Button } from '../common/shadcn-ui-kit/button';
import { Input } from '../common/shadcn-ui-kit/input';
import Typo from '../common/Typo';

const columns: any[] = [
  {
    label: 'Name',
  },
  { label: 'Description', minWidth: 100 },
  { label: 'Logo', minWidth: 100 },
  { label: 'Banner', minWidth: 100 },

  { label: 'Created date', minWidth: 100 },
];

function getFilterCollections(
  collections: Collection[] | undefined,
  searchValue: string
) {
  return collections?.filter((data: Collection) =>
    data.name?.toLowerCase().includes(searchValue.trim().toLowerCase())
  );
}

export default function Collections() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce<string>(searchValue, 500);
  useOrganizations();
  const { data: collections, isLoading } = useCollections();
  const { deleteMutation } = useCollectionAction();
  const navigate = useNavigate();

  const handleNew = () => {
    navigate('create');
  };

  const handleEditCollection = (id: string) => {
    navigate(`/collections/edit/${id}`);
  };

  const handleDeleteCollection = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    toast.info('Delete collection successful');
  };

  return (
    <>
      <BackdropLoader open={isLoading} />
      <div className="flex flex-col w-full h-full gap-[20px]">
        <div className="flex justify-between">
          <Typo variants='h6'>List Collection</Typo>

          <Button onClick={handleNew}>
            New Collection
          </Button>
        </div>

        <div className="flex gap-12">
          <div className="flex gap-2 items-center justify-between">
            <p className='flex-1'>Tìm kiếm:</p>
            <Input
              placeholder="Tên bộ sưu tập"
              className="bg-white w-48"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <TableData
          columns={columns}
          data={getFilterCollections(collections, debouncedValue)}
          renders={[
            {
              field: 'name',
            },
            {
              field: 'description',
              type: 'html',
            },
            {
              field: ['logo', 'url'],
              type: 'image',
            },
            {
              field: ['banner', 'url'],
              type: 'image',
            },
            {
              field: 'created_at',
              type: 'date',
            },
          ]}
          actions={[
            {
              type: 'edit',
              action: (item) => handleEditCollection(item.id),
            },
            {
              type: 'delete',
              action: (item) => handleDeleteCollection(item.id),
            },
          ]}
        />
      </div>
    </>
  );
}
