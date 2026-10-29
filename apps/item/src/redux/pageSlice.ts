import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { StoryResponse } from "@/models/story";

export interface PageInfo {
  org: string;
  page: string;
  chipId: string;
  story?: StoryResponse;
}

const defaultPageInfo: PageInfo = {
  org: "",
  page: "",
  chipId: "",
};

const initialState = defaultPageInfo;

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    savePageInfo: (state, action) => {
      const { org, page, id, story } = action.payload;
      state.org = org;
      state.page = page;
      state.chipId = id;
      state.story = story;
    },
  },
});

export const { savePageInfo } = pageSlice.actions;
export const selectPageInfo = (state: RootState) => state.page;
export const selectStory = (state: RootState) => selectPageInfo(state)?.story;

export default pageSlice.reducer;
