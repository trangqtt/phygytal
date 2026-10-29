import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../api/product';
import BackdropLoader from '../common/BackdropLoader';
import { Button } from '../common/shadcn-ui-kit/button';
import ProductForm from './ProductForm';
import { FormType } from '../../model/general';

export default function CreateProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const methods = useForm({
    defaultValues: {
      "translation.current_language": "en",
    }
  });

  const goBack = () => {
    navigate('/products');
  };

  const mutationCreateProduct = useMutation(
    (productData: any) => createProduct(productData),
    {
      onSuccess(_: any) {
        queryClient.invalidateQueries('allProducts');
        methods.reset();
        goBack();
      },
    }
  );

  const onSubmit = async (formData: any) => {

    await mutationCreateProduct.mutate(formData);
  };

  return (
    <>
      <BackdropLoader open={mutationCreateProduct.isLoading} />
      <div>
        <Button onClick={goBack}>Back</Button>
        <h2 className="text-[30px] mb-[30px] font-bold">Create Product</h2>
      </div>

      <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
        <div className="pt-[10px]  border-b-[1px] border-b-solid border-b-black pb-[60px]">
          <h4 className="text-[20px] mb-[24px] font-bold">Product Info</h4>
          <ProductForm
            methods={methods}
            onSubmit={onSubmit}
            type={FormType.CREATE}
          />
        </div>
      </div>
    </>
  );
}
