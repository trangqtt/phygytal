import { Modal } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Form from "../common/form-ui-kit/Form";
import FormRow from "../common/form-ui-kit/FormRow";
import TextInput from "../common/form-ui-kit/TextInput";
import Button from "../common/Button/Button";
import EyeIcon from "../common/icons/EyeIcon";
import GoBackIcon from "../common/icons/GoBackIcon";
import { useTranslation } from "react-i18next";
import { containWhiteSpace } from "@/utils/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "@/utils/firebase";
import { toast } from "react-toastify";
import { UpdateUser } from "@/models/UserData";
import { updateUser } from "@/apis/user";

interface PasswordChangeProps {
  closeModal: () => void;
  openModal: boolean;
}

const PasswordChange: FunctionComponent<PasswordChangeProps> = ({
  closeModal,
  openModal = true,
}) => {
  const [seeNewPassword, setSeeNewPassword] = useState(false);
  const [seeCurrentPassword, setSeeCurrentPassword] = useState(false);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState<boolean>(false);
  const [changePasswordError, setChangePasswordError] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<any>("");
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const changePasswordMethods = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      // userNewPassword: "",
    },
  });
  // const changedData = changePasswordMethods.watch();

  // const updateMutation = useMutation((data: UpdateUser) => updateUser(data), {
  //   onSuccess() {
  //     queryClient.invalidateQueries(["user-info"]);
  //     toast.success("Update user success");
  //   },
  // });

  const changePassMutation = useMutation((data: string) => changePassword(data), {
    onSuccess() {
      toast.success("Update password success");
      closeModal();
      changePasswordMethods.reset();
    },
    onError(e: any) {
      const code = e.code;
      toast.error("New password is not valid")
      // switch (code) {
      //   case "auth/weak-password":
      // }
    }
  });

  const handleChangePassword = (formData: any) => {
    changePassMutation.mutate(formData.newPassword)
   
  };

  // useEffect(() => {
  //   if (
  //     changedData.userNewPassword.length > 0 &&
  //     changedData.userNewPassword === changedData.userPassword
  //   ) {
  //     setChangePasswordError("newPasswordNotChange");
  //     setDisableSubmitBtn(true);
  //   } else if (containWhiteSpace(changedData.userNewPassword)) {
  //     setChangePasswordError("haveWhiteSpacesInPassword");
  //     setDisableSubmitBtn(true);
  //   } else {
  //     setChangePasswordError("");
  //     setDisableSubmitBtn(false);
  //   }
  // }, [changedData]);

  // useEffect(() => {
  //   switch (changePasswordError) {
  //     case "newPasswordNotChange":
  //       setErrorMessage(t("profile.errorMessage.matchesTheOldPassword"));
  //       break;
  //     case "haveWhiteSpacesInPassword":
  //       setErrorMessage(t("profile.errorMessage.passwordContainWhiteSpace"));
  //       break;
  //     default:
  //       setErrorMessage("");
  //   }
  // }, [changePasswordError]);

  return (
    <Modal
      open={openModal}
      className="px-[16px]"
      sx={{ backgroundColor: "rgba(0,0,0,1)" }}
    >
      <Form methods={changePasswordMethods} onSubmit={handleChangePassword}>
        <div className="Header relative flex min-h-[56px] w-full items-center justify-center">
          <div>
            <p>{t("profile.passwordChange")}</p>
          </div>
          <div
            className="absolute bottom-[8px] left-[0px] top-[8px] cursor-pointer rounded-full bg-darkgrey p-[8px]"
            onClick={closeModal}
          >
            <GoBackIcon />
          </div>
        </div>
        <div className="Body flex flex-col gap-[16px]">
          <div className="inputs-section">
            {/* <FormRow>
              <div className="user-password w-full">
                <p>{t("profile.userCurrentPassword")}</p>
                <TextInput
                  required
                  name="userPassword"
                  className=""
                  type={seeCurrentPassword ? "text" : "password"}
                  EndAdornment={<EyeIcon />}
                  onClickEndAdornment={() =>
                    setSeeCurrentPassword(!seeCurrentPassword)
                  }
                />
              </div>
            </FormRow> */}
            <FormRow>
              <div className="user-password w-full">
                <p>{t("profile.userNewPassword")}</p>
                <TextInput
                  error={disableSubmitBtn}
                  required
                  name="newPassword"
                  className=""
                  type={seeNewPassword ? "text" : "password"}
                  EndAdornment={<EyeIcon />}
                  onClickEndAdornment={() => setSeeNewPassword(!seeNewPassword)}
                />
                <p className="text-red">{errorMessage}</p>
              </div>
            </FormRow>
          </div>
          <Button
            type="submit"
            className="rounded-[8px] bg-white p-[8px] text-black"
            // disable={disableSubmitBtn}
          >
            {t("profile.changePassword")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default PasswordChange;
