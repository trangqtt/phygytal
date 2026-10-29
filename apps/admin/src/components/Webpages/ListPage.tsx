import * as React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { deleteWebpage, getWebpages } from '../../api/webpage';
import BackdropLoader from '../common/BackdropLoader';
import TableData from '../common/TableData';
import { Button } from '../common/shadcn-ui-kit/button';
import Typo from '../common/Typo';

const columns: any[] = [
  {
    label: 'Name',
  },
  { label: 'Type' },

  { label: 'Url' },
];

const ListPage: React.FC = (): React.ReactElement => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const navigate = useNavigate();

  const { data: listPage, isFetching, refetch } = useQuery(['pages'], getWebpages);

  const handleClickNewPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    navigate('create');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditPage = (id: string) => {
    navigate('edit/' + id);
  };

  const handleDeletePage = async (id: string) => {
    await deleteWebpage(id);
    refetch();
  };

  return (
    <>
      <BackdropLoader open={isFetching} />
      <div className="flex flex-col w-full h-full gap-[20px]">
        <div className="w-full flex justify-between">
          <Typo variants='h6'>List Page</Typo>
          <Button onClick={handleClickNewPage}>New Page</Button>
        </div>

        <TableData
          columns={columns}
          data={listPage}
          renders={[
            {
              field: 'name',
            },
            {
              field: 'type',
            },
            {
              field: 'url_link',
            },
          ]}
          actions={[
            {
              type: 'edit',
              action: (item) => handleEditPage(item.id),
            },
          ]}
        />
      </div>
    </>
  );
};

export default ListPage;
