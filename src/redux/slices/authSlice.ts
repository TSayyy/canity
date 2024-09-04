import { createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

import { userSchema } from "@/schemas/userSchema";
import { decrypt } from "@/utils/crypto";

const encryptedUser = localStorage.getItem("user");
const decryptedUser = encryptedUser ? decrypt(encryptedUser, import.meta.env.VITE_TOKEN_SECRET) : undefined;
const user = decryptedUser ? JSON.parse(decryptedUser) : undefined;
const initialState: z.infer<typeof userSchema> = {
  id: user?.id || "",
  name: user?.name || "",
  email: user?.email || "",
  authStatus: user?.authStatus || false,
  role: user?.role || undefined,
  image: user?.image || undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: { payload: z.infer<typeof userSchema> }) => {
      return { ...state, ...action.payload };
    },
    resetUser: (state) => {
      return { ...state, id: "", name: "", email: "", authStatus: false, role: undefined, image: "" };
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
