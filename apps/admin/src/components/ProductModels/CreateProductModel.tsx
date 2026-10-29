import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useProductModelAction } from '../../hooks/fetch/useProductModels';
import { Button } from '../common/shadcn-ui-kit/button';
import ProductModelForm from './ProductModelForm';
import { toast } from 'react-toastify';

export type Props = {};

export default function CreateProductModel({}: Props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/models');
  };

  const { createMutation } = useProductModelAction();
  const methods = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data: any) => {
    await createMutation.mutateAsync(data);
    toast.info("Create Product Model successful")
    goBack();
  };

  return (
    <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
      <div>
        <Button onClick={goBack} className="self-start">
          Back
        </Button>
        <h2 className="text-[30px] mb-[30px] font-bold">Model Info</h2>
      </div>
      <div className="pt-[10px]">
        <ProductModelForm methods={methods} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
