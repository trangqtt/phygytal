import clsx from 'clsx';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormItem } from '@/models/FormItem';

const uploadImage = () =>{}

interface UploadInputProps extends FormItem {
  type?: 'image' | 'audio';
}

export default function UploadInput({
  name,
  title,
  className,
  type = 'image',
}: UploadInputProps) {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    register(name);
  }, [register, name]);

  const onUpload = async (e: any) => {
    // const file = e.target.files[0];
    // const fileUrl = await uploadImage(file.name, file);
    // setValue(name, fileUrl);
  };

  return (
    <div className={clsx(className)}>
      <p className="text-[14px] font-medium leading-[20px] mb-[5px]">{title}:</p>
      <input type="file" accept={`${type}/*`} onChange={onUpload} />
    </div>
  );
}
