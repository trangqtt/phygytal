import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { createWebpage } from '../../api/webpage';
import { Button } from '../common/shadcn-ui-kit/button';
import PageForm from './PageForm/PageForm';

export type Props = {};

export default function CreatePage({}: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const goBack = () => {
    navigate('/pages');
  };

  const mutationCreatePage = useMutation((pageData: any) => createWebpage(pageData), {
    onSuccess() {
      queryClient.invalidateQueries('pages');
      goBack();
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
    <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
      <div>
        <Button onClick={goBack}>Back</Button>
        <h2 className="text-[30px] mb-[30px] font-bold">Page Info</h2>
      </div>
      <div className="pt-[10px]">
        <PageForm methods={methods} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
