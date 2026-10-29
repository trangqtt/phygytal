import { useRouter } from "next/router";
import React, { useState } from "react";
import { Dialog } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import LeJLogo from "@/assets/images/lej-logo.png";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import clsx from "clsx";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import { GoogleIcon } from "../common/icons";
import Button from "../common/Button/Button";
import { signInApple, signInFB, signInGoogle } from "@/utils/firebase";
import { signIn, signOut } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

const TabValue = {
  SIGN_UP: "SIGN_UP",
  SIGN_IN: "SIGN_IN",
  FORGET_PASS: "FORGET_PASS",
};

interface AuthProps {
  open: boolean;
  onClose(): void;
}

interface TabItemProps {
  label: string;
  isSelected?: boolean;
  onClick?(): void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabItem({ label, onClick, isSelected }: TabItemProps) {
  return (
    <div
      className={clsx(
        "cursor-pointer px-[18px] py-[10px] text-[14px] font-medium leading-[22px] text-[#595959]",
        isSelected &&
          "border-b-solid border-b-[1px] border-b-white text-[#F0F0F0]"
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

export default function AuthModal({ open = true, onClose }: AuthProps) {
  const router = useRouter();
  const [currentTabValue, setCurrentValue] = useState(TabValue.SIGN_IN);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onChangeTab = (value: string) => {
    if (currentTabValue !== value) {
      setCurrentValue(value);
    }
  };

  const handleLoginGoogle = async () => {
    const response: any = await signInGoogle();

    if (!response.errorCode) {
      dispatch(signIn(response.data));
    } else {
      toast.error(response.errorMessage, {
        toastId: "signin-error",
      });
    }
  };

  const handleLoginFacebook = async () => {
    const response: any = await signInFB();

    if (!response.errorCode) {
      dispatch(signIn(response.data));
    }
  };

  const handleLoginApple = async () => {
    const response: any = await signInApple();

    if (!response.errorCode) {
      dispatch(signIn(response.data));
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      sx={{
        maxWidth: "600px",
        margin: "auto"
      }}
    >
      <div className="h-full bg-black text-white">
        <div className="absolute right-2 top-2 cursor-pointer">
          <CloseIcon onClick={onClose} />
        </div>
        <div className="mt-[80px]">
          <div className="mt-[30px]">
            <div className="mb-[25px] flex justify-center">
              <TabItem
                label={t("auth.signIn")}
                onClick={() => onChangeTab(TabValue.SIGN_IN)}
                isSelected={currentTabValue === TabValue.SIGN_IN}
              />
              <TabItem
                label={t("auth.signUp")}
                onClick={() => onChangeTab(TabValue.SIGN_UP)}
                isSelected={currentTabValue === TabValue.SIGN_UP}
              />
            </div>
            <div className="tab-content px-[30px]">
              {currentTabValue === TabValue.SIGN_IN && <SignIn />}
              {currentTabValue === TabValue.SIGN_UP && <SignUp />}
              {currentTabValue === TabValue.FORGET_PASS && (
                <>
                  <ForgetPassword />
                  <div
                    onClick={() => onChangeTab(TabValue.SIGN_IN)}
                    className="mt-[16px] flex cursor-pointer justify-center"
                  >
                    Back
                  </div>
                </>
              )}

              {currentTabValue !== TabValue.FORGET_PASS && (
                <>
                  <div className="my-[12px] flex items-center justify-center">
                    {t("auth.or")}
                  </div>
                  <Button
                    type="button"
                    onClick={handleLoginGoogle}
                    fluid={true}
                    className="uppercase"
                    variant="secondary"
                  >
                    <GoogleIcon className="mr-[16px] inline-block h-[18px] w-[18px]" />
                    {t("auth.signInWithGoogle")}
                  </Button>
                  <div
                    onClick={() => onChangeTab(TabValue.FORGET_PASS)}
                    className="mt-[16px] flex justify-center underline underline-offset-4"
                  >
                    {t("auth.forgotPassword")}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
