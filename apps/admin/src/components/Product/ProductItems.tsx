import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getMappingByProductId,
  toggleClaim,
  unmap,
  updateMapping,
} from '../../api/mapping-tag';
import { getProductItems, mintNft } from '../../api/product';
import { showNFT, zeroID } from '../../constants';
import BackdropLoader from '../common/BackdropLoader';
import EditMappingDialog from './EditMappingDialog';
import { useOrganizationDetail } from '../../hooks/fetch/useOrganizations';
import TableData from '../common/TableData';

const columns: any[] = [
  { label: 'Product Item' },
  { label: 'Tag ID' },
  { label: 'External URL' },
  { label: 'Owner' },
];

function getUrlPreviewByOrgAndTagId(tagId: string, orgName: string): any {
  let url = `${import.meta.env.VITE_ITEM_BASE_URL}/${orgName}/${tagId}`;
  window.open(url, '_blank');
}

function getProductItemDataWithTagId(productItemData: any, mappingData: any): any {
  const mapping = mappingData?.mapping;
  const productItemWithTagId = productItemData?.map((item: any) => {
    const mappingItem = mapping?.find(
      (mappingItem: any) => mappingItem.product_item_id === item.id
    );
    return {
      ...item,
      product_name: `${item.product_name}#${item.item_index}`,
      tag_id: mappingItem?.tag_id,
      owner_name: mappingItem?.owner_name,
      external_url: mappingItem?.external_url,
      claimable: mappingItem?.claimable,
    };
  });
  return productItemWithTagId;
}

function getTagIdOptions(mappingDataItem: any, avaiableMapping: any): any {
  const mappingList = avaiableMapping?.concat(mappingDataItem || []);
  const tagIdOptions = mappingList?.map((item: any) => {
    return {
      label: item.tag_id,
      value: item.tag_id,
    };
  });
  return tagIdOptions;
}

const ProductItems = () => {
  const [openMappingModel, setOpenMappingModel] = useState(false);
  const [mappingItemData, setMappingItemData] = useState<any>(null);
  const params = useParams();
  const id = params.id;
  const queryClient = useQueryClient();
  const { data: productItemsData, isLoading: productItemLoading } = useQuery(
    ['product-items'],
    () => {
      return getProductItems(id as string);
    },
    {
      enabled: id !== undefined,
    }
  );

  const {
    data: mappingData,
    refetch,
    isLoading: mappingLoading,
  } = useQuery(
    ['mappings-by-product', id],
    () => {
      return getMappingByProductId(id as string);
    },
    {
      refetchOnWindowFocus: false,
      enabled: id !== undefined,
    }
  );

  const handleEdit = (index: number, mappingItem: any) => {
    refetch();
    setMappingItemData(mappingItem);
    setOpenMappingModel(true);
  };

  const { data: orgData } = useOrganizationDetail(mappingData?.mapping?.[0].org_id);
  const mutationMint = useMutation((productItemId: string) => mintNft(productItemId), {
    onSuccess() {
      queryClient.invalidateQueries('mappings-by-product');
    },
  });

  const mutationMap = useMutation(
    ({ tagId, update_mapping_request }: any) =>
      updateMapping(tagId, update_mapping_request),
    {
      onSuccess() {
        queryClient.invalidateQueries('mappings-by-product');
      },
      onError(error: any) {
        toast.error(error?.response?.data?.message || 'Error when map chip');
      },
    }
  );

  const mutationUnmap = useMutation(
    ({ tagId, productItemId }: any) => unmap(tagId, productItemId),
    {
      onSuccess() {
        queryClient.invalidateQueries('mapping-tag');
      },
      onError(error: any) {
        toast.error(error?.response?.data?.message || 'Error when unmap chip');
      },
    }
  );


  const handleChangeTag = async (tagId: string, productItemId: string) => {
    if (tagId !== zeroID) {
      const update_mapping_request = { product_item_id: productItemId };
      mutationMap.mutate({
        tagId,
        update_mapping_request,
      });
    } else {
      const oldTagId = mappingData?.mapping?.find(
        (item: any) => item.product_item_id === productItemId
      )?.tag_id;
      mutationUnmap.mutate({
        tagId: oldTagId,
        productItemId,
      });
    }
  };

  const handleChangeMapping = async (tagId: string, update_mapping_request: any) => {
    mutationMap.mutate({
      tagId,
      update_mapping_request,
    });
  };

  const onChangeClaimableProductItem = async (productItemId: string) => {
    await toggleClaim(productItemId);
    refetch();
  };

  const onMint = (productItemId: string) => {
    mutationMint.mutate(productItemId);
  };

  const mapping = mappingData?.mapping;
  const avaiableMapping = mapping?.filter((item: any) => item.product_item_id === zeroID);

  return (
    <>
      <BackdropLoader
        open={
          mutationMint.isLoading ||
          productItemLoading ||
          mappingLoading ||
          mutationMap.isLoading ||
          mutationUnmap.isLoading
        }
      />
      <TableData
        className="border rounded-md border-collapse mt-[10px]"
        columns={columns}
        data={getProductItemDataWithTagId(productItemsData, mappingData)}
        renders={[
          {
            field: 'product_name',
          },
          {
            field: 'tag_id',
          },
          {
            field: 'external_url',
          },
          {
            field: 'owner_name',
          },
        ]}
        actions={[
          {
            type: 'edit',
            action: (item, index) => handleEdit(index, item),
          },
          {
            type: 'preview',
            action: (item, index) =>
              getUrlPreviewByOrgAndTagId(item?.tag_id, orgData?.org_tag_name),
          },
        ]}
      ></TableData>

      <EditMappingDialog
        open={openMappingModel}
        listMapping={getTagIdOptions(mappingItemData, avaiableMapping)}
        setOpen={setOpenMappingModel}
        mappingItemData={mappingItemData}
        onChangeClaimableProductItem={onChangeClaimableProductItem}
        onMintNft={onMint}
        mutationMap={handleChangeMapping}
        showNFT={showNFT}
      />
    </>
  );
};

export default ProductItems;
