import { StateCreator } from "zustand";

export type UserSlice = {
  username: string;
  password: string;
  signIn: (username: string, password: string) => void;
};

const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  username: "",
  password: "",
  signIn: (username: string, password: string) => set(() => ({ username, password })),
});

export default createUserSlice;
