import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { Button } from '../shadcn-ui-kit/button';
import { Input } from '../shadcn-ui-kit/input';
import { InputTypeEnum } from '../../../enum/index';

export type DynamicNumberInputProps = {
  defaultValues?: any;
  name: string;
  title: string;
  type?: InputTypeEnum;
};

export default function DynamicNumberInput({
  defaultValues,
  name,
  title,
}: DynamicNumberInputProps) {
  const { setValue, control } = useFormContext();
  const { fields, remove, append } = useFieldArray({
    name,
    control,
  });

  const handleChange = (value: string, index: number) => {
    setValue(
      `${name}.${index}`, Number(value));
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
                    defaultValue={defaultValues?.[index] ?? ''}
                    onChange={(e) => {
                      handleChange(e.target.value, index);
                    }}
                    name={`${name}.${index}.value`}
                    className="w-full"
                    type="number"
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
