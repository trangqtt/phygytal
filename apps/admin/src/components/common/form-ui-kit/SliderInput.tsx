import { Slider } from '@mui/material';
import clsx from 'clsx';
import { FC, ReactElement } from 'react';
import FormItemTitle from './FormItemTitle';
import { Controller, useFormContext } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { FormItem } from '../../../model/FormItem';

interface SliderInputProps extends FormItem {
  min: number;
}

const SliderInput: FC<SliderInputProps> = (props): ReactElement => {
  const { title, className, name, min } = props;
  const { control, formState } = useFormContext();

  return (
    <div className={clsx(!!className && className, 'w-full')}>
      <FormItemTitle title={title} />
      <Controller
        name={name}
        control={control}
        rules={{ min, max: 100 }}
        render={({ field }) => (
          <Slider defaultValue={min} min={min} aria-label="Default" valueLabelDisplay="auto" {...field} />
        )}
      />
    </div>
  )
};

export default SliderInput;
