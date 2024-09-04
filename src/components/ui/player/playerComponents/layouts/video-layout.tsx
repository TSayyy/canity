import { Captions, Controls, Gesture, Title, useMediaStore } from "@vidstack/react";

import { BufferingIndicator } from "../BufferIndicator";
import ChapterTitle from "../ChapterTitle";
import * as Buttons from "../buttons";
import * as Menus from "../menus";
import * as Sliders from "../sliders";
import { TimeGroup } from "../time-group";
import captionStyles from "./captions.module.css";
import styles from "./video-layout.module.css";

export interface VideoLayoutProps {
  thumbnails?: string;
}

export function VideoLayout({ thumbnails }: VideoLayoutProps) {
  const { waiting: isLoading, started: isStarted, canSetQuality } = useMediaStore();

  if (!isStarted) {
    return (
      <Controls.Root className="absolute inset-0 z-10">
        <Controls.Group className="flex w-full items-center justify-center h-full">
          <Buttons.Play className=" scale-[3]" tooltipPlacement="top" />
        </Controls.Group>
      </Controls.Root>
    );
  }
  return (
    <>
      <Gestures />
      <Captions
        className={`${captionStyles.captions} media-preview:opacity-0 media-controls:bottom-[85px] media-captions:opacity-100 absolute inset-0 bottom-2 z-10 select-none break-words opacity-0 transition-[opacity,bottom] duration-300`}
      />
      {isLoading && <BufferingIndicator />}

      <Controls.Root
        className={`${styles.controls} media-controls:opacity-100 absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity`}
      >
        <Controls.Group className="flex w-full items-center px-2 pt-2 bg-gradient-to-b from-black/60  to-transparent ">
          <Title />
        </Controls.Group>
        <div className="flex-1" />
        <Controls.Group className="flex w-full items-center px-2 pt-2"></Controls.Group>
        <div className="flex-1" />
        <Controls.Group className="flex w-full items-center px-2">
          <Sliders.Time thumbnails={thumbnails} />
        </Controls.Group>
        <Controls.Group className="-mt-2 flex w-full items-center px-2 pb-2">
          <Buttons.Play tooltipPlacement="top start" />
          <Buttons.Mute tooltipPlacement="top" />
          <Sliders.Volume />
          <TimeGroup />
          <ChapterTitle />
          <div className="flex-1" />
          <Buttons.Rewind tooltipPlacement="top" />
          <Buttons.Forward tooltipPlacement="top" />
          <Menus.PlaybackRate placement="top end" tooltipPlacement="top" />
          {canSetQuality && <Menus.Quality placement="top end" tooltipPlacement="top" />}
          <Buttons.Fullscreen tooltipPlacement="top end" />
        </Controls.Group>
      </Controls.Root>
    </>
  );
}

function Gestures() {
  return (
    <>
      <Gesture className="absolute inset-0 z-0 block h-full w-full" event="pointerup" action="toggle:paused" />
      <Gesture className="absolute inset-0 z-0 block h-full w-full" event="dblpointerup" action="toggle:fullscreen" />
      <Gesture className="absolute left-0 top-0 z-10 block h-full w-1/5" event="dblpointerup" action="seek:-10" />
      <Gesture className="absolute right-0 top-0 z-10 block h-full w-1/5" event="dblpointerup" action="seek:10" />
    </>
  );
}
