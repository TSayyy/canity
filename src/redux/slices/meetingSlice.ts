import { createSlice } from "@reduxjs/toolkit";

export type MainStreamType = {
  userId: string;
  isSharingScreen: boolean;
};

type stateType = {
  isAsideOpen: boolean;
  asideVariant: "MEMBERS" | "CHAT";
  mainStream: MainStreamType | null;
  isMuted: boolean;
};

const initialState: stateType = {
  isAsideOpen: false,
  asideVariant: "MEMBERS",
  mainStream: null,
  isMuted: false,
};

const meetingSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    toggleAside: (state) => {
      state.isAsideOpen = !state.isAsideOpen;
    },
    closeAside: (state) => {
      state.isAsideOpen = false;
    },
    changeAsideVariant: (state, action) => {
      state.asideVariant = action.payload;
    },
    changeMainStream: (state, action) => {
      state.mainStream = action.payload;
    },
    removeMainStream: (state) => {
      state.mainStream = null;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
  },
});

export const { toggleAside, closeAside, changeAsideVariant, changeMainStream, removeMainStream, toggleMute } =
  meetingSlice.actions;
export const meetingReducer = meetingSlice.reducer;
