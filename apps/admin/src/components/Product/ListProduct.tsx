import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from 'usehooks-ts';
import { useOrganizationsSelect } from '../../hooks/fetch/useOrganizations';
import { useProductAction, useProducts } from '../../hooks/fetch/useProducts';
import BackdropLoader from '../common/BackdropLoader';
import { useConfirmModal } from '../common/ConfirmModal';
import TableData from '../common/TableData';
import { Button } from '../common/shadcn-ui-kit/button';
import { Input } from '../common/shadcn-ui-kit/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../common/shadcn-ui-kit/select';
import { getFilterProducts } from '../../utils/helper';
import Typo from '../common/Typo';

const columns: any[] = [
  {
    label: 'Product name',
  },
  { label: 'Organization' },

  { label: 'Created date' },
];

export default function Products() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const [selectedOrg, setSelectedOrg] = useState('all');

  const { data: orgsData, isLoading: isLoadingOrg } = useOrganizationsSelect();
  const { data: products, isLoading: isLoadingProduct } = useProducts();
  const navigate = useNavigate();
  const { openModal } = useConfirmModal();

  const { cloneMutation, deleteMutation } = useProductAction();

  const handleNew = () => {
    navigate('create');
  };

  const handleEditProduct = (id: string) => {
    navigate(`/products/edit/${id}`);
  };

  const confirmClone = async (id: string) => {
    await cloneMutation.mutateAsync(id);
    toast.info('Clone product successful');
  };

  const confirmDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    toast.info('Delete product successful');
  };

  return (
    <>
      <BackdropLoader
        open={
          isLoadingProduct ||
          isLoadingOrg ||
          cloneMutation.isLoading ||
          deleteMutation.isLoading
        }
      />
      <div className="flex flex-col w-full h-full gap-[20px]">
        <div className="flex justify-between">
          <Typo variants="h6">List Product</Typo>
          {/* <Typo variants='h6'>List Product</p> */}

          <Button onClick={handleNew}>New Product</Button>
        </div>

        <div className="flex gap-12">
          <div className="flex gap-2 items-center justify-between">
            <p className="flex-1">Tìm kiếm:</p>
            <Input
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              value={searchValue}
              className="bg-white w-48"
              placeholder="Tên sản phẩm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span>Organization:</span>
            <Select onValueChange={(value: string) => setSelectedOrg(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Organization" defaultValue={selectedOrg} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'all'}>All</SelectItem>
                {orgsData?.map(({ label, value }, index) => (
                  <SelectItem value={value} key={index}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TableData
          columns={columns}
          data={getFilterProducts(products, debouncedValue, selectedOrg)}
          renders={[
            {
              field: 'product_name',
            },
            {
              field: ['organization', 'org_name'],
            },
            {
              field: 'created_at',
              type: 'date',
            },
          ]}
          actions={[
            {
              type: 'edit',
              action: (item) => handleEditProduct(item['id']),
            },
            {
              type: 'clone',
              action: (item) => confirmClone(item['id']),
            },
            {
              type: 'delete',
              action: (item) => confirmDelete(item['id']),
            },
            {
              type: 'preview',
              action: (item) => window.open(`${import.meta.env.VITE_ITEM_BASE_URL}/${item['preview_url']}`),
            },
          ]}
        />
      </div>
    </>
  );
}
