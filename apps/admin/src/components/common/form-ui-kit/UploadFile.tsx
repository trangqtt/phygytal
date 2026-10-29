import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormItem } from '../../../model/FormItem';
import FormItemTitle from './FormItemTitle';
import { useMutation } from 'react-query';
import { uploadImages } from '../../../api/upload';
import { useState } from 'react';
import BackdropLoader from '../BackdropLoader';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '../Button';
import { Input } from '../shadcn-ui-kit/input';

interface TextInputProps extends FormItem {
  type?: 'input' | 'number' | 'file';
  min?: number | null;
  max?: number | null;
  endAdornment?: React.ReactNode | null;
  startAdornment?: React.ReactNode | null;
  conversionFactor?: number;
  step?: number;
}

export default function UploadFile({
  name,
  title,
  placeholder,
  className,
}: TextInputProps) {
  const { control, setValue, getValues, register } = useFormContext();
  const imageUrl = getValues(name);
  const watchField = useWatch({ name, control });
  const [loading, setLoading] = useState(false);

  const mutation = useMutation(
    (file) => {
      return uploadImages(file);
    },
    {
      onSuccess(data: any) {
        const url = data?.image_paths?.[0];
        setValue(name, url);
        setLoading(false);
      },
      onSettled() {
        setLoading(false);
      },
    }
  );

  const handleChangeFile = (event: any) => {
    const file = event.target.files[0] as File;

    if (file) {
      setLoading(true);
      mutation.mutate(file as any);
    }
  };

  return (
    <div className={clsx(!!className && className, 'w-full')}>
      <FormItemTitle title={title} />
      <div className="flex gap-[5px]">
        <div className="w-full max-w-[350px] flex flex-col">
          <Button
            className="w-full"
          >
            Upload file
            <input
              type="file"
              accept="*"
              hidden={true}
              placeholder={placeholder}
              onChange={handleChangeFile}
            />
          </Button>
          <div className="flex items-center gap-1 mt-2">
            <span>Url:</span>
            <Input className="w-full text-xs" type="text" {...register(name)} />
          </div>
        </div>
      </div>

      {imageUrl && (
        <div>
          <img
            className="max-w-[100px] max-h-[100px] object-contain bg-black"
            src={imageUrl}
            alt=""
          />
        </div>
      )}

      <BackdropLoader open={loading} />
    </div>
  );
}
