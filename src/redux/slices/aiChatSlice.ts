import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  typing: boolean;
  error: string | undefined;
};

const initialState: TInitialState = {
  typing: false,
  error: undefined,
};

export const aiChatSlice = createSlice({
  name: "aiChat",
  initialState,
  reducers: {
    setAssistantTyping: (state, action: { payload: boolean }) => {
      state.typing = action.payload;
    },
    setAssistantError: (state, action: { payload: string | undefined }) => {
      state.error = action.payload;
    },
  },
});

export const { setAssistantTyping, setAssistantError } = aiChatSlice.actions;
export const aiChatReducer = aiChatSlice.reducer;
