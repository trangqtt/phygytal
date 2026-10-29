import { Add } from '@mui/icons-material';

import { useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import Form from './Form';
import FormRow from './FormRow';
import { Button } from '../shadcn-ui-kit/button';
import TableData from '../TableData';
import { MediaType } from '../../../model/general';
import Popup from '../Popup';
import FileInput, { AcceptFileEnum } from './FileInput';
import { useMutation } from 'react-query';
import { uploadImages } from '../../../api/upload';
import { CircularProgress } from '@mui/material';
import clsx from 'clsx';

const columns: any[] = [{ label: 'Video' }, { label: 'Thumbnail' }];

export type DynamicVideoInputProps = {
  name: string;
  title: string;
};

export default function DynamicVideoInput({ name, title }: DynamicVideoInputProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const [loading, setLoading] = useState(false);

  const methods = useForm();
  const watchUrlValue = methods.watch('url');
  const watchThumbnailUrlValue = methods.watch('thumbnail_url');

  const [open, setOpen] = useState(false);

  const { mutate: uploadVideo } = useMutation(
    (file) => {
      return uploadImages(file);
    },
    {
      onSuccess(data: any) {
        const url = data?.image_paths?.[0];
        methods.setValue('url', url);
        methods.setValue('type', MediaType.Video);
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
        methods.setValue('thumbnail_url', thumbnail_url);
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
            {
              field: ['thumbnail_url'],
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
          <FormRow className="flex justify-between">
            <div className="flex flex-col gap-2">
              <FileInput
                title={`Upload ${title}`}
                name="url"
                handleChangeFile={handleChangeVideo}
                accept={AcceptFileEnum.VIDEO}
              />
              {watchUrlValue && (
                <div>
                  <video
                    className="w-auto h-auto max-w-[300px] max-h-[300px] object-contain"
                    src={watchUrlValue}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <FileInput
                name="thumbnail_url"
                title={`Upload ${title} thumbnail`}
                className="max-w-[350px] mb-4"
                accept={AcceptFileEnum.IMAGE}
                handleChangeFile={handleChangeVideoThumbnail}
              />
              {watchThumbnailUrlValue && (
                <div>
                  <img
                    className="w-full h-auto max-h-[300px] rounded object-contain bg-black"
                    src={watchThumbnailUrlValue}
                    alt=""
                  />
                </div>
              )}
            </div>
          </FormRow>
        </Form>
      </Popup>
    </div>
  );
}
