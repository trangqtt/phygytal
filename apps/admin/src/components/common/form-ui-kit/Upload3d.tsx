import { useFormContext } from 'react-hook-form';
import { FormItem } from '../../../model/FormItem';
import FormItemTitle from './FormItemTitle';
import { useMutation } from 'react-query';
import { uploadImages } from '../../../api/upload';
import { useState } from 'react';
import FileInput, { FileType } from './FileInput';
import FormRow from './FormRow';
import { MediaType } from '../../../model/general';

export default function Upload3D({ name, title }: FormItem) {
  const { watch, setValue, } = useFormContext();
  const [loading, setLoading] = useState(false);

  const threeD = watch(name);
  const { mutate: upload3D } = useMutation(
    (file) => {
      return uploadImages(file);
    },
    {
      onSuccess(data: any) {
        const url = data?.image_paths?.[0];
        setValue(name, {
          ...threeD,
          type: MediaType.ThreeD,
          url,
        });
        setLoading(false);
      },
      onSettled() {
        setLoading(false);
      },
    }
  );

  const { mutate: upload3DThumbnail } = useMutation(
    (file) => {
      return uploadImages(file);
    },
    {
      onSuccess(data: any) {
        const thumbnail_url = data?.image_paths?.[0];
        setValue(name, {
          ...threeD,
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

  const handleChange3D = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setLoading(true);
      upload3D(file);
    }
  };

  const handleChange3DThumbnail = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setLoading(true);
      upload3DThumbnail(file);
    }
  };

  return (
    <FormRow>
      <div className="w-full ">
        <FormItemTitle title={title} />
        <FileInput
          name={`${name}.url`}
          title={title}
          className="max-w-[350px] mb-4"
          handleChangeFile={handleChange3D}
          type={FileType.THREE}
        />
      </div>
      <div className="w-full">
        <FormItemTitle title={`${title} thumbnail`} />
        <FileInput
          name={`${name}.thumbnail_url`}
          title={`${title} thumbnail`}
          className="max-w-[350px] mb-4"
          handleChangeFile={handleChange3DThumbnail}
        />
      </div>
    </FormRow>
  );
}
