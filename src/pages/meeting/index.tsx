import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useRoom } from "@/contexts/RoomContext";
import { RootState } from "@/redux/store";
import { socket } from "@/socket";

import MainStream from "./MainStream";
import { MeetingControllers } from "./MeetingControllers";
import { MeetingSidebar } from "./MeetingSidebar";
import MeetingSmallScreensHeader from "./MeetingSmallScreensHeader";
import MembersAudio from "./MembersAudio";

export function Meeting() {
  const { id: roomId } = useParams();
  const { myStream, myPeer, isCameraEnabled, isMicEnabled } = useRoom();
  const userName = useSelector((state: RootState) => state.auth?.name);
  const userId = useSelector((state: RootState) => state.auth?.id);

  useEffect(() => {
    if (!(myPeer.id && myStream && roomId && userName)) return;
    socket.emit("join-room", { roomId, peerId: myPeer.id, userName, userId, isCameraEnabled, isMicEnabled });

    return () => {
      socket.off("join-room");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myPeer, myStream, roomId, userName, userId]);

  return (
    <section className="flex bg-black/85">
      <MembersAudio />
      <main className="relative w-full h-dvh overflow-hidden">
        <MeetingSmallScreensHeader />
        <MainStream />
        <MeetingControllers />
      </main>
      <MeetingSidebar />
    </section>
  );
}
