import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from '../../../model/FormItem';
import { Checkbox } from '../shadcn-ui-kit/checkbox';
import FormItemTitle from './FormItemTitle';

interface CheckboxInputProps extends FormItem {
  asChild?: boolean;
  defaultChecked?: boolean;
}

export default function CheckboxInput({
  name,
  title,
  className,
  hidden,
  required = false,
  readonly = false,
  note,
}: CheckboxInputProps) {
  const { control } = useFormContext();

  return (
    <div className={clsx(!!className && className, 'w-full flex items-baseline gap-2')}>
      <FormItemTitle title={title} required={required} note={note} />
      <Controller
        name={name}
        control={control}
        rules={{
          required,
        }}
        render={({ field }) => (
          <Checkbox
            {...field}
            checked={field.value}
            hidden={hidden}
            onCheckedChange={(value) => {
              field.onChange(value);
            }}
            disabled={readonly}
          />
        )}
      />
    </div>
  );
}
