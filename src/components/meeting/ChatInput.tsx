import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useChat } from "@/contexts/ChatContext";
import { RootState } from "@/redux/store";

import { Button } from "../ui/button";

export function ChatInput() {
  const { id: roomId } = useParams();
  const { sendMessage } = useChat();
  const userId = useSelector((state: RootState) => state.auth?.id);
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    if (!roomId) return;
    sendMessage(message.trim(), roomId, userId);
    setMessage("");
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" && !e.shiftKey) {
        formRef.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <form ref={formRef} className="m-2 mb-0 flex items-center gap-3" id="chatForm" onSubmit={handleSubmit}>
      <textarea
        className="bg-[#222c54] h-10 overflow-hidden rounded-full px-5 py-2 grow text-md"
        placeholder="say something..."
        form="chatForm"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        size="icon"
        type="submit"
        className="rounded-full bg-white text-dark-navy transition-colors hover:bg-white/50"
      >
        <IoSend className="w-5 h-5" />
      </Button>
    </form>
  );
}
