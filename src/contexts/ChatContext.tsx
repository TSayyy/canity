import { ReactNode, createContext, useContext, useEffect, useReducer } from "react";

import {
  addHistory as addHistoryAction,
  addMessage as addMessageAction,
  toggleChat as toggleChatAction,
} from "../reducers/chatActions";
import { ChatState, chatReducer } from "../reducers/chatReducer";
import { socket } from "../socket";

export interface IMessage {
  content: string;
  author?: string;
  timestamp: number;
}

type ChatContextProps = {
  chat: ChatState;
  sendMessage: (message: string, roomId: string, author: string) => void;
  toggleChat: () => void;
};
export const ChatContext = createContext<ChatContextProps>({
  chat: {
    messages: [],
    isChatOpen: false,
  },
  sendMessage: () => {},
  toggleChat: () => {},
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chat, dispatch] = useReducer(chatReducer, {
    messages: [],
    isChatOpen: false,
  });

  function sendMessage(message: string, roomId: string, author: string) {
    const messageObj: IMessage = {
      content: message,
      author,
      timestamp: new Date().getTime(),
    };
    dispatch(addMessageAction(messageObj));

    socket.emit("new-message-added", { messageObj, roomId });
  }

  function toggleChat() {
    dispatch(toggleChatAction(!chat.isChatOpen));
  }

  function addMessage(message: IMessage) {
    dispatch(addMessageAction(message));
  }

  function addHistory(messages: IMessage[]) {
    console.log("adding history", messages);
    dispatch(addHistoryAction(messages));
  }

  useEffect(() => {
    socket.on("get-messages", addHistory);
    socket.on("new-message-received", addMessage);
    return () => {
      socket.off("get-messages");
      socket.off("new-message-received");
    };
  }, []);
  return (
    <ChatContext.Provider
      value={{
        chat,
        sendMessage,
        toggleChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChat() {
  return useContext(ChatContext);
}
