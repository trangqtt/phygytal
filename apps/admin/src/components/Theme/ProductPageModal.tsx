import { FC, ReactElement, useEffect } from 'react';
import { Dialog } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createPage, getPageDetail, updatePage } from '../../api/page';
import PageForm from '../Webpages/PageForm/PageForm';

export type ProductPageModalProps = {
  open: boolean;
  onClose(): void;
  selectedId?: string;
  productId: string;
};

const ProductPageModal: FC<ProductPageModalProps> = (props): ReactElement => {
  const { open, onClose, selectedId, productId } = props;
  // const pageMutation = useMutation(
  const queryClient = useQueryClient();

  const mutationCreatePage = useMutation((pageData: any) => createPage(pageData), {
    onSuccess() {
      queryClient.invalidateQueries();
    },
  });
  const mutationUpdatePage = useMutation((pageData: any) => updatePage(pageData), {
    onSuccess() {
      queryClient.invalidateQueries();
    },
  });
  const mode = !!selectedId ? 'edit' : 'create';

  const { data, isLoading } = useQuery(
    ['pageDetail', selectedId],
    () => getPageDetail(selectedId!),
    {
      enabled: !!selectedId,
    }
  );

  const methods = useForm({
    defaultValues: {
      name: '',
      title: '',
      id: null,
      theme: 'home',
    },
  });

  useEffect(() => {
    if (mode === 'edit' && !!data) {
      const name = data['name'];
      const theme = data['theme'];
      const attributes: any[] = data['Attributes'];

      methods.setValue('name', name);
      methods.setValue('theme', theme);

      attributes?.forEach((attr, i) => {
        const key: any = Object.keys(attr)[0];
        const value = attr[key];
        if (key) {
          methods.setValue(key, value);
        }
      });
    }
  }, [data]);

  const onSubmit = (data: any) => {
    const { id, name, theme, ...others } = data;
    const attributes: any[] = [];

    Object.keys(others)?.forEach((attrKey) => {
      if (others[attrKey]) {
        attributes.push({
          [attrKey]: others[attrKey],
        });
      }
    });

    if (mode === 'edit') {
      mutationUpdatePage.mutate({
        ID: selectedId,
        name,
        theme,
        attributes,
      });
    } else {
      mutationCreatePage.mutate({
        productId,
        webpage: {
          name,
          theme,
          attributes,
        },
      });
    }

    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} fullWidth onClose={onClose} maxWidth="lg">
      <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
        <div className="cursor-pointer absolute right-[10px] top-0" onClick={handleClose}>
          x
        </div>
        <div className="pt-[10px]">
          <PageForm methods={methods} onSubmit={onSubmit} key={selectedId} />
        </div>
      </div>
    </Dialog>
  );
};

export default ProductPageModal;
