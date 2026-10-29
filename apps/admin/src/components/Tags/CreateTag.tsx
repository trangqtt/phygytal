import * as React from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../../components/common/shadcn-ui-kit/tabs';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTagAction } from '../../hooks/fetch/useTag';
import { Button } from '../common/shadcn-ui-kit/button';
import TagForm from './TagForm';

export type Props = {};

type TagDataItem = {
  tag_id: string;
  org_id: string;
  tag_type?: string;
  encrypt_mode?: string;
  raw_data?: string;
  scan_counter?: number;
  hardware_id?: string;
  created_at: string;
};

export default function CreateTag({}: Props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/tags');
  };

  const { createMutation, createTagByFileMutation } = useTagAction();

  const methodsType = useForm({
    defaultValues: {
      tag_id: '',
      org_id: '',
      tag_type: '',
      encrypt_mode: '',
      raw_data: '',
      scan_counter: '',
      hardware_id: '',
    },
  });
  const methodsImportFile = useForm({
    defaultValues: {
      file: '',
    },
  });

  const onSubmit = async (data: TagDataItem) => {
    data.scan_counter = Number(data.scan_counter);
    await createMutation.mutateAsync(data);
    goBack();
  };
  const onSubmitImportFile = async (data: any) => {
    await createTagByFileMutation.mutateAsync(data);
    goBack();
  };

  return (
    <div className="w-full flex flex-col justify-end p-[10px] sticky bg-white z-10 top-0">
      <div>
        <Button onClick={goBack}>Back</Button>
        <h2 className="text-[30px] mb-[30px] font-bold">Tag Item Info</h2>
      </div>
      <div className="w-full">
        <Tabs defaultValue="type">
          <TabsList>
            <TabsTrigger value="type">Type</TabsTrigger>
            <TabsTrigger value="file">File</TabsTrigger>
          </TabsList>
          <TabsContent value="type">
            <div className="pt-2">
              <TagForm tabType="Type" methods={methodsType} onSubmit={onSubmit} />
            </div>
          </TabsContent>
          <TabsContent value="file">
            <div className="pt-2">
              <TagForm
                tabType="File"
                methods={methodsImportFile}
                onSubmit={onSubmitImportFile}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
