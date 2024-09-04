import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

import { CoursanityLogo } from "@/components/icons/Logo";

import { MessageBox } from "./components/messageBox";
import { MessagesContainer } from "./components/messages";
import { NewChat } from "./components/newChat";
import { SideBar } from "./components/side";

export const ChatPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-dark-navy h-svh w-full flex overflow-hidden">
      <SideBar open={open} setOpen={setOpen} />
      <div className="flex-grow h-full overflow-hidden flex flex-col">
        <div className="w-full bg-white/20 flex sm:hidden justify-between px-4 py-2">
          <button type="button" title="menu" onClick={() => setOpen(true)}>
            <RxHamburgerMenu className="text-white text-2xl" />
          </button>
          <div>
            <Link to="/" className="flex items-center gap-2" title="Coursanity">
              <CoursanityLogo className="w-8 h-8" />
              <span className="text-white text-xl font-bold -translate-y-0.5">Coursanity</span>
            </Link>
          </div>
          <div></div>
        </div>
        <NewChat />
        <MessagesContainer />
        <MessageBox />
      </div>
    </div>
  );
};
