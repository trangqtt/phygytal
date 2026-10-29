import { Add, Close } from '@mui/icons-material';
import { TextField } from '@mui/material';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { FormItem } from '@/models/FormItem';
import FormItemTitle from './FormItemTitle';

interface DynamicTextInputProps extends FormItem {
  type?: 'input' | 'number';
}

export default function DynamicTextInput({
  name,
  title,
  placeholder,
  className,
  type = 'input',
}: DynamicTextInputProps) {
  const { control, getValues, setValue } = useFormContext();
  const defaultValues = getValues(name) ?? [];
  const [values, setValues] = useState<any[]>(defaultValues);

  const initValue = type === 'input' ? '' : 0;

  const handleAppend = () => {
    setValues((val: any[]) => {
      return [...val, initValue];
    });
  };

  const handleChange = (index: number, value: any) => {
    // update(index, value);

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
  }, [values, name, setValue]);

  return (
    <div className={clsx(className)}>
      <div className="flex gap-[10px] mb-[5px]">
        <FormItemTitle title={title} className="mb-[0px]" />
        <button onClick={handleAppend} type="button" className="h-[24px]">
          <Add className="button" />
        </button>
      </div>

      {values.map((val, index) => (
        <div key={index} className="flex mb-3 gap-1">
          <TextField
            placeholder={placeholder}
            type={type}
            size="small"
            fullWidth
            onChange={(e) => handleChange(index, e.target.value)}
            value={val}
          />
          <button onClick={() => handleRemove(index)} type="button">
            <Close className="button" color="action" />
          </button>
        </div>
      ))}
    </div>
  );
}
