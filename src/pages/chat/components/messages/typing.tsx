import { useSelector } from "react-redux";

import coursanityAI from "@/assets/coursanityAI.webp";
import { LoadingDots } from "@/components/ui/loadingDots";
import { RootState } from "@/redux/store";

import { UserAvatar } from "../userAvatar";

export const Typing = () => {
  const { typing } = useSelector((state: RootState) => state.aiChat);

  if (!typing) return null;

  return (
    <li className="flex flex-col items-center gap-2 w-full px-4 lg:px-8">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-2 select-none">
          <UserAvatar image={coursanityAI} name={"Coursanity Assistant"} className="w-8 h-8" />
          <span className="text-lg font-bold">Cousanity Assistant</span>
        </div>
        <div className="xs:ps-8 w-fit mt-2">
          <LoadingDots className="w-4 h-4 bg-white" />
        </div>
      </div>
    </li>
  );
};
