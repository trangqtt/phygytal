import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { useTagAction, useTags } from '../../hooks/fetch/useTag';
import { TagItem } from '../../model/TagModel';
import BackdropLoader from '../common/BackdropLoader';
import TableData from '../common/TableData';
import { Button } from '../common/shadcn-ui-kit/button';
import { Input } from '../common/shadcn-ui-kit/input';
import Typo from '../common/Typo';

const columns: any[] = [
  {
    label: 'Tag ID',
  },
  { label: 'Organization ID', minWidth: 100 },
  { label: 'Encrypt Mode', minWidth: 100 },
  { label: 'Raw Data', minWidth: 100 },
  { label: 'Scan Counter', minWidth: 100 },
  { label: 'Created date', minWidth: 100 },
];

function getFilterTags(tagData: TagItem[], searchValue: string): TagItem[] {
  return tagData?.filter((data: TagItem) =>
    data.tag_id?.includes(searchValue.trim().toLowerCase())
  );
}

export default function Collections() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const { data: tags = [], isLoading } = useTags();
  const { deleteMutation } = useTagAction();
  const navigate = useNavigate();

  const handleNew = () => {
    navigate('create');
  };

  const handleEditCollection = (id: string) => {
    navigate(`/tags/edit/${id}`);
  };

  const handleDeleteCollection = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <>
      <BackdropLoader open={isLoading} />
      <div className="flex flex-col w-full h-full gap-[20px]">
        <div className="flex justify-between">
          <Typo variants='h6'>List ID Tags</Typo>

          <Button onClick={handleNew}>New Tag Item</Button>
        </div>

        <div className="flex gap-12">
          <div className="flex gap-2 items-center justify-between">
            <p className="flex-1">Tìm kiếm:</p>
            <Input
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              value={searchValue}
              className="bg-white w-48"
              placeholder="Tag ID"
            />
          </div>
        </div>

        <TableData
          columns={columns}
          data={getFilterTags(tags, debouncedValue)}
          renders={[
            {
              field: 'tag_id',
            },
            {
              field: 'org_id',
            },
            {
              field: 'encrypt_mode',
            },
            {
              field: 'raw_data',
            },
            {
              field: 'scan_counter',
            },
            {
              field: 'created_at',
              type: 'date',
            },
          ]}
          actions={[
            {
              type: 'edit',
              action: (item) => handleEditCollection(item.tag_id),
            },
            {
              type: 'delete',
              action: (item) => handleDeleteCollection(item.tag_id),
            },
          ]}
        />
      </div>
    </>
  );
}
