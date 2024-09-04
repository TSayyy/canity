import { UseFormReturn } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import { db } from "@/db";
import { deleteChat, sendMessage } from "@/db/chat";
import { generateTitle, startChat } from "@/lib/aiChat";
import { setAssistantTyping } from "@/redux/slices/aiChatSlice";
import { messageBoxSchema } from "@/schemas/messageBox";

import { useChatExist } from "./useChatExist";
import { useClearParam, useGetParam, useSetParam } from "./useParamHelpers";

type TForm = UseFormReturn<z.infer<typeof messageBoxSchema>>;

export const useHandleAIChat = (form?: TForm) => {
  const dispatch = useDispatch();
  const idParam = useGetParam("id");
  const clearIDParam = useClearParam();
  const existingChat = useChatExist();
  const setParam = useSetParam();
  const model = startChat(existingChat || []);
  const chatTitle = generateTitle();

  const handleMessage = {
    startChat: async (message: string) => {
      const id = uuid();
      const time = Date.now();
      try {
        setParam({ param: "id", value: id });
        await db.chat.add({ chatID: id, role: "user", parts: message, time });
        form?.reset();
        await db.chatTitle.add({ id, title: await chatTitle(message), time });
        dispatch(setAssistantTyping(true));
        const result = await model.sendMessage(message);
        const response = result.response;
        const text = response.text();
        dispatch(setAssistantTyping(false));
        await sendMessage(id, "model", text);
        return id;
      } catch (error) {
        toast.error("Sorry, Something went wrong. Please try again.");
        dispatch(setAssistantTyping(false));
        clearIDParam("id");
        deleteChat(id);
      }
    },
    continueChat: async (message: string) => {
      if (!idParam) return;
      try {
        await sendMessage(idParam, "user", message);
        form?.reset();
        dispatch(setAssistantTyping(true));
        const result = await model.sendMessage(message);
        const response = result.response;
        const text = response.text();
        dispatch(setAssistantTyping(false));
        await sendMessage(idParam, "model", text);
      } catch (error) {
        toast.error("Sorry, Something went wrong. Please try again.");
        dispatch(setAssistantTyping(false));
        clearIDParam("id");
        deleteChat(idParam);
      }
    },
  };
  return handleMessage;
};
