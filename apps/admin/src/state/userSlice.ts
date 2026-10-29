import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../types/user';
import { setToLS, setUserInfo } from '../utils/storage';
import { accessTokenKey } from '../constants';
import jwtDecode from 'jwt-decode';
import { RootState } from './store';

const defaultUser: UserData = {
  id: '',
  userName: '',
  avatar: '',
  email: '',
  exp: 0,
  emailVerified: false,
  accessToken: '',
  refreshToken: '',
  role: '',
};

const initialState = defaultUser;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.avatar = action.payload.avatar;
      state.exp = action.payload.exp;
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.emailVerified = action.payload.emailVerified;
      state.refreshToken = action.payload.refreshToken;
      setUserInfo(action.payload);
      if (action.payload.accessToken) {
        const token = jwtDecode(action.payload.accessToken) as any;
        state.role = token.role;
        window.localStorage.setItem(accessTokenKey, action.payload.accessToken);
      }
    },
    logout: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = { ...defaultUser };
      setUserInfo(null);
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectUserRole = (state: RootState) => selectUser(state).role;

export default userSlice.reducer;
