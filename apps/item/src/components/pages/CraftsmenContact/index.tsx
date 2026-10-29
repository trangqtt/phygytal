import NormalSlide from "@/components/common/PageSlides/Normal";
import { Section } from "@/components/common/SectionFullScreen/SectionFullScreen";
import { useTranslation } from "react-i18next";

const CraftsmenContact = ({
  phone,
  email,
  contactName,
}: {
  phone?: string;
  email?: string;
  contactName?: string;
}) => {
  const { t } = useTranslation();
  return (
    <NormalSlide
      section={Section.Contact}
      className="absolute left-0 top-0 z-10 flex h-[100dvh] w-full flex-col items-center justify-center gap-[16px] bg-[transparent] pb-[32px] pt-[80px] sm:gap-[24px] overflow-y-hidden"
    >
      <div className="relative flex h-[100dvh] w-full flex-col pt-[80px]">
        <div className="flex flex-1 flex-col items-center justify-center gap-[20px] pb-[25%] text-center">
          <p className="text-[28px] font-semibold uppercase ">
            {t("general.contact")}
          </p>

          <p className="text-[22px] font-semibold uppercase">
            {contactName}
          </p>
          {phone && (
            <p className="text-[20px] text-[#bfbfbf]">
              {t("general.phone")}:{" "}
              <a className="underline underline-offset-2" href={`tel:${phone}`}>
                {phone}
              </a>
            </p>
          )}
          {email && (
            <p className="text-[20px] text-[#bfbfbf]">
              {t("general.email")}:{" "}
              <a
                className="underline underline-offset-2"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </p>
          )}
        </div>
      </div>
    </NormalSlide>
  );
};

export default CraftsmenContact;
