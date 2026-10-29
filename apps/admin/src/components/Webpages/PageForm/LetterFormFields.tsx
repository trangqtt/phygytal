import { useState } from 'react';
import FormRow from '../../common/form-ui-kit/FormRow';
import RichTextEditor from '../../common/form-ui-kit/RichTextEditor';

export default function LetterFormFields({}) {
  return (
    <>
      <FormRow>
        <RichTextEditor name="attributes.description" title="Description" />
      </FormRow>
    </>
  );
}
