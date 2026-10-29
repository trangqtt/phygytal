import { envMode } from "@/constant";
import { DevTool } from "@hookform/devtools";
import React from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";

export interface FormProps {
  methods: UseFormReturn<any, any>;
  defaultValues?: any;
  children?: React.ReactNode;
  onSubmit?(params: any): void;
  className?: string;
}

export default function Form({
  methods,
  children,
  className,
  onSubmit = () => {},
}: FormProps) {
  // const methods = useForm({
  //   defaultValues,
  // });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
        {envMode === "development" && <DevTool control={methods.control} />}
      </form>
    </FormProvider>
  );
}
