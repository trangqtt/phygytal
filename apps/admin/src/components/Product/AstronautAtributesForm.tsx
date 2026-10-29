import { FC } from 'react';
import FormRow from '../common/form-ui-kit/FormRow';
import RichTextEditor from '../common/form-ui-kit/RichTextEditor';

const AstronautAtributesForm: FC = () => {
  return (
    <FormRow>
      <RichTextEditor name="attribute.letter" title="Letter" />
    </FormRow>
  );
};

export default AstronautAtributesForm;
