import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormItem } from '../../../model/FormItem';
import FormItemTitle from './FormItemTitle';
import { useMutation } from 'react-query';
import { uploadImages } from '../../../api/upload';
import { useState } from 'react';
import BackdropLoader from '../BackdropLoader';
import FileInput, { AcceptFileEnum, FileType } from './FileInput';

export default function UploadVideo({ name, title, required = false, className }: FormItem) {
  const { control, setValue, getValues, register } = useFormContext();
  const videoMedia = getValues(name);
  const [loading, setLoading] = useState(false);

  const { mutate: uploadVideo } = useMutation(
    (file) => {
      return uploadImages(file);
    },
    {
      onSuccess(data: any) {
        const url = data?.image_paths?.[0];
        setValue(name, {
          ...videoMedia,
          type: 'video',
          url,
        });
        setLoading(false);
      },
      onSettled() {
        setLoading(false);
      },
    }
  );

  const { mutate: uploadVideoThumbnail } = useMutation(
    (file) => {
      return uploadImages(file);
    },
    {
      onSuccess(data: any) {
        const thumbnail_url = data?.image_paths?.[0];
        setValue(name, {
          ...videoMedia,
          type: 'video',
          thumbnail_url,
        });
        setLoading(false);
      },
      onSettled() {
        setLoading(false);
      },
    }
  );

  const handleChangeVideo = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setLoading(true);
      uploadVideo(file);
    }
  };

  const handleChangeVideoThumbnail = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setLoading(true);
      uploadVideoThumbnail(file);
    }
  };

  return (
    <>
      <div className={clsx(!!className && className, 'w-full')}>
        <FormItemTitle title={title} required={required} />
        <div className="flex gap-[5px] flex-col">
          <div className="w-full  max-w-[350px] flex flex-col">
            <FileInput
              title="Upload file"
              name={`${name}.url`}
              handleChangeFile={handleChangeVideo}
              accept={AcceptFileEnum.VIDEO}
              required={required}
              type={FileType.VIDEO}
            />
          </div>
        </div>
      </div>
      <div className='w-full'>
        <FormItemTitle title={`${title} thumbnail`} required={required} />
        <FileInput
          name={`${name}.thumbnail_url`}
          title={`${title} thumbnail`}
          required={required}
          className="max-w-[350px] mb-4"
          accept={AcceptFileEnum.IMAGE}
          handleChangeFile={handleChangeVideoThumbnail}
        />
      </div>
    </>
  );
}
