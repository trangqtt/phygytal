import { ModelField } from '../../../model/ProductModelEntity';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '../shadcn-ui-kit/accordion';

interface ObjectInputProps {
  name: string;
  title: string;
  subFields: any[];
  renderField(field: ModelField): any;
}

export default function ObjectInput({
  title,
  subFields,
  name,
  renderField,
}: ObjectInputProps) {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem className="shadow-md p-4" value={'abc'} key={name}>
        <AccordionTrigger itemScope className="font-medium">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          {subFields?.map((subField: ModelField) =>
            renderField({ ...subField, key: `${name}.${subField.key}` })
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
