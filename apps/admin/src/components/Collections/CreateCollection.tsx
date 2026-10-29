import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useCollectionAction } from '../../hooks/fetch/useCollections';
import { Button } from '../common/shadcn-ui-kit/button';
import CollectionForm from './CollectionForm';


export type Props = {};

export default function CreateCollection({}: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const goBack = () => {
    navigate('/collections');
  };

  const { createMutation } = useCollectionAction();
  const methods = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data: any) => {
    await createMutation.mutateAsync(data);
    goBack();
  };

  return (
    <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
      <div>
        <Button onClick={goBack}>
          Back
        </Button>
        <h2 className="text-[30px] mb-[30px] font-bold">Collection Info</h2>
      </div>
      <div className="pt-[10px]">
        <CollectionForm methods={methods} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
