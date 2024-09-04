import clsx from "clsx";
import { useLiveQuery } from "dexie-react-hooks";
import { HiFolderRemove } from "react-icons/hi";
import { z } from "zod";

import AnimateIn from "@/components/ui/animateIn";
import { ChatTitle, db } from "@/db";
import { deleteChat } from "@/db/chat";
import { useClearParam, useGetParam, useSetParam } from "@/hooks/useParamHelpers";
import { formatDate } from "@/utils/date";

export const MessagesList = () => {
  const chatList = useLiveQuery(async () => {
    const chatList = await db.chatTitle.toArray();
    const sortedChatList = chatList.sort((a, b) => b.time - a.time);
    return sortedChatList;
  });
  const idParam = useGetParam("id");
  const setParam = useSetParam();
  const clearParam = useClearParam();

  if (!chatList) return null;

  const handleChatSelection = (id: string) => setParam({ param: "id", value: id });

  const categorizedMessages: { [date: string]: z.infer<typeof ChatTitle>[] } = {};
  chatList.forEach((chat) => {
    const category = formatDate(chat.time);
    if (!categorizedMessages[category]) {
      categorizedMessages[category] = [];
    }
    categorizedMessages[category].push(chat);
  });

  return (
    <div className="text-white h-[calc(100svh-10rem)] overflow-x-hidden overflow-y-auto chatList-scrollbar pe-2 space-y-4">
      {Object.entries(categorizedMessages).map(([category, ChatTitle]) => (
        <div key={category} className="space-y-1">
          <h3 className="capitalize font-bold text-slate-300 text-xs ps-2">{category}</h3>
          <ul className="space-y-0.5">
            {ChatTitle.map((chat, idx) => (
              <AnimateIn
                key={chat.id}
                from="opacity-0 translate-y-4"
                to="opacity-100 translate-y-0"
                duration={(idx + 1) * 100}
              >
                <li
                  className={clsx("px-2 flex items-center space-x-2 rounded relative group", {
                    "hover:bg-gray-800": chat.id !== idParam,
                    "bg-gray-700": chat.id === idParam,
                  })}
                >
                  <button
                    title={chat.title}
                    className="w-full text-start text-sm py-2"
                    onClick={() => handleChatSelection(chat.id)}
                  >
                    {chat.title.length > 30 ? chat.title.slice(0, 30) + "..." : chat.title}
                  </button>
                  <button
                    className="absolute top-1/2 -translate-y-1/2 right-2 invisible group-hover:visible"
                    title="delete chat"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                      if (chat.id === idParam) clearParam("id");
                    }}
                  >
                    <HiFolderRemove className="text-lg" />
                  </button>
                </li>
              </AnimateIn>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
