import { Add } from '@mui/icons-material';

import { useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import Form from './Form';
import FormRow from './FormRow';
import { Button } from '../shadcn-ui-kit/button';
import TableData from '../TableData';
import { MediaType } from '../../../model/general';
import Popup from '../Popup';
import FileInput from './FileInput';
import { useMutation } from 'react-query';
import { uploadImages } from '../../../api/upload';
import Compressor from 'compressorjs';
import { CircularProgress } from '@mui/material';
import clsx from 'clsx';

const columns: any[] = [{ label: 'Image' }];

export type DynamicImageInputProps = {
  name: string;
  title: string;
};

export default function DynamicImageInput({ name, title }: DynamicImageInputProps) {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name,
  });
  const [loading, setLoading] = useState(false);

  const methods = useForm();
  const watchUrlValue = methods.watch('url');

  const [open, setOpen] = useState(false);

  const mutation = useMutation(
    (file) => {
      return uploadImages(file);
    },
    {
      onSuccess(data: any) {
        const url = data?.image_paths?.[0];

        methods.setValue('url', url);
        methods.setValue('thumbnail_url', '');
        methods.setValue('type', MediaType.Image);
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
            type: `image/${file.name.split('.').pop()}`,
          });
          mutation.mutate(newFileCompressed as any);
        },
      });
    }
  };

  const handleCloseModal = () => {
    methods.reset();
    setOpen(false);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };

  const onSubmit = (data: any) => {
    append({ ...data });
    handleCloseModal();
  };

  return (
    <div className="mt-[10px] mb-[10px] w-full">
      <Button type="button" onClick={handleOpenModal}>
        Add {title}
        <Add className="button" />
      </Button>
      {!!fields?.length && (
        <TableData
          className="w-full"
          columns={columns}
          data={fields}
          renders={[
            {
              field: ['url'],
            },
          ]}
          actions={[
            {
              type: 'delete',
              action: (_, index) => remove(index),
            },
          ]}
        ></TableData>
      )}
      <Popup
        title={title}
        open={open}
        onOpenChange={setOpen}
        actionEle={
          <>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={methods.handleSubmit(onSubmit)}>Save</Button>
          </>
        }
      >
        <div
          className={clsx(
            'justify-center items-center absolute w-full h-full backdrop-blur-[2px] z-10',
            loading && 'flex',
            !loading && 'hidden'
          )}
        >
          <CircularProgress />
        </div>
        <Form methods={methods} onSubmit={onSubmit}>
          <FormRow>
            <FileInput
              name="url"
              handleChangeFile={handleChangeFile}
              title={`Upload ${title}`}
            />
          </FormRow>
          {watchUrlValue && (
            <div>
              <img
                className="w-full h-auto max-h-[300px] rounded object-contain bg-black"
                src={watchUrlValue}
                alt=""
              />
            </div>
          )}
        </Form>
      </Popup>
    </div>
  );
}
