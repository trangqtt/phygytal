import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getTheme } from '../../api/theme';
import { getWebpages } from '../../api/webpage';
import { useThemeAction } from '../../hooks/fetch/useThemes';
import BackdropLoader from '../common/BackdropLoader';
import { Button } from '../common/shadcn-ui-kit/button';
import ThemeForm from './ThemeForm';
import { formatFormData } from './format';

export default function EditTheme() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const { isLoading: isLoadingWebpage } = useQuery(['pages'], getWebpages);

  const goBack = () => {
    navigate('/themes');
  };

  const methods = useForm({
    defaultValues: {
      name: '',
      menu: [],
      pages: [],
      languages: [],
    },
  });

  const { data, isLoading, isFetched } = useQuery(
    ['themes', id],
    () => getTheme(id!),
    {
      enabled: !!id,
    }
  );

  const { updateMutation } = useThemeAction();

  const onSubmit = (formData: any) => {
    const formatData = formatFormData(formData);
    updateMutation.mutate(formatData);
  };

  return (
    <>
      <BackdropLoader open={isLoading || isLoadingWebpage || updateMutation.isLoading} />
      <div>
        <Button onClick={goBack}>Back</Button>
        <h2 className="text-[30px] mb-[30px] font-bold">Edit Theme Story</h2>
      </div>

      {isFetched && (
        <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
          <ThemeForm methods={methods} onSubmit={onSubmit} defaultValues={data} />
        </div>
      )}
    </>
  );
}
