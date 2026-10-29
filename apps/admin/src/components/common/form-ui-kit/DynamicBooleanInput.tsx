import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../shadcn-ui-kit/button';
import { Checkbox } from '../shadcn-ui-kit/checkbox';

export type DynamicTextInputProps = {
  defaultValues?: boolean[];
  name: string;
  title: string;
};

export default function DynamicBooleanInput({
  defaultValues,
  name,
  title,
}: DynamicTextInputProps) {
  const { setValue, watch } = useFormContext();
  const [values, setValues] = useState<any[]>(defaultValues ?? []);

  const initValue = false;
  const handleAppend = () => {
    setValues((val: any[]) => {
      return [...val, initValue];
    });
  };

  const handleChange = (index: number, value: any) => {
    setValues((val: any[]) => {
      return val.map((v, i) => {
        if (i === index) {
          return value;
        } else {
          return v;
        }
      });
    });
  };

  const handleRemove = (index: number) => {
    setValues((val: any[]) => {
      return val.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    setValue(name, values);
  }, [values]);

  return (
    <div>
      <Button type="button" onClick={handleAppend}>
        Add {title}
        <PlusIcon />
      </Button>
      <div className="mt-[10px] flex gap-[32px] flex-wrap">
        {values.map((val, index) => (
          <div key={index} className="flex mb-3 gap-1">
            <Checkbox
              onCheckedChange={(value) => handleChange(index, value)}
              defaultChecked={val}
            />
            <Button onClick={() => handleRemove(index)} type="button" size="icon">
              <Cross2Icon className="button" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
