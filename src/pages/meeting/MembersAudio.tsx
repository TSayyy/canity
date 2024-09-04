import { useSelector } from "react-redux";

import { MemberAudio } from "@/components/meeting/MemberAudio";
import { useRoom } from "@/contexts/RoomContext";
import { RootState } from "@/redux/store";

export default function MembersAudio() {
  const { peers } = useRoom();
  const myId = useSelector((state: RootState) => state.auth?.id);
  const isMuted = useSelector((state: RootState) => state.meeting.isMuted);

  return (
    <div className="opacity-0 w-0 h-0">
      {Object.keys(peers).map((userId) => {
        if (userId !== myId)
          return <MemberAudio key={userId} isMuted={isMuted} stream={peers[userId].stream || null} />;
      })}
    </div>
  );
}
