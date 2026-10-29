import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { createWebpage } from '../../api/webpage';
import PageForm from './PageForm/PageForm';

interface Props {
  open: boolean;
  handleCloseModal(): void;
  onCreateNewPage(pageId: string): void;
}

export default function CreatePageModal({
  open,
  handleCloseModal,
  onCreateNewPage,
}: Props) {
  const queryClient = useQueryClient();

  const mutationCreatePage = useMutation((pageData: any) => createWebpage(pageData), {
    onSuccess(pageId: any) {
      onCreateNewPage(pageId);
      queryClient.invalidateQueries('pages');
    },
  });

  const methods = useForm({
    defaultValues: {
      name: '',
      id: null,
      type: 'home',
    },
  });

  const onSubmit = (data: any) => {
    const { name, urlLink, type, attributes } = data;

    mutationCreatePage.mutate({
      name,
      url_link: urlLink,
      type,
      attributes,
    });
  };

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="xl">
      <div className='min-w-[1000px]'>
        <button onClick={handleCloseModal} className="flex justify-end p-[8px] w-full">
          <CloseIcon />
        </button>
        <PageForm methods={methods} onSubmit={onSubmit} />
      </div>
    </Dialog>
  );
}
