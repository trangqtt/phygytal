import { Controller, useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { FormItem } from '@/models/FormItem';
import ErrorMessage from './ErrorMessage';
import FormItemTitle from './FormItemTitle';

interface RichTextEditorProps extends FormItem {}

export default function RichTextEditor({
  name,
  title,
  required,
  note,
  placeholder,
}: RichTextEditorProps) {
  const { control, formState } = useFormContext();

  return (
    <div className="flex-1 w-full">
      <FormItemTitle title={title} required={required} note={note} />
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <ReactQuill
            {...field}
            theme="snow"
            placeholder={placeholder}
            onChange={(text: string) => {
              field.onChange(text);
            }}
          />
        )}
      />
      {formState.errors[name]?.type === 'required' && (
        <ErrorMessage message={`${title} is required`} />
      )}
    </div>
  );
}
