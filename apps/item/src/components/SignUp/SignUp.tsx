import React from "react";
import Form from "../common/form-ui-kit/Form";
import { useForm } from "react-hook-form";
import FormRow from "../common/form-ui-kit/FormRow";
import TextInput from "../common/form-ui-kit/TextInput";
import { createAccount, sendEmail, signInGoogle } from "@/utils/firebase";
import { toast } from "react-toastify";
import Button from "../common/Button/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUpAccount } from "@/apis/sign-up";
import { useTranslation } from "next-i18next";
import { UpdateUser } from "@/models/UserData";
import { updateUser } from "@/apis/user";

export default function SignUp() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // const mutationSignUp = useMutation((accessToken: string) =>
  //   signUpAccount(accessToken)
  // );

  const updateMutation = useMutation((data: UpdateUser) => updateUser(data), {
    onSuccess() {
      queryClient.invalidateQueries(["user-info"]);
    },
  });

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    const { email, password, full_name } = data;

    const response: any = await createAccount(email, password);
    if (response.errorCode) {
      // setErrorAuthMessage(response.errorMessage)
      // setIsAuthError(true)
      toast.error(response.errorMessage, {
        toastId: "create-account",
      });
    } else {
      await sendEmail();

      setTimeout(() => {
        updateMutation.mutate({
          full_name,
        });
      }, 5000);

      // mutationSignUp.mutate(response?.data?.accessToken);
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
          <TextInput label="Name" name="full_name" type="text" />
        </FormRow>
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
