import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { createMultiProductItem } from '../../api/product';
import Form, { FormProps } from '../common/form-ui-kit/Form';
import FormRow from '../common/form-ui-kit/FormRow';
import RichTextEditor from '../common/form-ui-kit/RichTextEditor';
import SelectInput from '../common/form-ui-kit/SelectInput';
import TextInput from '../common/form-ui-kit/TextInput';
import UploadImage from '../common/form-ui-kit/UploadImage';
import UploadVideo from '../common/form-ui-kit/UploadVideo';
import CheckboxInput from '../common/form-ui-kit/CheckboxInput';
import { Button } from '../common/shadcn-ui-kit/button';
import { useProductModels } from '../../hooks/fetch/useProductModels';
import { ModelField, ProductModelEntity } from '../../model/ProductModelEntity';
import { InputTypeEnum, ProductTabEnum } from '../../enum/index';
import DynamicRichTextInput from '../common/form-ui-kit/DynamicRichTextInput';
import DynamicImageInput from '../common/form-ui-kit/DynamicImageInput';
import DynamicNumberInput from '../common/form-ui-kit/DynamicNumerInput';
import DynamicVideoInput from '../common/form-ui-kit/DynamicVideoInput';
import { generateAuthOptions, transformProductModelsOptions } from '../../utils/helper';
import ObjectInput from '../common/form-ui-kit/ObjectInput';
import DynamicObjectInput from '../common/form-ui-kit/DynamicObjectInput';
import { FormType, SelectInputOption } from '../../model/general';
import DynamicBooleanInput from '../common/form-ui-kit/DynamicBooleanInput';
import ManagePageV2 from '../Theme/ManagePageV2';
import ManageMenu from '../Theme/ManageMenu';
import DynamicTextInput from '../common/form-ui-kit/DynamicTextInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/shadcn-ui-kit/tabs';
import ProductItems from './ProductItems';
import clsx from 'clsx';
import TranslationProductForm from './TranslationProductForm';
import { useOrganizationsSelect } from '../../hooks/fetch/useOrganizations';
import AddMoreProductItemDialog from './AddMoreProductItemDialog';
import Upload3D from '../common/form-ui-kit/Upload3d';
import { getAuthors } from '../../api/author';

export const productTypeOptions: SelectInputOption[] = [
  {
    label: 'Coffee',
    value: 'coffee',
  },
  {
    label: 'Astronaut',
    value: 'astronaut',
  },
  {
    label: 'Ortho',
    value: 'ortho',
  },
  {
    label: 'Sculpture',
    value: 'sculpture',
  },
];

export const productCreateStep = [
  ProductTabEnum.INFO,
  ProductTabEnum.MODEL,
  ProductTabEnum.TRANSLATION,
  ProductTabEnum.THEME,
];

export const languagesOptions = [
  {
    label: 'English',
    value: 'en',
  },
];

interface ProductProps extends FormProps {
  refetchData?(): void;
}

export const renderField = (field: ModelField) => {
  let RenderComponent: any;
  let type;

  const name = field.key;
  const title = field.label;
  switch (field.type) {
    case 'string':
      RenderComponent = field.is_array ? DynamicTextInput : TextInput;
      break;
    case 'html':
      RenderComponent = field.is_array ? DynamicRichTextInput : RichTextEditor;
      break;
    case 'float':
      RenderComponent = field.is_array ? DynamicNumberInput : TextInput;
      type = InputTypeEnum.FLOAT;
      break;
    case 'integer':
      RenderComponent = field.is_array ? DynamicNumberInput : TextInput;
      type = InputTypeEnum.INTEGER;
      break;
    case 'boolean':
      RenderComponent = field.is_array ? DynamicBooleanInput : CheckboxInput;
      break;
    case 'image':
      RenderComponent = field.is_array ? DynamicImageInput : UploadImage;
      break;
    case 'video':
      RenderComponent = field.is_array ? DynamicVideoInput : UploadVideo;
      break;
    case 'object':
      RenderComponent = field.is_array ? DynamicObjectInput : ObjectInput;
      break;
    default:
      RenderComponent = null;
      break;
  }
  return (
    RenderComponent && (
      <FormRow>
        <RenderComponent
          name={name}
          title={title}
          type={type}
          subFields={field?.sub_fields}
          renderField={renderField}
        />
      </FormRow>
    )
  );
};

const renderProductModelFields = (
  models: ProductModelEntity[],
  watchProductModels: any
) => {
  if (!models || !watchProductModels) return [];

  const dataFields = models.find((model) => model.id === watchProductModels)?.data_fields;
  if (!dataFields) return [];

  return dataFields.map((field) =>
    renderField({ ...field, key: `data_model_value.${field.key}` })
  );
};

export default function ProductForm({
  methods,
  type = FormType.CREATE,
  onSubmit,
  refetchData = () => {},
}: ProductProps) {
  const [tab, setTab] = useState(productCreateStep[0]);
  const watchProductModels = methods.watch('data_model_id');
  const { data: authsData } = useQuery(['auths'], getAuthors);

  const { data: orgsData } = useOrganizationsSelect();

  const params = useParams();
  const id = params.id;

  const handleChangeTab = (value: ProductTabEnum) => {
    setTab(value);
  };

  const handleStepChange = (value: string) => {
    if (value === 'next') {
      if (productCreateStep.indexOf(tab) < productCreateStep.length - 1) {
        setTab(productCreateStep[productCreateStep.indexOf(tab) + 1]);
      }
    }
    if (value === 'previous') {
      if (productCreateStep.indexOf(tab) > 0) {
        setTab(productCreateStep[productCreateStep.indexOf(tab) - 1]);
      }
    }
  };

  const { data: models } = useProductModels();

  const [toggleAddMore, setToggleAddMore] = useState<boolean>(false);

  const { mutate: createMultiProductItemMutation } = useMutation(
    (numItem: number) => createMultiProductItem(id!, Number(numItem)),
    {
      onSuccess() {
        refetchData();
        setToggleAddMore(false);
      },
    }
  );

  const onAddMoreItem = async (numItem: number) => {
    await createMultiProductItemMutation(numItem);
  };

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <Tabs
          value={tab}
          className="w-full"
          onValueChange={(value) => handleChangeTab(value as ProductTabEnum)}
        >
          <TabsList>
            <TabsTrigger value={ProductTabEnum.INFO}>Product info</TabsTrigger>
            <TabsTrigger value={ProductTabEnum.MODEL}>Product model</TabsTrigger>
            <TabsTrigger value={ProductTabEnum.TRANSLATION}>Translation</TabsTrigger>
            <TabsTrigger value={ProductTabEnum.THEME}>Product theme</TabsTrigger>
            {type === FormType.UPDATE && (
              <TabsTrigger value={ProductTabEnum.ITEM}>Product item</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="info">
            <FormRow>
              <SelectInput
                name="org_id"
                options={orgsData || []}
                title="Organization"
                required
              />
              <div className="w-full flex flex-col">
                <TextInput
                  name="total_item"
                  title="Total item"
                  readonly={type === FormType.UPDATE}
                  required
                  type={InputTypeEnum.INTEGER}
                />
                {type === FormType.UPDATE && (
                  <span
                    className="cursor-pointer text-[blue] w-fit"
                    onClick={() => setToggleAddMore(true)}
                  >
                    Add more
                  </span>
                )}
              </div>
            </FormRow>

            <FormRow>
              <TextInput name="product_name" title="Product name" />
              <SelectInput
                name="type"
                options={productTypeOptions}
                title="Product type"
                required
              />
            </FormRow>

            <FormRow>
              <RichTextEditor name="description" title="Description" />
            </FormRow>

            <FormRow>
              <DynamicTextInput name="tags" title="Tags" />
            </FormRow>

            <FormRow>
              <DynamicTextInput name="languages" title="Languages" />
            </FormRow>

            <FormRow>
              <UploadImage name="image" title="Image" />
            </FormRow>

            <FormRow>
              <UploadVideo name="video" title="Video" />
            </FormRow>

            <FormRow>
              <Upload3D name="three_dimension" title="3D" />
            </FormRow>

            <SelectInput
              name="author_id"
              options={generateAuthOptions(authsData ?? [])}
              title="Author"
            />

            {/* {renderProductAttributes()} */}
            <AddMoreProductItemDialog
              open={toggleAddMore}
              handleCloseModal={() => setToggleAddMore(false)}
              onAddMoreItem={onAddMoreItem}
            />
          </TabsContent>
          <TabsContent value="model">
            <FormRow>
              <SelectInput
                name="data_model_id"
                options={transformProductModelsOptions(models)}
                title="Model"
                required
              />
            </FormRow>
            {renderProductModelFields(models ?? [], watchProductModels)}
          </TabsContent>
          <TabsContent value="translation">
            <TranslationProductForm />
          </TabsContent>
          <TabsContent value="theme">
            <ManagePageV2 />
            <ManageMenu />
          </TabsContent>
          <TabsContent value="item">
            <ProductItems />
          </TabsContent>
        </Tabs>
        <div
          className={clsx(
            'px-12 py-2 mt-[20px] w-full bg-white shadow-gray-lg fixed bottom-0 right-0 flex justify-end z-50 gap-2',
            tab === 'item' && 'hidden'
          )}
        >
          {type === FormType.CREATE && (
            <>
              <Button
                type="button"
                onClick={() => handleStepChange('previous')}
                className={clsx(
                  tab === productCreateStep[0] && 'hidden',
                  'text-neutral-8 border border-neutral-5 bg-white'
                )}
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={() => handleStepChange('next')}
                className={clsx(
                  tab === productCreateStep[productCreateStep.length - 1] && 'hidden'
                )}
              >
                Next
              </Button>
            </>
          )}
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </>
  );
}
