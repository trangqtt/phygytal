import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  cloneProduct,
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductDetail,
  updateProduct,
} from '../../api/product';

const productsKey = 'products';

export function useProducts(options?: any) {
  const query = useQuery([productsKey], getAllProduct, {
    ...options,
  });
  return query;
}

export function useProductDetail(id?: string, options?: any) {
  const query = useQuery([productsKey, id], () => getProductDetail(id!), {
    enabled: !!id,
    ...options,
  });

  return query;
}

export function useProductAction() {
  const queryClient = useQueryClient();

  const clearProductCache = () => {
    queryClient.invalidateQueries(productsKey);
  };

  const deleteMutation = useMutation((productId: string) => deleteProduct(productId), {
    onSuccess() {
      clearProductCache();
    },
  });

  const cloneMutation = useMutation((productId: string) => cloneProduct(productId), {
    onSuccess() {
      clearProductCache();
    },
  });

  const updateMutation = useMutation((productData: any) => updateProduct(productData), {
    onSuccess() {
      clearProductCache();
    },
  });

  const createMutation = useMutation((productData: any) => createProduct(productData), {
    onSuccess() {
      clearProductCache();
    },
  });

  return {
    cloneMutation,
    deleteMutation,
    updateMutation,
    createMutation,
  };
}
