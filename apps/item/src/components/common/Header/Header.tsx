import { selectUser } from "@/redux/userSlice";
import { signOutFirebase } from "@/utils/firebase";
import { useSelector } from "react-redux";
import { BurgerIcon, ProfileIcon } from "../icons";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { signOut } from "@/redux/userSlice";
import AuthModal from "@/components/AuthModal/AuthModal";
import { MouseEvent, useEffect, useState } from "react";
import MobileNav from "@/components/MobileNav/MobileNav";
import { generateHomeUrl } from "@/utils/url";
import clsx from "clsx";
import { useProductStory } from "@/hooks/useProductStory";
import { useTranslation } from "react-i18next";
import UserProfile from "@/components/UserProfile";
import { motion } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { useAppStepContext } from "@/hooks/useAppStepContext";
import { PageSteps } from "@/models/general";
import { Section } from "../SectionFullScreen/SectionFullScreen";
import { useRouter } from "next/router";

const Header = () => {
  const dispatch = useDispatch();
  const [openAuth, setOpenAuth] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const router = useRouter();

  const {
    org,
    chipId,
    isAstronautPage,
    logoUrl,
    isHuePage,
    isStonePage,
    isBaoNhanDan,
    productDetail,
    isLoading,
    organization,
  } = useProductStory();

  const handleClickProfile = (event: MouseEvent<HTMLButtonElement>) => {
    if (user?.uid) {
      setAnchorEl(event.currentTarget);
    } else {
      setOpenAuth(true);
    }
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    signOutFirebase();
    dispatch(signOut());
    setAnchorEl(null);
  };

  useEffect(() => {
    if (user?.uid) {
      setOpenAuth(false);
    }
  }, [user?.uid]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const homeUrl = generateHomeUrl(org, chipId);
  // const { progress: progress3D } = useProgress();
  const { currentStep } = useAppStepContext();

  let isReady;
  if (!isLoading && isStonePage) {
    // isReady = currentStep === PageSteps.Normal && progress3D === 100;
    isReady = currentStep === PageSteps.Normal;
  } else if (!isLoading && !isStonePage) {
    isReady = true;
  } else {
    isReady = false;
  }

  const handleClickLogo = () => {
    if (isStonePage) {
      const container = document.getElementById("snap-container");
      const targetEle = document.getElementById(Section.Home)!;
      const top = targetEle.offsetTop;

      if (container) {
        container.scrollTo({
          top,
          behavior: "smooth", // Add smooth scrolling effect
        });
      }
    }
  };

  return (
    <motion.div
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        y: isReady ? 0 : -100,
      }}
      transition={{
        duration: 0.5,
        delay: 0.4,
      }}
    >
      <div
        className={clsx(
          "header fixed z-50 flex h-[80px] w-full",
          isBaoNhanDan && "border-b border-neutral-4 bg-white-important"
        )}
      >
        {isBaoNhanDan ? (
          <div className="relative m-auto flex w-full max-w-[600px] items-center justify-between px-4">
            <div>
              <img
                src={organization?.org_logo_url}
                alt={org}
                className="w-28 cursor-pointer object-contain"
              />
            </div>
            <div className="flex rounded-sm bg-red-light p-2">
              <p className="text-xs font-semibold text-red-medium">
                {`Phiên bản thứ 0${Number(
                  (router?.query?.id as string).split("-")[1]
                )}`}
              </p>
              <p className="text-xs font-semibold text-neutral-6">/100</p>
            </div>
          </div>
        ) : (
          <div className="relative m-auto flex w-full max-w-[600px] items-center justify-between px-[24px]">
            <div className="z-5 inset-0 flex w-full max-w-[600px] items-center justify-between bg-[transparent]">
              {!isAstronautPage && (
                <BurgerIcon
                  className={clsx("cursor-pointer")}
                  onClick={() => {
                    setOpenNav(true);
                  }}
                />
              )}
              <div className="flex w-full items-center justify-start">
                {logoUrl && (
                  <div
                    className={clsx(
                      "relative z-10 max-h-[85px] max-w-[600px]",
                      isAstronautPage &&
                        "flex h-fit w-fit flex-col items-center gap-[30px]",
                      !isAstronautPage && "h-full w-full"
                    )}
                  >
                    <div className="w-full">
                      <Link
                        onClick={handleClickLogo}
                        href={homeUrl}
                        className={clsx(
                          "z-50 m-auto block w-fit",
                          isHuePage ? "h-[60px]" : "h-[40px]"
                        )}
                      >
                        <img
                          src={logoUrl}
                          alt={org}
                          className="m-auto h-full w-auto object-contain"
                        />
                      </Link>
                    </div>
                    {isAstronautPage && (
                      <p className="text-[10px] font-normal">
                        Powered by KardiaChain
                      </p>
                    )}
                  </div>
                )}
              </div>
              {
                <ProfileIcon
                  className="cursor-pointer"
                  onClick={handleClickProfile}
                />
              }
            </div>
            {/* <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          ></Popover> */}
            <UserProfile
              closeModal={handleClose}
              openModal={open}
              handleLogOut={handleSignout}
            />
          </div>
        )}

        <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
        <MobileNav open={openNav} onClose={() => setOpenNav(false)} />
      </div>
    </motion.div>
  );
};

export default Header;
