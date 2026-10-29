import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import ProductModelForm from './ProductModelForm';
import {
  useProductModelDetail,
  useProductModelAction,
} from '../../hooks/fetch/useProductModels';
import { Button } from '../common/shadcn-ui-kit/button';
import BackdropLoader from '../common/BackdropLoader';
import { toast } from 'react-toastify';

export default function EditProductModel() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const goBack = () => {
    navigate('/models');
  };

  const { updateMutation } = useProductModelAction();
  const { data, isLoading } = useProductModelDetail(id);
  const methods = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data: any) => {
    try {
      await updateMutation.mutateAsync(data);
      toast.info('Update successfuly');
    } catch (error) {
      toast.error('Error when update');
    }
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
          <Button onClick={goBack} className="self-start">
            Back
          </Button>
          <h2 className="text-[30px] mb-[30px] font-bold">Edit Product Data Model</h2>
        </div>
        <div className="pt-[10px]">
          <ProductModelForm methods={methods} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}
