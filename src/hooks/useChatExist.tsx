import { useLiveQuery } from "dexie-react-hooks";

import { getChatByID } from "@/db/chat";

import { useGetParam } from "./useParamHelpers";

export const useChatExist = () => {
  const idParam = useGetParam("id");
  const chat = useLiveQuery(() => getChatByID(idParam), [idParam]);

  if (!chat || !idParam) return false;
  return chat;
};
