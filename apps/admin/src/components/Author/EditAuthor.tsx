import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { editAuth, getAuthDetail } from '../../api/author';
import { AuthorModel } from '../../model/AuthorModel';
import BackdropLoader from '../common/BackdropLoader';
import { Button } from '../common/shadcn-ui-kit/button';
import AuthorForm from './AuthorForm';

export default function EditAuthor() {
  const methods = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery(['auths', id], () => getAuthDetail(id!), {
    enabled: !!id,
  });

  const { mutate: editAuthMutate, isLoading: isLoadingMutate } = useMutation(
    (data: AuthorModel) => editAuth(data),
    {
      onSuccess() {
        methods.reset();
        queryClient.invalidateQueries('auths');
        goBack();
      },
    }
  );

  const onSubmit = async (data: AuthorModel) => {
    editAuthMutate(data);
  };

  const goBack = () => {
    navigate('/authors');
  };

  useEffect(() => {
    if (data) {
      console.log('data: ', data);
      methods.reset(data);
    }
  }, [data]);

  return (
    <>
      <BackdropLoader open={isLoadingMutate || isLoading} />
      <div>
        <Button onClick={goBack} >
          Back
        </Button>
        <h2 className="text-[30px] mb-[30px] font-bold">Edit Author</h2>
      </div>

      <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
        <div className="pt-[10px]  border-b-[1px] border-b-solid border-b-black pb-[60px]">
          <AuthorForm methods={methods} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}
