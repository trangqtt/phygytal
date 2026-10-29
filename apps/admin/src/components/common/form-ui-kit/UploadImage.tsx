import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { FormItem } from '../../../model/FormItem';
import FormItemTitle from './FormItemTitle';
import { useMutation } from 'react-query';
import { uploadImages } from '../../../api/upload';
import { useState } from 'react';
import Compressor from 'compressorjs';
import FileInput, { AcceptFileEnum } from './FileInput';

interface Props extends FormItem {
  type?: 'image' | 'video' | '3d';
}

export default function UploadImage({ name, title, className, required }: Props) {
  const { setValue } = useFormContext();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation(
    (file) => {
      return uploadImages(file);
    },
    {
      onSuccess(data: any) {
        const url = data?.image_paths?.[0];
        setValue(name, {
          url,
          type: 'image',
        });
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

      new Compressor(file, {
        maxHeight: 2048,
        maxWidth: 2048,
        convertSize: 200000,
        success(fileCompressed: any) {
          const newFileCompressed = new File([fileCompressed], file.name, {
            type: `image/${file.name.split(".").pop()}`,
          });
          mutation.mutate(newFileCompressed as any);
        },
      });
    }
  };

  return (
    <div className={clsx(!!className && className, 'w-full')}>
      <FormItemTitle title={title} required={required} />
      <div className="flex gap-[5px] flex-col">
        <div className="w-full max-w-[350px] flex flex-col">
          <FileInput
            title="Upload file"
            name={`${name}.url`}
            handleChangeFile={handleChangeFile}
            accept={AcceptFileEnum.IMAGE}
            required={required}
          />
        </div>
      </div>
    </div>
  );
}
