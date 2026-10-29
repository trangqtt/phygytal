import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from '@/models/FormItem';
import ErrorMessage from './ErrorMessage';
import FormItemTitle from './FormItemTitle';

export interface RadioButtonProps extends FormItem {
  values?: RadioButtonItemValue[];
}

export interface RadioButtonItemValue {
  label: string;
  value: string;
}

export function RadioButton({
  name,
  title,
  values,
  required = false,
  note,
}: RadioButtonProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <FormItemTitle title={title} required={required} note={note} />
      <div className="flex gap-[16px] flex-1 items-center max-h-[38px]">
        {values?.map(({ label, value }, index) => (
          <div key={value} className="flex gap-[5px]">
            <input
              {...register(name, { required: false })}
              type="radio"
              id={`${name}-${value}`}
              value={value}
            />
            <label htmlFor={`${name}-${value}`} className="text-[16px] leading-[20px]">
              {label}
            </label>
          </div>
        ))}
      </div>

      {errors[name]?.type === 'required' && (
        <ErrorMessage message={`${title} is required`} />
      )}
    </div>
  );
}

// radio button with have 2 boolean value: true/false
export function YesNoRadioButton({ name, title, required, note }: RadioButtonProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <FormItemTitle title={title} required={required} note={note} />
      <div className="flex gap-[16px] flex-1 items-center max-h-[38px]">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <>
              <div className="flex gap-[5px]">
                <input
                  type="radio"
                  id={`${name}-yes`}
                  checked={value === true}
                  onChange={() => onChange(true)}
                />
                <label htmlFor={`${name}-yes`} className="text-[16px] leading-[20px]">
                  Yes
                </label>
              </div>
              <div className="flex gap-[5px]">
                <input
                  type="radio"
                  id={`${name}-no`}
                  checked={value === false}
                  onChange={() => onChange(false)}
                />
                <label htmlFor={`${name}-no`} className="text-[16px] leading-[20px]">
                  No
                </label>
              </div>
            </>
          )}
        />
      </div>
      {errors[name]?.type === 'required' && (
        <ErrorMessage message={`${title} is required`} />
      )}
    </div>
  );
}
