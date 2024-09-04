import { RiMicOffFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

import { useRoom } from "@/contexts/RoomContext";
import { changeMainStream } from "@/redux/slices/meetingSlice";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VideoStreamPlayer } from "./VideoStreamPlayer";

export function MeetingMember({
  memberId,
  isSharingScreen = false,
  className = "",
}: {
  className?: string;
  memberId: string;
  isSharingScreen?: boolean;
}) {
  const dispatcher = useDispatch();
  const isMe = memberId === "you";
  const {
    isMicEnabled: isMyMicEnabled,
    isCameraEnabled: isMyCameraEnabled,
    peers,
    shareScreenPeers,
    myStream,
    screenStream,
  } = useRoom();

  const { isMicEnabled: isUserMicEnable, isCameraEnabled: isUserCameraEnable } = peers[memberId] || {};
  const { stream } = (!isSharingScreen ? peers[memberId] : shareScreenPeers[memberId]) || {};

  // if the user is sharing screen then the camera is enabled
  // if the user is me then the camera state is the state of my camera
  const isCameraEnable = isSharingScreen ? true : isMe ? isMyCameraEnabled : isUserCameraEnable;
  const isMicEnable = isMe ? isMyMicEnabled : isUserMicEnable;
  const currentStream = isMe ? (isSharingScreen ? screenStream : myStream) : stream;

  function handleMemberClick() {
    if (isMe || !isCameraEnable || !stream?.getVideoTracks()[0]?.enabled) return;
    dispatcher(changeMainStream({ userId: memberId, isSharingScreen }));
  }

  if (!memberId) return null;

  return (
    <div
      className={twMerge(
        " relative flex  grow gap-3 overflow-hidden bg-[#222C54] text-white rounded-md w-full cursor-pointer",
        className
      )}
      onClick={handleMemberClick}
    >
      {isCameraEnable || isSharingScreen ? (
        <VideoStreamPlayer
          className=" w-full h-full object-cover md:object-contain sm:aspect-video "
          stream={currentStream}
          autoPlay
          muted
          playsInline
        />
      ) : (
        <BigUserAvatar memberId={memberId} />
      )}
      <p className=" flex gap-2 items-center text-zinc-200 absolute bottom-2 left-2 shadow-2xl shadow-dark-navy p-1 rounded-lg ">
        <span>{memberId}</span>
        {!isMicEnable && <RiMicOffFill size={14} />}
      </p>
    </div>
  );
}

function BigUserAvatar({ memberId }: { memberId: string }) {
  return (
    <div className=" p-10 flex flex-col max-h-96 justify-center w-full aspect-video items-center gap-3 grow overflow-hidden bg-[#222C54] text-white rounded-md">
      <Avatar className="w-24 h-24">
        <AvatarImage src={"https://avatars.githubusercontent.com/u/47269252?v=4"} title={memberId} alt={memberId} />
        <AvatarFallback className=" bg-royal-blue text-lg">{memberId?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    </div>
  );
}
