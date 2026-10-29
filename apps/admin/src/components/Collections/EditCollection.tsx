import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCollectionAction,
  useCollectionDetail,
} from '../../hooks/fetch/useCollections';
import BackdropLoader from '../common/BackdropLoader';
import { Button } from '../common/shadcn-ui-kit/button';
import CollectionForm from './CollectionForm';

export default function EditCollection() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const goBack = () => {
    navigate('/collections');
  };

  const { updateMutation } = useCollectionAction();
  const { data, isLoading } = useCollectionDetail(id);
  const methods = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data: any) => {
    const { id, name, description, banner, logo, org_id } = data;
    await updateMutation.mutateAsync({ id, name, description, banner, logo, org_id });
  };

  useEffect(
    function () {
      if (!!data) {
        methods.reset(data);
      }
    },
    [data]
  );

  return (
    <>
      <BackdropLoader open={updateMutation.isLoading || isLoading} />
      <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
        <div>
          <Button onClick={goBack}>Back</Button>
          <h2 className="text-[30px] mb-[30px] font-bold">Edit Collection</h2>
        </div>
        <div className="pt-[10px]">
          <CollectionForm methods={methods} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}
