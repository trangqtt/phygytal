import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getWebpage, updateWebpage } from '../../api/webpage';
import BackdropLoader from '../common/BackdropLoader';
import { Button } from '../common/shadcn-ui-kit/button';
import PageForm from './PageForm/PageForm';

export type Props = {};

export default function EditPage({}: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params.id;

  const goBack = () => {
    navigate('/pages');
  };

  const mutationUpdatePage = useMutation(
    ({ id, pageData }: any) => updateWebpage(id, pageData),
    {
      onSuccess() {
        queryClient.invalidateQueries('pages');
        goBack();
      },
    }
  );

  const methods = useForm({
    defaultValues: {
      name: '',
      title: '',
      urlLink: '',
      id: null,
      type: 'home',
    },
  });

  const { data, isFetching } = useQuery(['pages', id], () => getWebpage(id!), {
    enabled: !!id,
  });

  useEffect(() => {
    if (!!data) {
      methods.reset(data);
    }
  }, [data]);

  const onSubmit = (data: any) => {
    const { name, urlLink, type, attributes } = data;

    mutationUpdatePage.mutate({
      id,
      pageData: {
        url_link: urlLink ?? '',
        name,
        type,
        attributes,
      },
    });
  };

  return (
    <>
      <BackdropLoader open={isFetching || mutationUpdatePage.isLoading} />
      <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
        <div>
          <Button onClick={goBack}>Back</Button>
          <h2 className="text-[30px] mb-[30px] font-bold">Edit Page</h2>
        </div>
        <div className="pt-[10px]">
          <PageForm methods={methods} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}
