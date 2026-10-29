import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import FormItemTitle from './FormItemTitle';
import { FormItem } from '@/models/FormItem';

interface DateTimeInputProps extends FormItem {
  format?: string;
}

export default function DateTimeInput({
  name,
  title,
  className,
  required,
  note,
  format = 'dd/MM/yyyy, HH:mm',
}: DateTimeInputProps) {
  const { control, formState } = useFormContext();

  return (
    <div className={clsx(!!className && className, 'w-full datetime-picker')}>
      <FormItemTitle title={title} required={required} note={note} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker {...field} format={format} />
          </LocalizationProvider>
        )}
      />
      {formState.errors[name]?.type === 'required' && (
        <ErrorMessage message={`${title} is required`} />
      )}
    </div>
  );
}
