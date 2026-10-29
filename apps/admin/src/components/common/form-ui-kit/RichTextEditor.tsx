import { Controller, useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormItem } from '../../../model/FormItem';
import ErrorMessage from './ErrorMessage';
import FormItemTitle from './FormItemTitle';

interface RichTextEditorProps extends FormItem {}

export const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'link',
  'list',
  'bullet',
  'image',
];

export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    ['link'],
    ['image'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean']
  ]
};

export default function RichTextEditor({
  name,
  title,
  required,
  note,
  placeholder,
}: RichTextEditorProps) {
  const { control, formState, setError, clearErrors } = useFormContext();

  const validateRequired = (value: string) => {
    if ((!!!value || value === '<p><br></p>') && required) {
      setError(name, {
        type: 'required',
        message: 'Field is required!',
      });
      return false;
    }

    clearErrors(name);
    return true;
  };

  return (
    <div className="flex-1 w-full">
      <FormItemTitle title={title} required={required} note={note} />
      <Controller
        name={name}
        control={control}
        rules={{ required, validate: validateRequired }}
        render={({ field }) => (
          <ReactQuill
            {...field}
            theme="snow"
            placeholder={placeholder}
            onChange={(text: string) => {
              field.onChange(text);
            }}
            formats={formats}
            modules={modules}
          />
        )}
      />
      {formState.errors[name]?.type === 'required' && (
        <ErrorMessage message={`${title} is required`} />
      )}
    </div>
  );
}
