import { BsChatDotsFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { HiMiniRectangleStack } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

import { useRoom } from "@/contexts/RoomContext";
import { removeMainStream, toggleAside } from "@/redux/slices/meetingSlice";
import { RootState } from "@/redux/store";

export default function MeetingSmallScreensHeader() {
  const { peers } = useRoom();
  const dispatcher = useDispatch();
  const mainStream = useSelector((state: RootState) => state.meeting.mainStream);

  return (
    <header className=" p-2 px-3 rounded-b-md md:hidden bg-dark-navy flex justify-between">
      <div className="flex gap-5 justify-center items-center">
        <button className={`flex justify-center text-zinc-300 `} onClick={() => dispatcher(toggleAside())}>
          <BsChatDotsFill className="w-6 h-6 " />
        </button>
        {mainStream && (
          <button className={` flex justify-center text-zinc-300 `} onClick={() => dispatcher(removeMainStream())}>
            <HiMiniRectangleStack className="w-6 h-6 " />
          </button>
        )}
      </div>
      <div className=" text-zinc-300 flex justify-center items-center font-semibold gap-1 text-lg ">
        <FaUser className="w-5 h-5 text-zinc-300" />
        {Object.keys(peers).length}
      </div>
    </header>
  );
}
