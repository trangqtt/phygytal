import { MenuItem, Select } from '@mui/material';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from '@/models/FormItem';
import FormItemTitle from './FormItemTitle';

interface SelectInputProps extends FormItem {
  options: {
    label: string;
    value: string;
  }[];
  onChange?: Function;
  defaultValue?: string;
}

export default function SelectInput({
  name,
  title,
  className,
  required,
  note,
  options,
  defaultValue,
  onChange: handleChange,
}: SelectInputProps) {
  const { control } = useFormContext();

  return (
    <div className={clsx(!!className && className, 'w-full')}>
      <FormItemTitle title={title} required={required} note={note} />
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <Select
            fullWidth
            onChange={(e) => {
              onChange(e);
              handleChange?.(e);
            }}
            defaultValue={defaultValue ?? options[0].value}
            size="small"
            name={name}
          >
            {options.map(({ label, value } , i) => (
              <MenuItem key={i} value={value}>{label}</MenuItem>
            ))}
          </Select>
        )}
      />
    </div>
  );
}
