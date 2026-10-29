import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { Button } from '../shadcn-ui-kit/button';
import { Input } from '../shadcn-ui-kit/input';
import { InputTypeEnum } from '../../../enum/index';

export type DynamicTextInputProps = {
  defaultValues?: any;
  name: string;
  title: string;
  type?: InputTypeEnum;
};

export default function DynamicTextInput({
  defaultValues,
  name,
  title,
}: DynamicTextInputProps) {
  const { control } = useFormContext();
  const { fields, remove, append, update } = useFieldArray({
    name,
    control,
  });

  const handleChange = (value: string, index: number) => {
    update(index, value);
  };

  return (
    <div>
      <Button type="button" onClick={() => append('')}>
        Add {title}
        <PlusIcon />
      </Button>
      <div className="mt-[10px] flex gap-[32px]">
        {fields.map((item, index) => (
          <div key={item.id} className="flex mb-3 gap-1">
            <Controller
              name={`${name}.${index}`}
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    className="w-full"
                    formNoValidate={true}
                  />
                );
              }}
            />
            <Button onClick={() => remove(index)} type="button" size="icon">
              <Cross2Icon className="button" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
