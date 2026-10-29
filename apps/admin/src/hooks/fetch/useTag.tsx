import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  createTag,
  createTagByFile,
  deleteTag,
  getTagDetail,
  getTags,
  updateTag,
} from '../../api/tag';
import { TagItem } from '../../model/TagModel';

const tagsKey = 'tags';

export function useTags() {
  const query = useQuery([tagsKey], getTags);
  return query;
}

export function useTagDetail(id?: string, options?: any) {
  const query = useQuery([tagsKey, id], () => getTagDetail(id!), {
    enabled: !!id,
    ...options,
  });
  return query;
}

export function useTagAction() {
  const queryClient = useQueryClient();

  const clearTagCache = (id?: any) => {
    queryClient.invalidateQueries([tagsKey, id]);
  };

  const deleteMutation = useMutation((tagId: string) => deleteTag(tagId), {
    onSuccess(tagId: string) {
      toast.success('Delete tag successful');
      clearTagCache(tagId);
    },
  });

  const updateMutation = useMutation((tagData: TagItem) => updateTag(tagData), {
    onSuccess() {
      toast.success('Upadted tag successful');
      clearTagCache();
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || 'Update tag failed');
      clearTagCache();
    },
  });

  const createMutation = useMutation((tagData: TagItem) => createTag(tagData), {
    onSuccess(data: TagItem) {
      toast.success(`TagId ${data.tag_id} was added successful`);
      clearTagCache();
    },
    onError(err: any) {
      console.log('err', err);
      toast.error(err?.response?.data?.message || 'Update tag failed');
      clearTagCache();
    },
  });

  const createTagByFileMutation = useMutation((data: any) => createTagByFile(data), {
    onSuccess() {
      toast.success(`TagId was added successful`);
      clearTagCache();
    },
    onError(err) {
      console.log('err', err);
      clearTagCache();
    },
  });

  return {
    deleteMutation,
    updateMutation,
    createMutation,
    createTagByFileMutation,
  };
}
