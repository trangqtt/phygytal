import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from '../common/form-ui-kit/Form';
import FormItemTitle from '../common/form-ui-kit/FormItemTitle';
import FormRow from '../common/form-ui-kit/FormRow';
import TextInput from '../common/form-ui-kit/TextInput';
import { Button } from '../common/shadcn-ui-kit/button';
import Popup from '../common/Popup';
import CheckboxInput from '../common/form-ui-kit/CheckboxInput';
import SelectInput from '../common/form-ui-kit/SelectInput';

type EditMappingDialogProps = {
  open: boolean;
  setOpen(open: boolean): void;
  mappingItemData: any;
  listMapping: any;
  onChangeClaimableProductItem(productItemId: string): void;
  onMintNft(productItemId: string): void;
  mutationMap(tagId: string, update_mapping_request: any): void;
  showNFT: boolean;
};

export default function EditMappingDialog({
  open,
  setOpen,
  mappingItemData,
  listMapping,
  onChangeClaimableProductItem,
  onMintNft,
  mutationMap,
  showNFT,
}: EditMappingDialogProps) {
  const methods = useForm();
  useEffect(() => {
    if (!!mappingItemData) {
      const { claimable, external_url, tag_id } = mappingItemData;
      const productData = {
        claimable,
        external_url,
        tag_id,
      };
      methods.reset(productData);
    }
  }, [mappingItemData]);
  
  const onSubmit = async (data: any) => {
    mutationMap(mappingItemData?.tag_id, data);
    onChangeClaimableProductItem(mappingItemData?.product_item_id);
  };

  return (
    <Popup
      title="Mapping"
      open={open}
      onOpenChange={setOpen}
      actionEle={
        <Button
          type="submit"
          className="mt-[20px] w-full"
          onClick={methods.handleSubmit(onSubmit)}
        >
          Save
        </Button>
      }
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <FormRow>
          <CheckboxInput
            className="flex items-baseline gap-3"
            name="claimable"
            title="Allow Claim"
            readonly={mappingItemData?.owner_id || mappingItemData?.owner_email}
            defaultChecked={mappingItemData?.claimable}
          />
        </FormRow>
        <FormRow>
          <SelectInput title="Tag ID" name="tag_id" options={listMapping || []} />
        </FormRow>
        {showNFT && (
          <FormRow className="flex-col">
            <FormItemTitle
              title={`Dygital asset Status: ${
                mappingItemData?.digital_asset_status || 'Not minted'
              }`}
            />
            <div className="flex items-baseline gap-3">
              <FormItemTitle title="Mint" />
              <Button
                disabled={mappingItemData?.digital_asset_status}
                onClick={() => onMintNft(mappingItemData?.product_item_id)}
              >
                Mint
              </Button>
            </div>
          </FormRow>
        )}
        <FormRow>
          <TextInput name="external_url" title="External URL" />
        </FormRow>
      </Form>
    </Popup>
  );
}
