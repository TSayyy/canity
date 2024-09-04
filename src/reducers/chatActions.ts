import { IMessage } from "../contexts/ChatContext";

export const ADD_MESSAGE = "ADD_MESSAGE" as const;
export const TOGGLE_CHAT = "TOGGLE_CHAT" as const;
export const ADD_HISTORY = "ADD_HISTORY" as const;

export const addMessage = (message: IMessage) => ({
  type: ADD_MESSAGE,
  payload: { message },
});

export const toggleChat = (isOpen: boolean) => ({
  type: TOGGLE_CHAT,
  payload: { isOpen },
});

export const addHistory = (messages: IMessage[]) => ({
  type: ADD_HISTORY,
  payload: { messages },
});
