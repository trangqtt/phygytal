export type UserData = {
  uid: string;
  userName: string;
  displayName: string;
  avatar: string;
  exp: number;
  email: string;
  emailVerified: boolean;
  accessToken: string;
  signInProvider?: SignInProvider;
};

export type SignInProvider = "password" | "google.com";
export interface UpdateUser {
  full_name: string;
}