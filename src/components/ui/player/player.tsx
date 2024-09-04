import {
  MediaPlayer,
  type MediaPlayerInstance,
  MediaProvider,
  type MediaProviderAdapter,
  Poster,
  Track,
  isHLSProvider,
  isYouTubeProvider,
} from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

import { VideoLayout } from "./playerComponents/layouts/video-layout";

type PlayerProps = {
  src: string;
  title?: string;
  className?: string;
  poster?: {
    src: string;
    alt: string;
  };
  thumbnails?: string;
  textTracks?: {
    src: string;
    label: string;
    language: string;
    kind: "subtitles" | "chapters";
    default?: boolean;
  }[];
};

export function Player({ src, title, className, poster, thumbnails, textTracks }: PlayerProps) {
  const player = useRef<MediaPlayerInstance>(null);

  function onProviderChange(provider: MediaProviderAdapter | null) {
    if (isHLSProvider(provider)) {
      provider.library = "https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js";
    }
    if (isYouTubeProvider(provider)) {
      provider.cookies = true;
    }
  }

  return (
    <MediaPlayer
      className={twMerge(
        "w-full aspect-video bg-black text-white font-sans overflow-hidden ring-media-focus data-[focus]:ring-4 ",
        className
      )}
      title={title}
      src={src}
      storage={"video-player"}
      crossOrigin={true}
      onProviderChange={onProviderChange}
      ref={player}
    >
      <MediaProvider>
        <Poster
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
          src={poster?.src || ""}
          alt={poster?.alt || ""}
        />
        {textTracks && textTracks.map((track) => <Track {...track} key={track.src} />)}
      </MediaProvider>

      <VideoLayout thumbnails={thumbnails} />
    </MediaPlayer>
  );
}
