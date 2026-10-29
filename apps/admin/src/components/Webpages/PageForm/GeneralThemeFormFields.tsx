import { useFormContext } from "react-hook-form";
import { ThemeType } from "../../../model/ThemeModel";
import FormRow from "../../common/form-ui-kit/FormRow";
import SelectInput from "../../common/form-ui-kit/SelectInput";
import TextInput from "../../common/form-ui-kit/TextInput";
import { useState } from "react";
import clsx from "clsx";
import PreviewPage, { PreviewSize } from "../../common/preview-page";


interface TypeOption {
  label: string;
  value: ThemeType;
}

const typeOptions: TypeOption[] = [
  {
    label: "Home",
    value: "home",
  },
  {
    label: "Story",
    value: "story",
  },
  {
    label: "About",
    value: "about",
  },
  {
    label: "Instruction",
    value: "tutorial",
  },
  {
    label: "Letter",
    value: "letter",
  },
  {
    label: "Craftsmen",
    value: "craftsmen",
  },
  {
    label: "Craft village",
    value: "craft_village",
  },
];

export default function GeneralThemeFormFields({}) {
  const { register, getValues } = useFormContext();
  const values = getValues();

  return (
    <>
      <FormRow>
        <div className="w-full flex flex-col gap-[8px]">
          <SelectInput name="type" options={typeOptions} title="Page Type" />
        </div>
        
        <TextInput name="name" title="Page name" />
        <input {...register('urlLink')} hidden />
      </FormRow>
    </>
  );
}
