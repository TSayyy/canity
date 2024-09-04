import { IMessage } from "../contexts/ChatContext";
import { ADD_HISTORY, ADD_MESSAGE, TOGGLE_CHAT } from "./chatActions";

export type ChatState = {
  messages: IMessage[];
  isChatOpen: boolean;
};
type ChatAction =
  | {
      type: typeof ADD_MESSAGE;
      payload: { message: IMessage };
    }
  | {
      type: typeof ADD_HISTORY;
      payload: { messages: IMessage[] };
    }
  | {
      type: typeof TOGGLE_CHAT;
      payload: { isOpen: boolean };
    };

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    case "TOGGLE_CHAT":
      return {
        ...state,
        isChatOpen: action.payload.isOpen,
      };
    case "ADD_HISTORY":
      return {
        ...state,
        messages: action.payload.messages,
      };
    default:
      return state;
  }
}
