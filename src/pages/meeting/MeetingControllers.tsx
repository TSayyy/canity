import { BiSolidVideoOff } from "react-icons/bi";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import { HiMiniRectangleStack, HiSpeakerWave } from "react-icons/hi2";
import { ImPhoneHangUp } from "react-icons/im";
import { RiMicOffFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import { useRoom } from "@/contexts/RoomContext";
import { removeMainStream, toggleAside, toggleMute } from "@/redux/slices/meetingSlice";
import { RootState } from "@/redux/store";

const BUTTON_CLASS = "p-3 flex justify-center transition-colors rounded-full text-zinc-300 hover:text-zinc-400";

export function MeetingControllers() {
  const { shareScreen, screenStream, toggleCamera, toggleMic, endCall, isCameraEnabled, isMicEnabled } = useRoom();
  const { isAsideOpen, isMuted, mainStream } = useSelector((state: RootState) => state.meeting);
  const dispatcher = useDispatch();

  return (
    <div className=" absolute bottom-0 pb-5 bg-gradient-to-t from-black/40 via-black/20 to-transparent flex z-20 gap-4 justify-center w-full items-center px-20">
      {mainStream && (
        <button
          className={`${BUTTON_CLASS} bg-dark-navy hidden md:block`}
          onClick={() => dispatcher(removeMainStream())}
        >
          <HiMiniRectangleStack className="w-6 h-6  " />
        </button>
      )}
      <div className="flex-1"></div>
      <button className={`${BUTTON_CLASS} ${screenStream ? " bg-red-700" : "bg-dark-navy"}`} onClick={shareScreen}>
        <BsArrowUpSquareFill className="w-6 h-6  " />
      </button>
      <button className={`${BUTTON_CLASS} ${!isMicEnabled ? "bg-red-700" : "bg-dark-navy"}`} onClick={toggleMic}>
        <RiMicOffFill className="w-6 h-6  " />
      </button>
      <button
        className="p-3 flex justify-center bg-red-500 transition-colors rounded-full hover:bg-red-600"
        onClick={endCall}
      >
        <ImPhoneHangUp className="w-10 h-10 text-white" />
      </button>
      <button className={`${BUTTON_CLASS} ${!isCameraEnabled ? "bg-red-700" : "bg-dark-navy"}`} onClick={toggleCamera}>
        <BiSolidVideoOff className="w-6 h-6  " />
      </button>
      <button
        className={`${BUTTON_CLASS} ${isMuted ? "bg-red-700" : "bg-dark-navy"}`}
        onClick={() => dispatcher(toggleMute())}
      >
        <HiSpeakerWave className="w-6 h-6  " />
      </button>
      <div className="flex-1"></div>
      <button className={`${BUTTON_CLASS} bg-dark-navy hidden md:block`} onClick={() => dispatcher(toggleAside())}>
        {!isAsideOpen ? <FaExpandArrowsAlt className="w-6 h-6  " /> : <FaCompressArrowsAlt className="w-6 h-6  " />}
      </button>
    </div>
  );
}
