import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createCollection,
  deleteCollection,
  getCollectionDetail,
  getCollections,
  updateCollection,
} from '../../api/collection';

const collectionsKey = 'collections';

export function useCollections(options?: any) {
  const query = useQuery([collectionsKey], getCollections, {
    ...options
  });
  return query;
}

export function useCollectionDetail(id?: string, options?: any) {
  const query = useQuery([collectionsKey, id], () => getCollectionDetail(id!), {
    enabled: !!id,
    ...options,
  });

  return query;
}

export function useCollectionAction() {
  const queryClient = useQueryClient();

  const clearCollectionCache = () => {
    queryClient.invalidateQueries(collectionsKey);
  };

  const deleteMutation = useMutation(
    (collectionId: string) => deleteCollection(collectionId),
    {
      onSuccess() {
        clearCollectionCache();
      },
    }
  );

  const updateMutation = useMutation(
    (collectionData: any) => updateCollection(collectionData),
    {
      onSuccess() {
        clearCollectionCache();
      },
    }
  );

  const createMutation = useMutation(
    (collectionData: any) => createCollection(collectionData),
    {
      onSuccess() {
        clearCollectionCache();
      },
    }
  );

  return {
    deleteMutation,
    updateMutation,
    createMutation,
  };
}
