import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from '../../../model/FormItem';
import { Switch } from '../shadcn-ui-kit/switch';
import FormItemTitle from './FormItemTitle';

interface TextInputProps extends FormItem {
  asChild?: boolean;
  defaultChecked?: boolean;
}

export default function SwitchInput({
  name,
  title,
  className,
  hidden,
  required = false,
  readonly = false,
  note,
}: TextInputProps) {
  const { control } = useFormContext();
  return (
    <div className={clsx(!!className && className, 'w-full flex items-baseline gap-2')}>
      <FormItemTitle title={title} required={required} note={note} />
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        rules={{
          required,
        }}
        render={({ field }) => (
          <Switch
            {...field}
            hidden={hidden}
            onCheckedChange={(value: boolean) => {
              field.onChange(value);
            }}
            disabled={readonly}
          />
        )}
      />
    </div>
  );
}
