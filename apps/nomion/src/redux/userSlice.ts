import { setUserInfo } from "@/utils/user";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserData } from "@/models/UserData";
import { userInfoKey } from "@/constant";

const defaultUser: UserData = {
  uid: "",
  userName: "",
  displayName: "",
  avatar: "",
  email: "",
  exp: 0,
  emailVerified: false,
  accessToken: "",
};

const initialState = {
  user: defaultUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
      setUserInfo(action.payload);
    },
    signOut: (state) => {
      state.user = defaultUser;
      setUserInfo(defaultUser);
      localStorage.removeItem(userInfoKey);
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserUId = (state: RootState) => selectUser(state).uid;
export const selectUserAccesstoken = (state: RootState) =>
  selectUser(state).accessToken;
export const selectUserEmail = (state: RootState) => selectUser(state).email;
export const selectUsername = (state: RootState) => selectUser(state).userName;

export default userSlice.reducer;
