import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useThemeAction } from '../../hooks/fetch/useThemes';
import BackdropLoader from '../common/BackdropLoader';
import { Button } from '../common/shadcn-ui-kit/button';
import ThemeForm from './ThemeForm';
import { formatFormData } from './format';
import { transformPageValues } from '../../utils/helper';

export type PageValue = {
  type: 'string' | 'integer' | 'float' | 'boolean' | 'image' | 'video' | 'html' | '3D' | 'object';
  key: string;
  is_product_data: boolean;
  value: any;
}

export default function EditTheme() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/themes');
  };

  const methods = useForm({
    defaultValues: {
      name: '',
      menu: [],
      pages: [],
      languages: ['en', 'vi'],
    },
  });

  const { createMutation } = useThemeAction();

  const onSubmit = async (formData: any) => {
    const foo = {...formData}?.pages?.map((page: any) => transformPageValues(page));
    console.log('foo: ', foo);
    // await createMutation.mutateAsync(formatFormData(formData));
    // navigate('/themes');
  };

  return (
    <>
      <BackdropLoader open={createMutation.isLoading} />
      <div>
        <Button onClick={goBack}>Back</Button>
        <h2 className="text-[30px] mb-[30px] font-bold">Create Theme</h2>
      </div>

      <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
        <ThemeForm methods={methods} onSubmit={onSubmit} />
      </div>
    </>
  );
}
