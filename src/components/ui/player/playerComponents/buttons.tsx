import {
  FullscreenButton,
  MuteButton,
  PlayButton,
  SeekButton,
  Tooltip,
  type TooltipPlacement,
  useMediaState,
} from "@vidstack/react";
import React from "react";
import { BsArrowsFullscreen, BsFullscreen } from "react-icons/bs";
import { FaPause, FaPlay, FaVolumeDown, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { RiForward10Line, RiReplay10Line } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

export interface MediaButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  tooltipPlacement: TooltipPlacement;
}

export const buttonClass =
  "group ring-media-focus relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset transition-color duration-150 hover:text-royal-blue/60 data-[focus]:ring-4";

export const tooltipClass =
  "animate-out select-none fade-out slide-out-to-bottom-0 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-0 z-10 rounded-sm bg-dark-navy/90 px-2 py-0.5 text-sm font-medium text-white parent-data-[open]:hidden";

export function Play({ tooltipPlacement, className = "" }: MediaButtonProps) {
  const isPaused = useMediaState("paused");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PlayButton className={twMerge(buttonClass, className)}>
          {isPaused ? <FaPlay className="w-4 h-4 sm:w-6 sm:h-6" /> : <FaPause className="w-4 h-4 sm:w-6 sm:h-6" />}
        </PlayButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isPaused ? "Play" : "Pause"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Mute({ tooltipPlacement }: MediaButtonProps) {
  const volume = useMediaState("volume"),
    isMuted = useMediaState("muted");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <MuteButton className={buttonClass}>
          {isMuted || volume == 0 ? (
            <FaVolumeMute className="w-4 h-4 sm:w-6 sm:h-6" />
          ) : volume < 0.5 ? (
            <FaVolumeDown className="w-4 h-4 sm:w-6 sm:h-6" />
          ) : (
            <FaVolumeUp className="w-4 h-4 sm:w-6 sm:h-6" />
          )}
        </MuteButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isMuted ? "Unmute" : "Mute"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Fullscreen({ tooltipPlacement }: MediaButtonProps) {
  const isActive = useMediaState("fullscreen");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <FullscreenButton className={buttonClass}>
          {isActive ? (
            <BsArrowsFullscreen className="w-4 h-4 sm:w-6 sm:h-6" />
          ) : (
            <BsFullscreen className="w-4 h-4 sm:w-6 sm:h-6" />
          )}
        </FullscreenButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isActive ? "Exit Fullscreen" : "Enter Fullscreen"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Forward({ tooltipPlacement }: MediaButtonProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <SeekButton seconds={10} className={buttonClass}>
          <RiForward10Line className="w-4 h-4 sm:w-6 sm:h-6" />
        </SeekButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        Forward 10s
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
export function Rewind({ tooltipPlacement }: MediaButtonProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <SeekButton seconds={-10} className={buttonClass}>
          <RiReplay10Line className="w-4 h-4 sm:w-6 sm:h-6" />
        </SeekButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        Rewind 10s
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
