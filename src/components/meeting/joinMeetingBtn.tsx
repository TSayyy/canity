import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";

export function JoinMeetingBtn({ roomId }: { roomId: string }) {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth);
  function joinMeeting() {
    if (!user.authStatus) return;
    navigate(`/meeting/${roomId}`);
  }
  return <Button onClick={joinMeeting}>Join Meeting</Button>;
}
