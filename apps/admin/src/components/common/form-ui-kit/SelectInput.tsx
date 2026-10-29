import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from '../../../model/FormItem';
import FormItemTitle from './FormItemTitle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../shadcn-ui-kit/select';
import ErrorMessage from './ErrorMessage';

interface SelectInputProps extends FormItem {
  options: {
    label: string;
    value: string;
  }[];
  onChange?: (value: string) => void;
  defaultValue?: string;
  readonly?: boolean;
}

export default function SelectInput({
  name,
  title,
  className,
  required,
  note,
  options,
  defaultValue,
  onChange
}: SelectInputProps) {
  const { control, formState, } = useFormContext();

  return (
    <div className={clsx(!!className && className, 'w-full')}>
      <FormItemTitle title={title} required={required} note={note} />
      <Controller
        name={name}
        control={control}
        rules={{
          required,
        }}
        render={({ field }) => (
          <Select onValueChange={onChange ? onChange : field.onChange} value={field.value} defaultValue={defaultValue}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options?.map(({ label, value }) => (
                <SelectItem value={value} key={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {formState.errors[name]?.type === 'required' && (
        <ErrorMessage message={`${title} is required`} />
      )}
    </div>
  );
}
