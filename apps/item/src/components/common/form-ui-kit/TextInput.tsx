import { TextField } from "@mui/material";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import { FormItem } from "@/models/FormItem";
import ErrorMessage from "./ErrorMessage";
import FormItemTitle from "./FormItemTitle";
import { FunctionComponent, ReactNode } from "react";
import { toast } from "react-toastify";

interface TextInputProps extends FormItem {
  type?: "input" | "number" | "email" | "password" | "text";
  EndAdornment?: ReactNode;
  onClickEndAdornment?: (e: any) => void;
  error?: boolean;
  readonly?: boolean;
}

export default function TextInput({
  name,
  title,
  placeholder,
  className,
  type,
  hidden,
  required = false,
  note,
  label,
  EndAdornment,
  onClickEndAdornment,
  error,
  readonly,
}: TextInputProps) {
  const { control, formState, register } = useFormContext();

  return !Boolean(EndAdornment) ? (
    <div className={clsx(!!className && className, "text-input w-full")}>
      <FormItemTitle title={title} required={required} note={note} />
      <input
        className="text-input focus-visible:outline-none"
        {...register(name)}
        type={type}
        placeholder={placeholder ?? label}
        required={required}
        disabled={readonly}
      />
      {formState.errors[name]?.type === "required" && (
        <ErrorMessage message={`${title} is required`} />
      )}
    </div>
  ) : (
    <div
      className={clsx(
        !!className && className,
        `flex w-full items-center rounded-[8px] border-[1px] border-solid ${
          error ? `border-red` : `border-lesslightgrey`
        } pr-[8px]`
      )}
    >
      <FormItemTitle title={title} required={required} note={note} />
      <input
        className="bg-transparent min-h-[48px] w-full py-[16px] pl-[13px] focus-visible:outline-none"
        {...register(name)}
        type={type}
        placeholder={placeholder ?? label}
        required={required}
        disabled={readonly}
      />
      <div className="cursor-pointer" onClick={onClickEndAdornment}>
        {EndAdornment}
      </div>
      {formState.errors[name]?.type === "required" && (
        <ErrorMessage message={`${title} is required`} />
      )}
    </div>
  );
}
