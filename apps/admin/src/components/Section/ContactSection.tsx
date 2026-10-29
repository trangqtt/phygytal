import { FC } from 'react';
import { ModelField } from '../../model/ProductModelEntity';
import SectionWrapper from './SectionWrapper';

const fieldArr: ModelField[] = [
  {
    label: "Phone",
    key: "phone",
    type: "string",
    is_array: false,
  },
  {
    label: "Email",
    key: "email",
    type: "string",
    is_array: false,
  },
  {
    label: "Address",
    key: "contact_name",
    type: "string",
    is_array: false,
  },
]

export type ContactSectionProps = {
  dataFields: ModelField[];
}

const ContactSection: FC<ContactSectionProps> = ({ dataFields }) => {
  return (
    <SectionWrapper fields={fieldArr} productModelFields={dataFields} />
  );
};

export default ContactSection;
