import { TextField } from '@mui/material';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from '@/models/FormItem';
import ErrorMessage from './ErrorMessage';
import FormItemTitle from './FormItemTitle';

interface TextInputProps extends FormItem {
  type?: 'input' | 'number' | 'email' | 'password';
}



export default function TextInput({
  name,
  title,
  placeholder,
  className,
  type,
  hidden,
  required = false,
  note,
  label
}: TextInputProps) {
  const { control, formState, register } = useFormContext();
  return (
    <div className={clsx(!!className && className, 'w-full text-input')}>
      <FormItemTitle title={title} required={required} note={note} />
      <input className='text-input' {...register(name)} type={type} placeholder={placeholder ?? label} required={required} />
      {/* <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="filled"
            required={required}
            type={type}
            placeholder={placeholder}
            fullWidth
            hidden={hidden}
            size="small"
            label={label}
          />
        )}
      /> */}
      {formState.errors[name]?.type === 'required' && (
        <ErrorMessage message={`${title} is required`} />
      )}
    </div>
  );
}
