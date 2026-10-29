import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from '../../../model/FormItem';
import ErrorMessage from './ErrorMessage';
import { getFieldFromPath } from '../../../utils/helper';
import FileUploadIcon from '../../icons/FileUploadIcon';
import { Edit2BoldIcon, TrashBoldIcon } from '../../icons';
import { useEffect, useState } from 'react';
import TextInput from './TextInput';

export enum AcceptFileEnum {
  ALL = '*',
  IMAGE = 'image/*',
  VIDEO = 'video/*',
}

export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
  THREE = '3D',
}

interface FileInputProps extends FormItem {
  handleChangeFile?: (event: any) => void;
  accept?: AcceptFileEnum;
  type?: FileType;
}

const randomIntFromInterval = (min: number, max: number)=> {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function FileInput({
  name,
  title,
  placeholder,
  className,
  required = false,
  accept = AcceptFileEnum.ALL,
  type = FileType.IMAGE,
  handleChangeFile = () => {},
}: FileInputProps) {
  const { control, formState, watch, setValue } = useFormContext();
  const inputValue = watch(name);
  const id = `${name}-${randomIntFromInterval(0, 1000)}`;
  const [mode, setMode] = useState<"edit" | "remove">("edit");

  const uploadTitle = () => {
    if (type === FileType.IMAGE) {
      return "Thêm hình ảnh";
    } else if (type === FileType.VIDEO) {
      return "Thêm video";
    } else {
      return `Thêm ${title}`;
    }
  }

  const onEditFile = () => {
    setMode("edit");
  }

  const onRemoveFile = () => {
    setValue(name, undefined);
    setMode("remove");
  }

  const preview = () => {
    let RenderPreviewComponent: any;

    if (type === FileType.VIDEO) {
      RenderPreviewComponent = <video src={inputValue} className="w-full h-full bg-white object-contain rounded-md" />;
    } else {
      RenderPreviewComponent = <img src={inputValue} className="w-full h-full bg-white object-contain rounded-md" />;
    }

    return (
      <div className="w-full h-full relative">
        {RenderPreviewComponent}
        <div className="absolute bottom-0 left-0 w-full h-full rounded-md opacity-0 hover:opacity-100 flex transition-all delay-75 ease-in items-end justify-center">
          <div className="h-10 w-full bg-black-20 backdrop-blur rounded-b-md flex justify-center items-center gap-14">
            <Edit2BoldIcon fill="#FFFFFF" className="w-6 h-6" onClick={onEditFile} />
            <div className="w-3 h-px rotate-90 rounded-md bg-white"></div>
            <TrashBoldIcon fill="#FFFFFF" className='w-6 h-6' onClick={onRemoveFile} />
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (inputValue) {
      setMode("remove");
    } else {
      setMode("edit");
    }
  }, [inputValue])

  return (
    <div className={clsx(!!className && className, 'w-full flex flex-col gap-2')}>
      <Controller
        name={name}
        control={control}
        rules={{
          required,
        }}
        render={({ field }) => (
          <input
            {...field}
            type="file"
            accept={accept}
            hidden={true}
            id={id}
            placeholder={placeholder}
            onChange={handleChangeFile}
            value=""
          />
        )}
      />
      <label htmlFor={mode === 'edit' ? id : undefined} className={clsx(
        'flex flex-col gap-2 w-full',
        inputValue && type === FileType.THREE && mode !== 'edit' && 'hidden',
      )}>
        <div
          className={clsx(
            'relative flex flex-col gap-2 justify-center items-center w-full max-w-[300px] h-44 border-dashed border-neutral-4 rounded-md cursor-pointer text-primary-5 text-center text-sm font-bold p-2',
            inputValue && 'border-none',
            !inputValue && 'border'
          )}
        >
          <FileUploadIcon /> {uploadTitle()}
          {inputValue && (
            <>
              <div className='z-20 absolute top-0 left-0 w-full h-full border border-neutral-4 rounded-md p-2'>
                {preview()}
              </div>
            </>
          )}
        </div>
      </label>
      {inputValue && type === FileType.THREE && (
        <div className='w-full'>
          <div className='h-10 w-full flex items-center gap-2'>
            <TextInput name={name} value={inputValue} readonly className='w-full max-w-[300px]' />
            <TrashBoldIcon className='w-6 h-6 cursor-pointer' onClick={onRemoveFile} />
          </div>  
        </div>
      )}
      {!inputValue && getFieldFromPath(formState.errors, name)?.type === 'required' && (
        <ErrorMessage message={`${title} is required`} />
      )}
    </div>
  );
}
