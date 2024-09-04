import { format } from "date-fns";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "@/redux/store";

import { Button } from "./button";

type BookedSessionProps = {
  startTime: number;
  endTime: number;
  meetingWith: string;
  roomId: string;
};

export default function BookedSession({ startTime, endTime, meetingWith, roomId }: BookedSessionProps) {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth);
  function joinMeeting() {
    if (!user.authStatus) return;
    navigate(`/meeting/${roomId}`);
  }
  return (
    <div className="flex justify-between bg-zinc-100 px-3 py-3 rounded-lg items-baseline gap-4">
      <div className="flex gap-1 flex-col">
        <span className=" text-sm sm:text-base font-semibold">Meeting With {meetingWith}</span>
        <span className=" text-xs sm:text-sm text-zinc-500">
          {format(new Date().setHours(startTime), "hh:00 a")} - {format(new Date().setHours(endTime), "hh:00 a")}
        </span>
      </div>
      <Button variant="link" className="text-wrap flex items-center  text-royal-blue" onClick={joinMeeting}>
        Go to meeting
        <IoIosArrowForward className=" hidden md:block" />
      </Button>
    </div>
  );
}
