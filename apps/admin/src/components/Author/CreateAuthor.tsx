import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { createAuth } from '../../api/author';
import { AuthorModel } from '../../model/AuthorModel';
import BackdropLoader from '../common/BackdropLoader';
import { Button } from '../common/shadcn-ui-kit/button';
import AuthorForm from './AuthorForm';

export default function CreateAuthor() {
  const methods = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/authors');
  };

  const { mutate: createAuthMutate, isLoading } = useMutation(
    (data: AuthorModel) => createAuth(data),
    {
      onSuccess() {
        methods.reset();
        queryClient.invalidateQueries('auths');
        goBack();
      },
    }
  );

  const onSubmit = async (data: AuthorModel) => {
    createAuthMutate(data);
  };

  return (
    <>
      <BackdropLoader open={isLoading} />
      <div>
        <Button onClick={goBack}>Back</Button>
        <h2 className="text-[30px] mb-[30px] font-bold">Create Author</h2>
      </div>

      <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
        <div className="pt-[10px]  border-b-[1px] border-b-solid border-b-black pb-[60px]">
          <AuthorForm methods={methods} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}
