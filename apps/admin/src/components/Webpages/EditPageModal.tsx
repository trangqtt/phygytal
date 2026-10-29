import { Close } from '@mui/icons-material';
import { Dialog, DialogTitle } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getWebpage, updateWebpage } from '../../api/webpage';
import PageForm from '../Webpages/PageForm/PageForm';
import BackdropLoader from '../common/BackdropLoader';

interface Props {
  pageId: string;
  open: boolean;
  handleCloseModal(): void;
}

export default function EditPageModal({ pageId, open, handleCloseModal }: Props) {
  const queryClient = useQueryClient();

  const mutationUpdatePage = useMutation(
    ({ pageId, pageData }: any) => updateWebpage(pageId, pageData),
    {
      onSuccess() {
        queryClient.invalidateQueries('pages');
        handleCloseModal();
      },
    }
  );

  const methods = useForm({
    defaultValues: {
      name: '',
      title: '',
      urlLink: '',
      id: null,
      type: 'home',
    },
  });

  const { data, isFetching, isLoading } = useQuery(
    ['pages', pageId],
    () => getWebpage(pageId!),
    {
      enabled: !!pageId,
    }
  );

  useEffect(() => {
    if (!!data) {
      methods.reset(data);
    }
  }, [data]);

  const onSubmit = async (data: any) => {
    const { name, urlLink, type, attributes } = data;
    
    mutationUpdatePage.mutate({
      pageId,
      pageData: {
        url_link: urlLink ?? '',
        name,
        type,
        attributes,
      },
    });
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseModal} maxWidth="xl">
        <BackdropLoader open={isFetching} />

        <div className="min-w-[1000px]">
          <button onClick={handleCloseModal} className="flex justify-end p-[8px] w-full">
            <Close />
          </button>
          <DialogTitle>Edit page</DialogTitle>
          <PageForm methods={methods} onSubmit={onSubmit} />
        </div>
      </Dialog>
    </>
  );
}
