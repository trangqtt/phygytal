import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createProductModel,
  deleteProductModel,
  getProductModelDetail,
  getProductModels,
  updateProductModel,
} from '../../api/productModel';

const productModelsKey = 'productModels';

export function useProductModels(options?: any) {
  const query = useQuery([productModelsKey], getProductModels, {
    ...options
  });
  return query;
}

export function useProductModelDetail(id?: string, options?: any) {
  const query = useQuery([productModelsKey, id], () => getProductModelDetail(id!), {
    enabled: !!id,
    ...options,
  });

  return query;
}

export function useProductModelAction() {
  const queryClient = useQueryClient();

  const clearProductModelCache = () => {
    queryClient.invalidateQueries(productModelsKey);
  };

  const deleteMutation = useMutation(
    (productModelId: string) => deleteProductModel(productModelId),
    {
      onSuccess() {
        clearProductModelCache();
      },
    }
  );

  const updateMutation = useMutation(
    (productModelData: any) => updateProductModel(productModelData),
    {
      onSuccess() {
        clearProductModelCache();
      },
    }
  );

  const createMutation = useMutation(
    (productModelData: any) => createProductModel(productModelData),
    {
      onSuccess() {
        clearProductModelCache();
      },
    }
  );

  return {
    deleteMutation,
    updateMutation,
    createMutation,
  };
}
