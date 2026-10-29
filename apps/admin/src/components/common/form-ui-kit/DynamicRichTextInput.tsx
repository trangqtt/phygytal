import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../shadcn-ui-kit/button';
import ReactQuill from 'react-quill';
import { formats, modules } from './RichTextEditor';

export type DynamicRichTextInput = {
  defaultValues?: string[];
  name: string;
  title: string;
};

export default function DynamicRichTextInput({ defaultValues, name, title }: DynamicRichTextInput) {
  const { setValue } = useFormContext();
  const [values, setValues] = useState<any[]>(defaultValues ?? []);

  const initValue = '';
  const handleAppend = () => {
    setValues((val: any[]) => {
      return [...val, initValue];
    });
  };

  const handleChange = (index: number, value: any) => {
    setValues((val: any[]) => {
      return val.map((v, i) => {
        if (i === index) {
          return value;
        } else {
          return v;
        }
      });
    });
  };

  const handleRemove = (index: number) => {
    setValues((val: any[]) => {
      return val.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    setValue(name, values);
  }, [values]);

  return (
    <div>
      <Button type="button" onClick={handleAppend}>
        Add {title}
        <PlusIcon />
      </Button>
      <div className="mt-[10px] flex gap-[32px] flex-wrap">
        {values.map((val, index) => (
          <div key={index} className="flex flex-col mb-3 gap-1">
            <ReactQuill
              theme="snow"
              onChange={(text: string) => {
                handleChange(index, text)
              }}
              formats={formats}
              modules={modules}
            />
            <Button onClick={() => handleRemove(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
