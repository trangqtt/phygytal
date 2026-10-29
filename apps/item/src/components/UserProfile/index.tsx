import { FunctionComponent, useEffect, useRef, useState } from "react";
import Form from "../common/form-ui-kit/Form";
import { useForm } from "react-hook-form";
import { CloseIcon } from "../common/icons";
import FormRow from "../common/form-ui-kit/FormRow";
import TextInput from "../common/form-ui-kit/TextInput";
import Button from "../common/Button/Button";
import { Dialog, Input, Modal, Theme } from "@mui/material";
import CopyIcon from "../common/icons/CopyIcon";
import { toast } from "react-toastify";
import LogoutIcon from "../common/icons/LogoutIcon";
import PasswordChange from "../PasswordChange";
import { Transition } from "../MobileNav/MobileNav";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData, updateUser } from "@/apis/user";
import { UpdateUser } from "@/models/UserData";
import { selectSignInProvider, selectUserUId } from "@/redux/userSlice";

interface UserProfileProps {
  closeModal: () => void;
  openModal: boolean;
  handleLogOut: () => void;
}

const UserProfile: FunctionComponent<UserProfileProps> = ({
  closeModal,
  openModal = true,
  handleLogOut,
}) => {
  const queryClient = useQueryClient();
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);

  const userId = useSelector(selectUserUId);

  const { t } = useTranslation();

  const { data, isLoading } = useQuery(["user-info"], getUserData, {
    enabled: !!userId,
  });
  const updateMutation = useMutation((data: UpdateUser) => updateUser(data), {
    onSuccess() {
      queryClient.invalidateQueries(["user-info"]);
      toast.success("Update user success");
    },
  });

  const handleCopyUserWalletAddress = (value: any) => {
    navigator.clipboard.writeText(data?.wallet_address);
  };

  const onSubmitUserNewInformations = (data: any) => {
    updateMutation.mutate({
      full_name: data.full_name,
    });
  };

  const userInformationInputSection = [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: t("profile.userName"),
      name: "full_name",
      type: "text",
    },
  ];

  const userInformationsMethods = useForm({
    defaultValues: {
      full_name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (!!data) {
      userInformationsMethods.reset(data);
    }
  }, [data, userInformationsMethods]);

  const signInProvider = useSelector(selectSignInProvider);

  return (
    <Dialog
      TransitionComponent={Transition}
      fullScreen
      open={openModal}
      classes={{ paper: "bg-black" }}
    >
      <>
        <Form
          methods={userInformationsMethods}
          onSubmit={onSubmitUserNewInformations}
          className="h-full bg-black px-[16px]"
        >
          <div className="Header relative flex min-h-[56px] w-full items-center justify-center">
            <div>
              <p>{t("profile.title")}</p>
            </div>
            <div
              className="absolute bottom-[8px] right-[0px] top-[8px] rounded-full bg-darkgrey p-[8px]"
              onClick={closeModal}
            >
              <CloseIcon width="24" height="24" />
            </div>
          </div>
          <div className="inputs-section flex flex-col gap-[24px]">
            <div className="user-detail flex flex-col gap-[12px] border-b-[1px] border-solid border-darkgrey pb-[24px]">
              {userInformationInputSection.map(
                (e: { name: string; label: string; type: any }, index) => {
                  return (
                    <FormRow key={index} className="flex flex-col gap-[2px]">
                      <p className="">{e.label}</p>
                      <TextInput
                        name={e.name}
                        type={e.type}
                        readonly={e.name === "email"}
                      />
                    </FormRow>
                  );
                }
              )}
              <Button
                className="w-full rounded-[8px] border-[1px] border-solid border-white bg-white p-[8px] text-black"
                type="submit"
              >
                {t("common.saveBtn")}
              </Button>
              {signInProvider === "password" && (
                <Button
                  className="rounded-[8px] bg-darkgrey text-white"
                  onClick={() => setOpenChangePasswordModal(true)}
                >
                  {t("profile.passwordChange")}
                </Button>
              )}
            </div>
            {/* <div className="user-wallet-address flex flex-col gap-[16px]">
              <FormRow>
                <div className="user-private-key w-full">
                  <p>{t("profile.walletAddress")}</p>
                  <TextInput
                    name="walletAddress"
                    value={data?.wallet_address}
                    className=""
                    EndAdornment={<CopyIcon />}
                    onClickEndAdornment={handleCopyUserWalletAddress}
                    readonly={true}
                  />
                </div>
              </FormRow>
            </div> */}
            <div
              className="log-out flex w-full justify-center gap-4"
              onClick={() => handleLogOut()}
            >
              <div className="text-red">{t("common.logoutBtn")}</div>
              <div>
                <LogoutIcon />
              </div>
            </div>
          </div>
        </Form>
        <PasswordChange
          closeModal={() => setOpenChangePasswordModal(false)}
          openModal={openChangePasswordModal}
        />
      </>
    </Dialog>
  );
};

export default UserProfile;
