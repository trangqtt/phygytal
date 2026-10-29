import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../common/shadcn-ui-kit/button';
import { Input } from '../common/shadcn-ui-kit/input';

const fieldname = 'languages';

export default function ManageLanguage({ defaultValues }: { defaultValues?: any }) {
  const { setValue } = useFormContext();
  const [values, setValues] = useState<any[]>(defaultValues ?? []);

  const initValue = '';
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
    setValue(fieldname, values);
  }, [values]);

  return (
    <div>
      <Button type="button" onClick={handleAppend}>
        Add language
        <PlusIcon />
      </Button>
      <div className="mt-[10px] flex gap-[32px]">
        {values.map((val, index) => (
          <div key={index} className="flex mb-3 gap-1">
            <Input
              onChange={(e) => handleChange(index, e.target.value)}
              value={val}
              className="w-full"
              type="text"
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
