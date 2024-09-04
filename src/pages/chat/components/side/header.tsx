import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { Link } from "react-router-dom";

import { CoursanityLogo } from "@/components/icons/Logo";
import { useClearParam } from "@/hooks/useParamHelpers";

export const SideHeader = () => {
  const clearParam = useClearParam();

  const handleClearParam = () => clearParam("id");

  return (
    <header className="flex justify-between gap-4 px-2">
      <Link to="/" className="flex items-center gap-2" title="Coursanity">
        <CoursanityLogo className="w-8 h-8" />
        <span className="text-white text-xl font-bold -translate-y-0.5">Coursanity</span>
      </Link>
      <button
        type="button"
        title="new chat"
        className="p-2 rounded-full transition-colors duration-300 hover:bg-royal-blue"
        onClick={handleClearParam}
      >
        <HiChatBubbleBottomCenterText className="text-white text-xl" />
      </button>
    </header>
  );
};
