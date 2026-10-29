import { FC, ReactElement } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getAuthors } from '../../api/author';
import BackdropLoader from '../common/BackdropLoader';
import TableData from '../common/TableData';
import { Button } from '../common/shadcn-ui-kit/button';
import Typo from '../common/Typo';

const columns = [
  { id: 'name', label: 'Name' },
  {
    id: 'artworks_count',
    label: 'Artworks',
  },
  {
    id: 'experience_years',
    label: 'Experience',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'phone',
    label: 'Phone',
  },
];

const Authors: FC = (): ReactElement => {
  const navigate = useNavigate();

  const { data: authsData, isLoading } = useQuery(['auths'], getAuthors);

  const onClickCreateAuth = (): void => {
    navigate(`/authors/create`);
  };

  const handleEditAuth = (author_id: string) => {
    navigate(`/authors/edit/${author_id}`);
  };

  return (
    <>
      <BackdropLoader open={isLoading} />
      <div className="flex flex-col gap-[40px]">
        <div className="flex justify-between">
          <Typo variants='h6'>Authors</Typo>
          <Button onClick={onClickCreateAuth}>Create new Author</Button>
        </div>

        <TableData
          columns={columns}
          data={authsData}
          renders={[
            {
              field: ['name', 'vi'],
            },
            {
              field: 'artworks_count',
            },
            {
              field: 'experience_year',
            },
            {
              field: 'email',
            },
            {
              field: 'phone',
            },
          ]}
          actions={[
            {
              type: 'edit',
              action: (item) => handleEditAuth(item.id),
            },
          ]}
        />
      </div>
    </>
  );
};

export default Authors;
