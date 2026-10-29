import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseApp } from ".";
import { GoogleAuthResponse } from "../../models/general";
import { transformGoogleUser } from "@lib/utils";

const GoogleProvider = new GoogleAuthProvider();

export const signInGoogle = async () => {
  const auth = getAuth(FirebaseApp);
  let response: GoogleAuthResponse = {
    errorCode: "",
    data: null,
  };

  try {
    const signInResponse = await signInWithPopup(auth, GoogleProvider);
    const { user } = signInResponse;
    const data = transformGoogleUser(user);

    response = {
      errorCode: "",
      data,
    };

    return response;
  } catch (err: any) {
    const errorCode = err.code;
    response = {
      errorCode,
      data: null,
    };
  }
};
