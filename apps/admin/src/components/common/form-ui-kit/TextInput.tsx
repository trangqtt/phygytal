import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from '../../../model/FormItem';
import ErrorMessage from './ErrorMessage';
import FormItemTitle from './FormItemTitle';
import { Input } from '../shadcn-ui-kit/input';
import { InputTypeEnum } from '../../../enum/index';

interface TextInputProps extends FormItem {
  type?: InputTypeEnum;
  min?: string;
}

const integerRegex = /[^-0-9]/g;

export default function TextInput({
  name,
  title,
  placeholder,
  className,
  hidden,
  required = false,
  readonly = false,
  note,
  type,
  defaultValue
}: TextInputProps) {
  const { control, formState, watch, setValue } = useFormContext();
  const handleChangeInput = (e: any) => {
    // if (type === InputTypeEnum.INTEGER) {
    //   setValue(name, Number(e.target.value.replace(integerRegex, '')));
    //   return;
    // } else if (type === InputTypeEnum.FLOAT) {
    //   setValue(name, Number(e.target.value));
    //   return;
    // }
    setValue(name, type ? Number(e.target.value) : e.target.value);
  };

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
          <Input
            {...field}
            className="w-full"
            placeholder={placeholder}
            hidden={hidden}
            disabled={readonly}
            onChange={handleChangeInput}
            type={type ? 'number' : 'text'}
            defaultValue={defaultValue}
          />
        )}
      />
      {formState.errors[name]?.type === 'required' && (
        <ErrorMessage message={`${title} is required`} />
      )}
    </div>
  );
}
