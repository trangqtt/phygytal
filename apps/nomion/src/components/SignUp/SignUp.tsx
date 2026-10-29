import React from "react";
import Form from "../common/form-ui-kit/Form";
import { useForm } from "react-hook-form";
import FormRow from "../common/form-ui-kit/FormRow";
import TextInput from "../common/form-ui-kit/TextInput";
import { createAccount, sendEmail, signInGoogle } from "@/utils/firebase";
import { toast } from "react-toastify";
import Button from "../common/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { signUpAccount } from "@/apis/sign-up";
import { useTranslation } from "next-i18next";

export default function SignUp() {
  const { t } = useTranslation();

  const mutationSignUp = useMutation((accessToken: string) =>
    signUpAccount(accessToken)
  );

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    const response: any = await createAccount(email, password);
    if (response.errorCode) {
      // setErrorAuthMessage(response.errorMessage)
      // setIsAuthError(true)
      toast.error(response.errorMessage, {
        toastId: "create-account",
      });
    } else {
      await sendEmail();
      mutationSignUp.mutate(response?.data?.accessToken);
      // setIsOpenInfoSnackbar(true)
      // setInfoMessage('An Email has been sent to your email for verification')
      // toast.info(" An Email has been sent to your email for verification!", {
      //   toastId: "email-verification",
      // });
    }
  };

  return (
    <div>
      <Form methods={methods} onSubmit={onSubmit}>
        <FormRow>
          <TextInput label="Email" name="email" type="email" />
        </FormRow>
        <FormRow>
          <TextInput label="Password" name="password" type="password" />
        </FormRow>
        <Button type="submit" fluid={true} className="mt-[12px] uppercase">
          {t("auth.signUp")}
        </Button>
      </Form>
    </div>
  );
}
