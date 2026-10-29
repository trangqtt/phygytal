import SectionFullScreen from "@/components/common/SectionFullScreen/SectionFullScreen";
import { BaseSectionProps } from "@/models/SectionProps";
import { FC } from "react";
import CraftsmenContact from "../../CraftsmenContact";

interface ContactSectionProps extends BaseSectionProps {}

interface ContactSectionData {
  email: string;
  phone: string;
  contact_name: string;
}

const ContactSection: FC<ContactSectionProps> = ({ id, sectionData }) => {
  const { email, phone, contact_name, } =
    sectionData as Partial<ContactSectionData>;

  return (
    <SectionFullScreen name={id}>
      <CraftsmenContact
        email={email}
        phone={phone}
        contactName={contact_name}
      />
    </SectionFullScreen>
  );
};

export default ContactSection;
