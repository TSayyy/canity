import { BsChatDotsFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { changeAsideVariant, toggleAside } from "@/redux/slices/meetingSlice";
import { RootState } from "@/redux/store";

import { MeetingChat } from "./MeetingChat";
import { MeetingMembers } from "./MeetingMembers";

export function MeetingSidebar() {
  const { asideVariant, isAsideOpen } = useSelector((state: RootState) => state.meeting);
  const dispatcher = useDispatch();
  return (
    <aside
      className={`flex w-screen md:w-[450px] absolute z-30 md:relative md:z-0  h-dvh flex-col justify-evenly gap-2 bg-dark-navy overflow-hidden transition-[max-width]  ${isAsideOpen ? " max-w-full " : " max-w-0"}`}
    >
      <header className="relative">
        <h1 className=" bg-[#222c54] text-white p-3 text-xl text-center">
          Meeting {asideVariant === "CHAT" ? "Chat" : "Members"}
        </h1>
        <button
          className=" absolute top-2 text-white p-2 left-2 z-20 bg-transparent"
          onClick={() => dispatcher(toggleAside())}
        >
          <IoMdArrowRoundBack className="w-6 h-6" />
        </button>
      </header>
      {asideVariant === "CHAT" ? <MeetingChat /> : <MeetingMembers />}

      <footer className="bg-[#222c54] grid grid-cols-2 m-2 rounded-md p-1 overflow-hidden">
        <button
          className={`p-3 flex justify-center transition-colors rounded-md text-zinc-300 hover:text-zinc-400 ${!(asideVariant === "CHAT") && "bg-royal-blue/20"}`}
          onClick={() => dispatcher(changeAsideVariant("MEMBERS"))}
        >
          <FaUsers className="w-6 h-6 " />
        </button>
        <button
          className={`p-3 flex justify-center transition-colors rounded-md text-zinc-300 hover:text-zinc-400 ${asideVariant === "CHAT" && "bg-royal-blue/20"}`}
          onClick={() => dispatcher(changeAsideVariant("CHAT"))}
        >
          <BsChatDotsFill className="w-6 h-6 " />
        </button>
      </footer>
    </aside>
  );
}
