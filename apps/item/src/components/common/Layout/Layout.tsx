import React, { useEffect } from "react";
import Header from "../Header";
import { signIn, signOut } from "@/redux/userSlice";
import { phygitalAuth, transformUserData } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useProductStory } from "@/hooks/useProductStory";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  [key: string]: any;
}

export default function Layout({ children, ...rest }: Props) {
  const dispatch = useDispatch();
  const { pathname, query, push } = useRouter();
  const { isBaoNhanDan } = useProductStory();

  if (query?.s !== undefined && typeof window !== "undefined") {
    const url = window.location.origin + window.location.pathname;
    window.history.replaceState({ path: url }, "", url);
  }

  const isErrorPage = pathname === "/" || pathname === "/error";

  useEffect(() => {
    onAuthStateChanged(phygitalAuth, (currentUser) => {
      if (currentUser !== null) {
        const data = transformUserData(currentUser);
        dispatch(signIn(data));

        // detect if user email is verified
        // or user login by google mail and facebook
        // if (
        //   data.emailVerified ||
        //   currentUser?.providerData[0]?.providerId.includes("google") ||
        //   currentUser?.providerData[0]?.providerId.includes("facebook")
        // ) {
        //   dispatch(signIn(data));
        // }
      } else {
        // To clear previous state data
        dispatch(signOut());
        // onClose()
      }
    });
  }, [dispatch]);

  return (
    <div {...rest}>
      {!isErrorPage && <Header />}
      <main
        className={clsx(
          "main min-h-[100vh] font-svnPoppins",
          isBaoNhanDan && "bg-white-important"
        )}
      >
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
