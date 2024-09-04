import React, { useEffect, useRef } from "react";

interface VideoStreamPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  stream: MediaStream | undefined;
}
export function VideoStreamPlayer({ stream, ...props }: VideoStreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream || null;
    }
  }, [stream]);
  return <video ref={videoRef} {...props}></video>;
}
