import { setUserInfo } from "@/utils/user";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserData } from "@/models/UserData";

export interface PageInfo {
  story: any;
}

const defaultPageInfo: PageInfo = {
  story: null
};

const initialState = defaultPageInfo;

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    savePageInfo: (state, action) => {
      const { story } = action.payload;
      state.story = story
    },
  },
});

export const { savePageInfo } = pageSlice.actions;
export const selectPageInfo = (state: RootState) => state.pageInfo;

export default pageSlice.reducer;
