import clsx from 'clsx';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormItem } from '../../../model/FormItem';
import BackdropLoader from '../BackdropLoader';
import FileInput, { AcceptFileEnum } from './FileInput';
import FormItemTitle from './FormItemTitle';

interface TextInputProps extends FormItem {
  type?: 'input' | 'number' | 'file';
  min?: number | null;
  max?: number | null;
  endAdornment?: React.ReactNode | null;
  startAdornment?: React.ReactNode | null;
  conversionFactor?: number;
  step?: number;
}

export default function UploadDocumentFile({
  name,
  title,
  placeholder,
  className,
  required
}: TextInputProps) {
  const { setValue, getValues } = useFormContext();
  const fileName = getValues(name)?.name;
  const [loading, setLoading] = useState(false);

  const handleChangeFile = (event: any) => {
    const file = event.target.files[0] as File;
    setValue(name, file);
  };

  return (
    <div className={clsx(!!className && className, 'w-full')}>
      <FormItemTitle title={title} />
      <div className="flex gap-[5px]">
        <div className="w-full max-w-[350px] flex flex-col">
        <FileInput
            title="Upload file"
            name={name}
            handleChangeFile={handleChangeFile}
            accept={AcceptFileEnum.ALL}
            required={required}
          />
          <div className="flex items-center gap-1 mt-2">
            <span>{fileName}</span>
          </div>
        </div>
      </div>
      <BackdropLoader open={loading} />
    </div>
  );
}
