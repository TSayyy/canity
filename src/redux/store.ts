import { configureStore } from "@reduxjs/toolkit";

import { aiChatReducer } from "./slices/aiChatSlice";
import { authReducer } from "./slices/authSlice";
import { meetingReducer } from "./slices/meetingSlice";
import { navReducer } from "./slices/navSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer,
    meeting: meetingReducer,
    aiChat: aiChatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
