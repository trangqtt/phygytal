// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
} from "firebase/auth";
import jwtDecode from "jwt-decode";
import { WEB_URL } from "@/constant";

import firebaseConfig from "../../firebase_config.json";

const oAuthPrivider = new OAuthProvider("apple.com");
const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

const actionCodeSettings: any = {
  url: WEB_URL,
  handleCodeInApp: false,
};

// Initialize Firebase
export const phygitalApp = initializeApp(firebaseConfig, "phygitalApp");

export const phygitalAuth: any = getAuth(phygitalApp);

export const signInFB = async () => {
  let response = {};

  try {
    const signInResponse = await signInWithPopup(phygitalAuth, fbProvider);
    const { user } = signInResponse;
    const data = transformUserData(user);

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
  } finally {
    return response;
  }
};

export const signInGoogle = async () => {
  let response = {};

  try {
    const signInResponse = await signInWithPopup(phygitalAuth, ggProvider);
    const { user } = signInResponse;
    const data = transformUserData(user);

    response = {
      errorCode: "",
      data,
    };

    return response;
  } catch (err: any) {
    const errorCode = err.code;
    response = {
      errorCode,
      errorMessage: errorCode,
      data: null,
    };
  } finally {
    return response;
  }
};

export const signInApple = async () => {
  let response = {};

  try {
    const signInResponse = await signInWithPopup(phygitalAuth, oAuthPrivider);
    const { user } = signInResponse;
    const data = transformUserData(user);

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
  } finally {
    return response;
  }
};

export const createAccount = async (email: string, password: string) => {
  let response = {};
  try {
    const createResponse = await createUserWithEmailAndPassword(
      phygitalAuth,
      email,
      password
    );

    response = {
      errorCode: "",
      data: createResponse.user,
    };
  } catch (err: any) {
    const errorCode = err.code;
    let errorMessage = "";

    if (errorCode === "auth/weak-password") {
      errorMessage = "Weak password! Please use stronger password.";
    }

    if (errorCode === "auth/email-already-in-use") {
      errorMessage = "Email address already in use.";
    }

    response = {
      errorCode,
      errorMessage,
      data: null,
    };
  } finally {
    return response;
  }
};

export const forgetPassword = async (email: string) => {
  let response = {};

  try {
    const resetResponse: any = await sendPasswordResetEmail(
      phygitalAuth,
      email,
      actionCodeSettings
    );

    response = {
      errorCode: "",
      data: resetResponse.user,
    };
  } catch (err: any) {
    const errorCode = err.code;
    let errorMessage = "";
    if (errorCode === "auth/invalid-email") {
      errorMessage = "Invalid Email.";
    }

    if (errorCode === "auth/user-not-found") {
      errorMessage = "User Not Found.";
    }

    response = {
      errorCode,
      errorMessage,
      data: null,
    };
  } finally {
    return response;
  }
};

export const signInEmailPass = async (email: string, password: string) => {
  let response = {};
  let errorMessage = "";

  try {
    const signInResponse = await signInWithEmailAndPassword(
      phygitalAuth,
      email,
      password
    );
    const { user } = signInResponse;
    const { emailVerified } = user;
    const data = transformUserData(user);

    response = {
      errorCode: !emailVerified ? "auth/email-not-verified" : "",
      errorMessage: !emailVerified ? "Please verify your email" : "",
      data,
    };
  } catch (err: any) {
    const errorCode = err.code;

    if (errorCode === "auth/user-not-found") {
      errorMessage = "Email Not Found.";
    }
    if (errorCode === "auth/invalid-email") {
      errorMessage = "Invalid Email.";
    }
    if (errorCode === "auth/wrong-password") {
      errorMessage = "Wrong Password.";
    }

    response = {
      errorCode,
      errorMessage,
      data: null,
    };

    throw `Code: ${errorCode} Message: ${errorMessage}`;
  } finally {
    return response;
  }
};

export const signOutFirebase = async () => {
  try {
    await signOut(phygitalAuth);
  } catch (err) {
    console.log("error", err);
  }
};

export const sendEmail = async () => {
  await sendEmailVerification(phygitalAuth.currentUser, actionCodeSettings);
};

export const transformUserData = (user: any) => {
  // return user
  let userData: any = {};
  const { accessToken, refreshToken, emailVerified } = user;
  const tokenDecoded: any = jwtDecode(accessToken);

  userData.uid = user.uid;
  userData.displayName = user.displayName || user.email;
  userData.photoUrl = user.photoUrl || "";
  userData.exp = tokenDecoded.exp || "";
  userData.email = user.email || "";
  userData.emailVerified = emailVerified || false;
  userData.accessToken = accessToken || "";
  userData.refreshToken = refreshToken || "";
  userData.signInProvider = tokenDecoded.firebase.sign_in_provider;

  return userData;
};

export const changePassword = (newPassword: string) => {
  const user = phygitalAuth.currentUser;

  return updatePassword(user, newPassword);
};
