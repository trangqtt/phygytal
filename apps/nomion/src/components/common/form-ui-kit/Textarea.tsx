import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from '@/models/FormItem';
import FormItemTitle from './FormItemTitle';
import { Textarea as MuiTextarea } from '@mui/joy';

interface TextareaProps extends FormItem {}

export default function Textarea({
  name,
  title,
  placeholder,
  className,
  hidden,
  required,
  note,
}: TextareaProps) {
  const { control } = useFormContext();

  return (
    <div className={clsx(!!className && className, 'w-full')}>
      <FormItemTitle title={title} required={required} note={note} />
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <MuiTextarea {...field} placeholder={placeholder} size="lg" />
        )}
      />
    </div>
  );
}
