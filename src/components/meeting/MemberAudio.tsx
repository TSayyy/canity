import { useEffect, useRef } from "react";

export function MemberAudio({ stream, isMuted }: { stream: MediaStream | null; isMuted: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.srcObject = stream;
    }
  }, [stream]);
  return <audio className=" absolute opacity-0 -z-10" ref={audioRef} muted={isMuted} autoPlay playsInline></audio>;
}
