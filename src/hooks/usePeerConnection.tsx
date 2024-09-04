import Peer from "peerjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";

import { RootState } from "@/redux/store";
import { socket } from "@/socket";

export function usePeerConnection() {
  const myId = useSelector((state: RootState) => state.auth.id);
  const { id: roomId } = useParams();
  const [myPeer, setMyPeer] = useState<Peer>();
  const [myStream, setMyStream] = useState<MediaStream>();
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  useEffect(() => {
    // create a new peer connection to make calls and answer calls

    // generate a random user id to setup peer
    /* when I tried to get the user's id from localStorage or from a state in the user slice the peer connection broke so I generated the userId here and it seemed to be working*/
    const peerId = v4();
    const peer = new Peer(peerId);
    // store the user id and peer connection
    setMyPeer(peer);
  }, []);

  useEffect(() => {
    // get user media(camera and mic)
    try {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        stream.getVideoTracks()[0].enabled = false;
        stream.getAudioTracks()[0].enabled = false;

        setMyStream(stream);
      });
    } catch (err) {
      console.error(err);
    }
    //
  }, []);

  function toggleCamera() {
    if (!myStream) return;
    const videoTrack = myStream.getVideoTracks()[0];
    if (videoTrack) {
      setIsCameraEnabled(!isCameraEnabled);
      videoTrack.enabled = !isCameraEnabled;
      if (!myId || !roomId) return;
      socket.emit("camera-status", { userId: myId, isCameraEnabled: !isCameraEnabled, roomId });
    }
  }

  function toggleMic() {
    if (!myStream) return;
    const audioTrack = myStream.getTracks().find((track) => track.kind === "audio");
    if (audioTrack) {
      audioTrack.enabled = !isMicEnabled;
      setIsMicEnabled(!isMicEnabled);
      if (!myId || !roomId) return;
      socket.emit("mic-status", { userId: myId, isMicEnabled: !isMicEnabled, roomId });
    }
  }
  return { myPeer, myStream, toggleCamera, toggleMic, isCameraEnabled, isMicEnabled };
}
