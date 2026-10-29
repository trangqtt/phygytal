import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useOrganizationsSelect } from '../../hooks/fetch/useOrganizations';
import { useProductAction, useProductDetail } from '../../hooks/fetch/useProducts';
import { ProductType } from '../../model/ProductModel';
import { toProductData } from '../../transformers/product';
import BackdropLoader from '../common/BackdropLoader';
import { Button } from '../common/shadcn-ui-kit/button';
import ProductForm from './ProductForm';
import { FormType } from '../../model/general';

export default function EditProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const { data: orgsData, isLoading: isLoadingOrgs } = useOrganizationsSelect();

  const goBack = () => {
    navigate('/products');
  };

  const {
    data: product,
    isLoading,
    refetch: refetchProductDetail,
  } = useProductDetail(id, {
    enabled: false,
  });

  const productDetail = async () => {
    if (!!id) {
      const { data } = await refetchProductDetail();
      const { product } = data ?? {};

      return toProductData(product)
    }
    return undefined;
  }

  const methods = useForm({
    defaultValues: async () => productDetail(),
  });


  const { updateMutation } = useProductAction();

  const refetchData = () => {
    refetchProductDetail();
  };

  const onSubmit = async (formData: any) => {
    const { type, total_item, video, image, three_dimension } = formData;

    let requestData = {
      ...formData,
      image,
      total_item: Number(total_item),
      video,
      three_dimension,
    };
    let attribute = requestData.attribute;

    switch (type) {
      case ProductType.Coffee:
        attribute = {
          ...attribute,
          acidity: Number(attribute?.acidity || 0).toString(),
          sweet: Number(attribute?.sweet || 0).toString(),
          bitter: Number(attribute?.bitter || 0).toString(),
        };

        requestData = { ...requestData, attribute };
        break;
      case ProductType.Sculpture:
        requestData = { ...requestData, attribute };
      case ProductType.Astronaut:
        break;
      default:
        break;
    }

    await updateMutation.mutateAsync({ ...requestData, id });
    toast.info('Update product successfully');
  };

  return (
    <>
      <BackdropLoader open={isLoading || isLoadingOrgs || updateMutation.isLoading} />
      <div>
        <Button onClick={goBack}>Back</Button>
        <h2 className="text-[30px] mb-[30px] font-bold">Edit Product Detail</h2>
      </div>
      <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
        <div className="pt-[10px]  border-b-[1px] border-b-solid border-b-black pb-[60px]">
          <div className="w-full flex justify-between items-center">
            <h4 className="text-[20px] mb-[24px] font-bold">Product Info</h4>
          </div>
          {!isLoadingOrgs && (
            <ProductForm
              methods={methods}
              onSubmit={onSubmit}
              type={FormType.UPDATE}
              refetchData={refetchData}
            />
          )}
        </div>
      </div>
    </>
  );
}
