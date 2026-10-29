import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import Form from '../../common/form-ui-kit/Form';
import FormRow from '../../common/form-ui-kit/FormRow';
import TextInput from '../../common/form-ui-kit/TextInput';
import { Button } from '../../common/shadcn-ui-kit/button';
import AboutThemeFormFields from './AboutThemeForm';
import CraftVillageFormFields from './CraftVillageFormFields/CraftVillageFormFields';
import CraftsmenFormFields from './CraftsmenFormFields/CraftsmenFormFields';
import GeneralThemeFormFields from './GeneralThemeFormFields';
import HomeThemeFormFields from './HomeThemeFormFields';
import StoryThemeFormFields from './StoryThemeFormFields';
import TutorialThemeFormFields from './TutorialThemeFormFields';

export interface PageFormProps {
  methods: any;
  onSubmit?(params?: any): void;
}

export default function PageForm({ methods, onSubmit }: PageFormProps) {
  const typeVal = methods.getValues('type');
  const watchField = useWatch({ name: 'type', control: methods.control });

  const renderFormFields = (type: string) => {
    switch (type) {
      case 'home':
        return <HomeThemeFormFields />;
      case 'about':
        return <AboutThemeFormFields />;
      case 'story':
        return <StoryThemeFormFields />;
      // case 'letter':
      //   return <LetterFormFields />;
      case 'craftsmen':
        return <CraftsmenFormFields />;
      case 'tutorial':
        return <TutorialThemeFormFields />;
      case 'craft_village':
        return <CraftVillageFormFields />;
      default:
        return null;
      // return <HomeThemeFormFields />;
    }
  };

  useEffect(() => {
    let urlLink = '';

    switch (typeVal) {
      case 'about':
        urlLink = 'about';
        break;
      case 'tutorial':
        urlLink = 'tutorial';
        break;
      case 'story':
        urlLink = 'story';
        break;
      case 'letter':
        urlLink = 'letter';
        break;
      case 'craftsmen':
        urlLink = 'craftsmen';
        break;
      case 'stone_info':
        urlLink = 'stone_info';
        break;
      case 'craft_village':
        urlLink = 'craft_village';
        break;
      case 'instruction':
        urlLink = 'instruction';
        break;
      default:
        break;
    }
    methods.setValue('urlLink', urlLink);
  }, [typeVal]);

  return (
    <Form className="p-[10px]" methods={methods} onSubmit={onSubmit}>
      <GeneralThemeFormFields />
      {renderFormFields(typeVal)}
      <FormRow>
        <TextInput name="attributes.nextPath" title="Next page path" />
        <TextInput name="attributes.vi.nextTitle" title="Next page title (Vi)" />
        <TextInput name="attributes.en.nextTitle" title="Next page title (En)" />
      </FormRow>
      <Button type="submit">Save</Button>
    </Form>
  );
}
