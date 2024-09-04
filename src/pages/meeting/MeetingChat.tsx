import { ChatBubble } from "@/components/meeting/ChatBubble";
import { ChatInput } from "@/components/meeting/ChatInput";
import { useChat } from "@/contexts/ChatContext";

export function MeetingChat() {
  const { chat } = useChat();

  return (
    <div className="grow flex flex-col text-white max-h-[calc(100dvh-108px)]">
      <div className="flex-1 flex flex-col gap-4 m-2 mt-4 max-h-[calc(100dvh-195px)] overflow-y-auto overflow-x-hidden scrollbar">
        {
          // map through messages
          chat.messages.map((message, index) => (
            <ChatBubble key={index} message={message} />
          ))
        }
      </div>
      <ChatInput />
    </div>
  );
}
