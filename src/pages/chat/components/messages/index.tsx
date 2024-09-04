import { useEffect, useRef } from "react";

import { useChatExist } from "@/hooks/useChatExist";

import { Message } from "./message";
import { Typing } from "./typing";

export const MessagesContainer = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const chatExist = useChatExist();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [chatExist]);

  if (!chatExist) return null;

  return (
    <ul
      ref={listRef}
      className="flex-grow w-full pt-8 space-y-4 pe-2 chat-scrollbar overflow-hidden text-white max-h-[calc(100svh-6rem)] overflow-y-auto"
    >
      {chatExist.map((message) => (
        <Message key={message.time} role={message.role} text={message.parts} />
      ))}
      <Typing />
    </ul>
  );
};
