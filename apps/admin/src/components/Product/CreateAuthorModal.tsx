import { Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { AuthorModel } from '../../model/AuthorModel';
import { createAuth } from '../../api/author';
import AuthorForm from '../Author/AuthorForm';

interface Props {
  open: boolean;
  handleCloseModal(): void;
  onCreateNewAuthor(authorId: string): void;
}

export default function CreateAuthorModal({
  open,
  handleCloseModal,
  onCreateNewAuthor,
}: Props) {
  const queryClient = useQueryClient();
  const methods = useForm();
  
  const { mutate: createAuthMutate, isLoading } = useMutation(
    (data: AuthorModel) => createAuth(data),
    {
      onSuccess(data:any) {
        queryClient.invalidateQueries('auths');
        onCreateNewAuthor(data);
      },
    }
  );

  const onSubmit = async (data: AuthorModel) => {
    createAuthMutate(data);
  };

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="xl">
      <div className='min-w-[1000px] p-6'>
        <h1 className='font-bold text-[28px]'>Create Author</h1>
        <button onClick={handleCloseModal} className="flex justify-end p-[8px] w-full">
          <CloseIcon />
        </button>
        <AuthorForm methods={methods} onSubmit={onSubmit} />
      </div>
    </Dialog>
  );
}
