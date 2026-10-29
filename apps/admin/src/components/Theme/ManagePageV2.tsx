import { useState, useEffect } from 'react';
import Popup from '../common/Popup';
import Form from '../common/form-ui-kit/Form';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import FormRow from '../common/form-ui-kit/FormRow';
import TextInput from '../common/form-ui-kit/TextInput';
import { Button } from '../common/shadcn-ui-kit/button';
import SelectInput from '../common/form-ui-kit/SelectInput';
import HomeSection from '../Section/HomeSection';
import ImageTextSection from '../Section/ImageTextSection';
import TableData from '../common/TableData';
import { TableColumn } from '../../model/general';
import { useProductModelDetail } from '../../hooks/fetch/useProductModels';
import { useMutation } from 'react-query';
import { createWebpage, updateWebpage } from '../../api/webpage';
import CarouselSection from '../Section/CarouselSection';
import ContactSection from '../Section/ContactSection';
import AuthorSection from '../Section/AuthorSection';
import CheckboxInput from '../common/form-ui-kit/CheckboxInput';

export enum PageTypeEnums {
  Home = 'home',
  ImageText = 'imagetext',
  Carousel = 'carousel',
  Author = 'author',
  Contact = 'contact',
}

const pageTypeOptions = [
  {
    label: 'Home',
    value: PageTypeEnums.Home,
  },
  {
    label: 'Image-Text',
    value: PageTypeEnums.ImageText,
  },
  {
    label: 'Carousel',
    value: PageTypeEnums.Carousel,
  },
  {
    label: 'Author',
    value: PageTypeEnums.Author,
  },
  {
    label: 'Contact',
    value: PageTypeEnums.Contact,
  },
];

const columns: TableColumn[] = [{ label: 'Name' }, { label: 'Type' }];

const ManagePageV2 = () => {
  const { control, watch: watchProductForm, setValue, getValues } = useFormContext();
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [open, setOpen] = useState<boolean>(false);
  const {
    fields,
    append,
    remove: removePage,
    update,
    swap: swapOrderPage,
  } = useFieldArray({
    control,
    name: 'theme_pages',
    keyName: 'field_id',
  });
  const {
    append: appendPageId,
    swap: swapPageId,
    remove: removePageId,
  } = useFieldArray({
    control,
    name: 'theme.page_ids',
  });

  const pageFormMethods = useForm();
  const { reset: resetPageForm, watch: watchPageForm } = pageFormMethods;
  const watchPageTypeValue = watchPageForm('type');

  const watchProductDataModel = watchProductForm('data_model_id');
  const { data: dataModelDetail } = useProductModelDetail(watchProductDataModel);
  const modelDataFields = dataModelDetail?.data_fields ?? [];

  const mutationCreatePage = useMutation((pageData: any) => createWebpage(pageData), {
    onSuccess(data) {
      append(data);
      appendPageId(data.id);
    },
  });

  const mutationUpdatePage = useMutation(
    ({ id, ...pageData }: any) => updateWebpage(id, pageData),
    {}
  );

  const handleEdit = (index: number) => {
    setFormMode('edit');
    setOpen(true);
    const data: any = fields[index];
    resetPageForm(data);
  };

  const handleRemove = (index: number) => {
    removePage(index);
    removePageId(index);
  };

  const onSubmit = (data: any) => {
    if (formMode === 'create') {
      mutationCreatePage.mutate(data);
    } else {
      mutationUpdatePage.mutate(data);
      const index = fields.findIndex((field: any) => field.id === data?.id);
      update(index, data);
    }
    setOpen(false);
  };

  const handleClickNewPage = () => {
    resetPageForm({
      name: '',
      type: '',
      has_animation: false,
    });
    setFormMode('create');
    setOpen(true);
  };

  const renderPageInput = () => {
    switch (watchPageTypeValue) {
      case PageTypeEnums.Home:
        return <HomeSection dataFields={modelDataFields} />;
      case PageTypeEnums.ImageText:
        return <ImageTextSection dataFields={modelDataFields} />;
      case PageTypeEnums.Carousel:
        return <CarouselSection dataFields={modelDataFields} />;
      case PageTypeEnums.Author:
        return <AuthorSection dataFields={modelDataFields} />;
      case PageTypeEnums.Contact:
        return <ContactSection dataFields={modelDataFields} />;
      default:
        return null;
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    swapPageId(result.source.index, result.destination.index);
    swapOrderPage(result.source.index, result.destination.index);
  };

  return (
    <>
      <Button onClick={handleClickNewPage} type="button" className="mt-4">
        Add new Page
      </Button>
      {!!fields?.length && (
        <TableData
          isDrag={true}
          handleDragEnd={handleDragEnd}
          className="border rounded-md border-collapse mt-[10px]"
          columns={columns}
          data={fields}
          renders={[
            {
              field: ['name'],
            },
            {
              field: ['type'],
            },
          ]}
          actions={[
            {
              type: 'edit',
              action: (item, index) => handleEdit(index as number),
            },
            {
              type: 'delete',
              action: (item, index) => handleRemove(index as number),
            },
          ]}
        ></TableData>
      )}
      <Popup
        open={open}
        onOpenChange={setOpen}
        className="max-w-[calc(100vw-80px)] h-full max-h-[calc(100vh-80px)] overflow-scroll"
        actionEle={
          <>
            <Button
              onClick={() => {
                setOpen(false);
                setFormMode('create');
              }}
            >
              Cancel
            </Button>
            <Button onClick={pageFormMethods.handleSubmit(onSubmit)}>Save</Button>
          </>
        }
      >
        <Form methods={pageFormMethods} onSubmit={onSubmit}>
          <FormRow>
            <TextInput name="name" title="Page name" required />
            <SelectInput
              name="type"
              title="Page type"
              options={pageTypeOptions}
              required
            />
          </FormRow>
          <FormRow>
            <CheckboxInput name="has_animation" title="Use Animation" />
          </FormRow>
          {renderPageInput()}
        </Form>
      </Popup>
    </>
  );
};

export default ManagePageV2;
