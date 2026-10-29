import { UseFormReturn } from 'react-hook-form';
import { AuthorModel } from '../../model/AuthorModel';
import Form from '../common/form-ui-kit/Form';
import FormRow from '../common/form-ui-kit/FormRow';
import RichTextEditor from '../common/form-ui-kit/RichTextEditor';
import TextInput from '../common/form-ui-kit/TextInput';
import UploadImage from '../common/form-ui-kit/UploadImage';
import { Button } from '../common/shadcn-ui-kit/button';
import ManageHighlightArtwork from './ManageHighlightArtwork';
import ManagePrizes from './ManagePrizes';

interface AuthorFormProps {
  methods: UseFormReturn<any, any>;
  defaultValues?: any;
  onSubmit?(data: AuthorModel): void;
  className?: string;
}

export default function AuthorForm({
  methods,
  className,
  onSubmit,
}: AuthorFormProps) {
  return (
    <Form methods={methods} onSubmit={onSubmit} className={className}>
      <FormRow>
        <TextInput name="name.vi" title="Name (Vi)" placeholder="Author name" />
        <TextInput name="name.en" title="Name (En)" placeholder="Author name" />
      </FormRow>
      <FormRow>
        <UploadImage name="avatar" title="Avatar" />
      </FormRow>
      <FormRow>
        <TextInput name="artworks_count" title="Artworks" placeholder="Artworks" />
        <TextInput name="contact_name" title="Contact" placeholder="Contact name" />
      </FormRow>
      <FormRow>
        <TextInput name="email" title="Email" placeholder="Email" />
        <TextInput name="phone" title="Phone" placeholder="Phone" />
      </FormRow>
      <FormRow>
        <TextInput name="experience_year" title="Experience" placeholder="Experience" />
      </FormRow>
      <FormRow>
        <RichTextEditor
          name="translation.vi.quote"
          title="Quote (Vi)"
        />
        <RichTextEditor
          name="translation.en.quote"
          title="Quote (En)"
        />
      </FormRow>

      <ManageHighlightArtwork />
      <ManagePrizes />

      <Button type="submit" className='w-full'>
        Save
      </Button>
    </Form>
  );
}
