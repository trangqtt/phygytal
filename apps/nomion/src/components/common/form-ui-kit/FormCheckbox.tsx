import { CheckBox } from '@mui/icons-material';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from '@/models/FormItem';
import FormItemTitle from './FormItemTitle';

interface FormCheckboxProps extends FormItem {}

export default function FormCheckbox({ name, title, className }: FormCheckboxProps) {
  const { control } = useFormContext();

  return (
    <div className={clsx(className)}>
      <FormItemTitle title={title} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel {...field} control={<Checkbox />} label={'Yes'} />
          // <CheckBox
          //   {...field}
          //   checked={field.value}
          //   // onChange={(e) => props.onChange(e.target.checked)}
          // />
        )}
      />
    </div>
  );
}
