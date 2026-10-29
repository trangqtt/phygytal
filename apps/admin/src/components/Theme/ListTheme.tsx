import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useThemeAction, useThemes } from '../../hooks/fetch/useThemes';
import BackdropLoader from '../common/BackdropLoader';
import TableData from '../common/TableData';
import { Button } from '../common/shadcn-ui-kit/button';
import Typo from '../common/Typo';

const columns = [
  {
    label: 'Name',
  },
];

export default function ListTheme() {
  const { data, isLoading } = useThemes();
  const { cloneMutation, deleteMutation } = useThemeAction();

  const navigate = useNavigate();
  const handleNew = () => {
    navigate('create');
  };

  const handleEditTheme = (id: string) => {
    navigate(`/themes/edit/${id}`);
  };

  const handleCloneTheme = async (id: string) => {
    await cloneMutation.mutateAsync(id);
    toast.info('Clone theme successfuly');
  };

  const handleDeleteTheme = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    toast.info('Delete theme successfuly');
  };

  return (
    <>
      <BackdropLoader open={isLoading || cloneMutation.isLoading} />
      <div className="flex flex-col w-full h-full gap-[20px]">
        <div className="flex justify-between">
          <Typo variants='h6'>List Theme</Typo>
          <Button onClick={handleNew}>New Theme</Button>
        </div>

        <TableData
          columns={columns}
          data={data}
          renders={[
            {
              field: 'name',
            },
          ]}
          actions={[
            {
              type: 'edit',
              action: (item) => handleEditTheme(item.theme_id),
            },
            {
              type: 'clone',
              action: (item) => handleCloneTheme(item.theme_id),
            },
            {
              type: 'delete',
              action: (item) => handleDeleteTheme(item.theme_id),
            },
          ]}
        />
      </div>
    </>
  );
}
