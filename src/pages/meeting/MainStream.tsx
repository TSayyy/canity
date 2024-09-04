import { useEffect } from "react";
import { TiVideo } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

import { MeetingMember } from "@/components/meeting/MeetingMember";
import { VideoStreamPlayer } from "@/components/meeting/VideoStreamPlayer";
import { useRoom } from "@/contexts/RoomContext";
import { changeMainStream } from "@/redux/slices/meetingSlice";
import { RootState } from "@/redux/store";
import { socket } from "@/socket";

export default function MainStream() {
  const { peers, shareScreenPeers } = useRoom();
  const myId = useSelector((state: RootState) => state.auth?.id);
  const mainStream = useSelector((state: RootState) => state.meeting.mainStream);
  const dispatch = useDispatch();
  const currentMainStream = mainStream?.isSharingScreen
    ? Object.values(shareScreenPeers).find((peer) => peer.userId === mainStream?.userId)?.stream
    : Object.values(peers).find((peer) => peer.userId === mainStream?.userId)?.stream;
  const currentMainStreamUser = mainStream?.userId ? peers[mainStream?.userId]?.userName : "no one";

  useEffect(() => {
    socket.on("camera-status-changed", ({ userId, isCameraEnabled }) => {
      if (userId !== mainStream?.userId || isCameraEnabled) return;
      dispatch(changeMainStream(null));
    });
  }, [mainStream?.userId, dispatch]);

  if (!currentMainStream)
    return (
      <div className="grid grid-cols-2 grid-rows-2 place-content-start gap-3 md:flex md:justify-center md:flex-wrap h-[calc(100dvh-45px)] md:h-full scrollbar bg-dark-navy/50 overflow-y-auto  md:p-20  ">
        <MeetingMember className="md:w-1/4 md:max-w-[50%] h-full md:h-auto" memberId={"you"} />
        {Object.keys(peers).map((userId) => {
          if (myId === userId) return null;
          return (
            <MeetingMember
              key={userId}
              className="md:w-1/4 md:max-w-[50%] h-full md:h-auto"
              memberId={peers[userId].userId}
            />
          );
        })}
        {Object.keys(shareScreenPeers).map((userId) => {
          return (
            <MeetingMember
              key={userId}
              isSharingScreen={true}
              className="md:w-1/4 md:max-w-[50%] h-full md:h-auto"
              memberId={shareScreenPeers[userId].userId === myId ? "you" : shareScreenPeers[userId].userId}
            />
          );
        })}
      </div>
    );

  return (
    <main className="relative aspect-video z-10 inset-0  h-full w-full">
      <h1 className=" absolute top-3 left-5 right-5 flex   justify-start gap-2 items-center text-white z-20 bg-dark-navy/70 p-3  rounded-lg">
        <TiVideo className="inline-block mr-2 w-6 h-6 text-royal-blue" />
        <span>Meeting with {currentMainStreamUser}</span>
      </h1>
      <VideoStreamPlayer className="h-full w-full " stream={currentMainStream} muted autoPlay playsInline />
    </main>
  );
}
