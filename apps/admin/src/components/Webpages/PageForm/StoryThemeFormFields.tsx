import FormRow from '../../common/form-ui-kit/FormRow';
import RichTextEditor from '../../common/form-ui-kit/RichTextEditor';
import TextInput from '../../common/form-ui-kit/TextInput';
import UploadFile from '../../common/form-ui-kit/UploadFile';

function Title({ value }: { value: string }) {
  return <h4 className="text-[24px] font-bold mb-[20px] text-black italic">{value}</h4>;
}

export default function StoryThemeFormFields({}) {
  return (
    <>
      <div className="handbrew py-[20px] border-t-[1px] border-solid border-black">
        <Title value="Country facts" />
        <FormRow>
          <TextInput name="attributes.vi.fact1Title" title="Fact 1 Title (Vi)" />
          <TextInput name="attributes.en.fact1Title" title="Fact 1 Title (En)" />
        </FormRow>
        <FormRow>
          <RichTextEditor name="attributes.vi.fact1Description" title="Fact 1 Description (Vi)" />
          <RichTextEditor name="attributes.en.fact1Description" title="Fact 1 Description (En)" />
        </FormRow>
        <FormRow>
          <TextInput name="attributes.vi.fact2Title" title="Fact 2 Title (Vi)" />
          <TextInput name="attributes.en.fact2Title" title="Fact 2 Title (En)" />
        </FormRow>
        <FormRow>
          <RichTextEditor name="attributes.vi.fact2Description" title="Fact 2 Description (Vi)" />
          <RichTextEditor name="attributes.en.fact2Description" title="Fact 2 Description (En)" />
        </FormRow>
        <FormRow>
          <RichTextEditor name="attributes.vi.fact3Description" title="Fact 3 Description (Vi)" />
          <RichTextEditor name="attributes.en.fact3Description" title="Fact 3 Description (En)" />
        </FormRow>
      </div>
      <div className="handbrew py-[20px] border-t-[1px] border-solid border-black">
        <Title value="Farm info" />
        <FormRow>
          <TextInput name="attributes.farmHeight" title="Farm height" />
          <TextInput name="attributes.farmArea" title="Farm area" />
        </FormRow>
        <FormRow>
          <RichTextEditor
            name="attributes.en.farmShortDescription"
            title="Farm Short Description (En)"
          />
          <RichTextEditor
            name="attributes.vi.farmShortDescription"
            title="Farm Short Description (Vi)"
          />
        </FormRow>
        <FormRow>
          <RichTextEditor
            name="attributes.en.farmFullDescription"
            title="Farm Full Description (En)"
          />
          <RichTextEditor
            name="attributes.vi.farmFullDescription"
            title="Farm Full Description (Vi)"
          />
        </FormRow>
      </div>
      <div className="handbrew py-[20px] border-t-[1px] border-solid border-black">
        <Title value="Pre Processing Info" />
        <FormRow>
          <UploadFile name="attributes.preProcessingImageUrl" title="Cover Image" />
        </FormRow>
        <FormRow>
          <TextInput name="attributes.vi.preProcessingName" title="Pre Processing Name (Vi)" />
          <TextInput name="attributes.en.preProcessingName" title="Pre Processing Name (En)" />
        </FormRow>
        <FormRow>
          <RichTextEditor name="attributes.vi.preProcessingDescription" title="Description (Vi)" />
          <RichTextEditor name="attributes.en.preProcessingDescription" title="Description (En)" />
        </FormRow>
      </div>
    </>
  );
}
