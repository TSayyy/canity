import { useSelector } from "react-redux";

import { MeetingMember } from "@/components/meeting/MeetingMember";
import { useRoom } from "@/contexts/RoomContext";
import { RootState } from "@/redux/store";

export function MeetingMembers() {
  const { peers, shareScreenPeers } = useRoom();
  const myId = useSelector((state: RootState) => state.auth?.id);
  return (
    <div className=" grid gap-3 grow m-2 mb-0 max-h-[calc(100dvh-108px)] overflow-y-auto overflow-x-hidden scrollbar">
      <MeetingMember memberId={"you"} className=" min-h-48" />
      {Object.keys(peers).map((userId) => {
        if (myId === userId) return null;
        return <MeetingMember key={userId} className=" min-h-48" memberId={peers[userId].userId} />;
      })}
      {Object.keys(shareScreenPeers).map((userId) => {
        return (
          <MeetingMember
            className=" min-h-48"
            key={userId}
            isSharingScreen={true}
            memberId={shareScreenPeers[userId].userId === myId ? "you" : shareScreenPeers[userId].userId}
          />
        );
      })}
    </div>
  );
}
