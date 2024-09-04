import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeNav: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleNav, closeNav } = navSlice.actions;
export const navReducer = navSlice.reducer;
