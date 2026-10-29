import React from "react";
import Form from "../common/form-ui-kit/Form";
import { useForm } from "react-hook-form";
import FormRow from "../common/form-ui-kit/FormRow";
import TextInput from "../common/form-ui-kit/TextInput";
import {
  forgetPassword,
  signInApple,
  signInEmailPass,
  signInFB,
  signInGoogle,
} from "@/utils/firebase";
import { toast } from "react-toastify";
import Button from "../common/Button/Button";
import { useTranslation } from "react-i18next";

export default function ForgetPassword() {
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: {
      email: "",
    },
  });

  // handle login with emai/pass
  const onSubmit = async (data: any) => {
    const { email } = data;
    const response: any = await forgetPassword(email);

    if (!response.errorCode) {
      // dispatch(signIn(response.data));
      toast.info(
        "Please check your email to get password recovery instruction",
        {
          toastId: "forget-password",
        }
      );
    } else {
      toast.error(response.errorMessage, {
        toastId: "forget-password",
      });
    }
  };

  return (
    <div>
      <Form methods={methods} onSubmit={onSubmit}>
        <FormRow>
          <TextInput label="Email" name="email" type="email" />
        </FormRow>

        <Button type="submit" fluid={true}>
          {t("auth.recover")}
        </Button>
      </Form>
    </div>
  );
}
