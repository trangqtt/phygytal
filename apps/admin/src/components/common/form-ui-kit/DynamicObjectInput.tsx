import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { ModelField } from '../../../model/ProductModelEntity';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '../shadcn-ui-kit/accordion';
import { Button } from '../shadcn-ui-kit/button';
import Popup from '../Popup';
import { useState } from 'react';
import Form from './Form';
import TableData, { Render } from '../TableData';
import { TableColumn } from '../../../model/general';

interface DynamicObjectInputProps {
  name: string;
  title: string;
  subFields: ModelField[];
  renderField(field: ModelField): any;
}

const transformTableColumns = (subFields: ModelField[]): TableColumn[] => {
  return subFields?.map((field) => ({
    label: field.label,
  }));
};

const transformTableRenderFields = (subFields: ModelField[]): Render[] => {
  return subFields?.map((field) => {
    const isMediaType =
      field.type === 'image' || field.type === 'video' || field.type === '3D';
    return {
      field: isMediaType ? [field.key, 'url'] : [field.key],
    };
  });
};

export default function DynamicObjectInput({
  title,
  subFields,
  name,
  renderField,
}: DynamicObjectInputProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  const objectInputMethods = useForm();

  const handleCloseModal = () => {
    objectInputMethods.reset();
    setOpen(false);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };

  const onSubmit = (data: any) => {
    append({ ...data });
    handleCloseModal();
  };

  return (
    <>
      <Accordion type="multiple" className="w-full">
        <AccordionItem className="shadow-md p-4" value={'abc'} key={name}>
          <AccordionTrigger itemScope className="font-medium">
            {title}
          </AccordionTrigger>
          <AccordionContent>
            <Button type="button" onClick={handleOpenModal}>
              Add {title}
            </Button>
            {!!fields?.length && (
              <TableData
                className="w-full"
                columns={transformTableColumns(subFields ?? [])}
                data={fields}
                renders={transformTableRenderFields(subFields)}
                actions={[
                  {
                    type: 'delete',
                    action: (_, index) => remove(index),
                  },
                ]}
              ></TableData>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Popup
        title={title}
        open={open}
        onOpenChange={setOpen}
        actionEle={
          <>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={objectInputMethods.handleSubmit(onSubmit)}>Save</Button>
          </>
        }
      >
        <Form methods={objectInputMethods} onSubmit={onSubmit}>
          {subFields?.map((subField: ModelField) => renderField({ ...subField }))}
        </Form>
      </Popup>
    </>
  );
}
