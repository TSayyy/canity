import { useSelector } from "react-redux";

import { IMessage } from "@/contexts/ChatContext";
import { useRoom } from "@/contexts/RoomContext";
import { RootState } from "@/redux/store";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function ChatBubble({ message }: { message: IMessage }) {
  const { peers } = useRoom();
  const author = message?.author ? peers[message.author]?.userName : undefined;
  const userName = author || "Anonymous";
  const isSelf = useSelector((state: RootState) => state.auth?.id) === message.author;
  return (
    <div className="flex gap-2 items-end">
      {!isSelf && (
        <Avatar className="w-6 h-6">
          <AvatarImage src={""} title={userName} alt={userName} />
          <AvatarFallback className=" bg-zinc-500 text-xs">{userName?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div className={`flex flex-col w-full ${isSelf && "items-end text-right mr-2"} `}>
        <pre
          className={`text-sm  px-4 py-3 rounded-3xl  max-w-60 w-fit text-wrap ${isSelf ? " bg-royal-blue rounded-br-none" : "bg-[#222c54] rounded-bl-none"}`}
        >
          {message.content}
        </pre>
      </div>
    </div>
  );
}
