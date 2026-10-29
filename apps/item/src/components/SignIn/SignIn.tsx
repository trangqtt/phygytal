import React from "react";
import Form from "../common/form-ui-kit/Form";
import { useForm } from "react-hook-form";
import FormRow from "../common/form-ui-kit/FormRow";
import TextInput from "../common/form-ui-kit/TextInput";
import {
  signInApple,
  signInEmailPass,
  signInFB,
  signInGoogle,
} from "@/utils/firebase";
import { useDispatch } from "react-redux";
import { signIn } from "@/redux/userSlice";
import { toast } from "react-toastify";
import Link from "next/link";
import Button from "../common/Button";
import { GoogleIcon } from "../common/icons";
import { useTranslation } from "next-i18next";

export default function SignIn() {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // handle login with emai/pass
  const onSubmit = async (data: any) => {
    const { email, password } = data;
    const response: any = await signInEmailPass(email, password);

    if (!response.errorCode) {
      dispatch(signIn(response.data));
    } else {
      toast.error(response.errorMessage, {
        toastId: "signin-error",
      });
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
        <Button type="submit" fluid={true} className="uppercase mt-[12px]">
          {t("auth.signIn")}
        </Button>
      </Form>
    </div>
  );
}
