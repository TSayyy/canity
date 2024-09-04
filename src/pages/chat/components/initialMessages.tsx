import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

import AnimateIn from "@/components/ui/animateIn";
import { deleteChat, initializeChat, sendMessage } from "@/db/chat";
import { useClearParam, useGetParam, useSetParam } from "@/hooks/useParamHelpers";
import { startChat } from "@/lib/aiChat";
import { setAssistantTyping } from "@/redux/slices/aiChatSlice";

type TInitialMessages = {
  title: string;
  description: string;
  message: string;
  duration?: number;
};

export const InitialMessages = ({ title, description, message, duration }: TInitialMessages) => {
  const dispatch = useDispatch();
  const id = useGetParam("id");
  const setParam = useSetParam();
  const clearID = useClearParam();
  const chat = startChat([]);

  const handleClick = async () => {
    if (id) return;
    const chatID = await initializeChat(uuid(), title, message);
    if (chatID) {
      setParam({ param: "id", value: chatID });
      try {
        dispatch(setAssistantTyping(true));
        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();
        await sendMessage(chatID, "model", text);
        dispatch(setAssistantTyping(false));
      } catch (error) {
        toast.error("Sorry, Something went wrong. Please try later.");
        dispatch(setAssistantTyping(false));
        clearID("id");
        deleteChat(chatID);
      }
    }
  };

  return (
    <AnimateIn from="opacity-0 translate-y-8" to="opacity-100 translate-y-0" duration={duration}>
      <button
        type="button"
        className="select-none text-start flex flex-col border border-royal-blue/40 transition-colors duration-100 ease-cubic hover:bg-white/5 text-white rounded-xl py-2 px-4 w-full h-full"
        onClick={handleClick}
      >
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-sm text-gray-400 max-w-xs text-balance">
          {description.length > 100 ? description.slice(0, 100) + "..." : description}
        </span>
      </button>
    </AnimateIn>
  );
};
