import {
  Menu,
  type MenuPlacement,
  Tooltip,
  type TooltipPlacement,
  useMediaState,
  usePlaybackRateOptions,
  useVideoQualityOptions,
} from "@vidstack/react";
import { IoCheckmark } from "react-icons/io5";
import { TbAdjustmentsFilled } from "react-icons/tb";

import { tooltipClass } from "./buttons";

export interface MenuButtonProps {
  placement: MenuPlacement;
  tooltipPlacement: TooltipPlacement;
}

export const menuClass =
  "animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-32 sm:h-56 lg:h-fit max-h-[400px] min-w-[260px] flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-dark-navy/95 p-2.5 font-sans text-sm font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden  hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[3px] data-[open]:inline-block";

export function PlaybackRate({ placement, tooltipPlacement }: MenuButtonProps) {
  const playbackRate = useMediaState("playbackRate");
  return (
    <Menu.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Menu.Button>
            <span className="text-dark-navy px-1 sm:px-2 sm:py-1 mx-2 rounded-md transition-colors hover:bg-royal-blue/80 hover:text-white text-xs font-medium bg-white">
              {playbackRate}x
            </span>
          </Menu.Button>
        </Tooltip.Trigger>
        <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
          Playback Rate
        </Tooltip.Content>
      </Tooltip.Root>
      <Menu.Content className={menuClass} placement={placement}>
        <PlaybackRateSubMenu />
      </Menu.Content>
    </Menu.Root>
  );
}

function PlaybackRateSubMenu() {
  const options = usePlaybackRateOptions();
  return (
    <Menu.RadioGroup className="w-full flex flex-col" value={options.selectedValue}>
      {options.map(({ label, value, select }) => (
        <Radio value={value} onSelect={select} key={value}>
          {label}
        </Radio>
      ))}
    </Menu.RadioGroup>
  );
}

export function Quality({ placement, tooltipPlacement }: MenuButtonProps) {
  return (
    <Menu.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Menu.Button>
            <TbAdjustmentsFilled className=" w-4 sm:w-6 h-4 sm:h-6 rotate-90 aspect-square hover:text-royal-blue" />
          </Menu.Button>
        </Tooltip.Trigger>
        <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
          Quality
        </Tooltip.Content>
      </Tooltip.Root>
      <Menu.Content className={menuClass} placement={placement}>
        <QualitySubMenu />
      </Menu.Content>
    </Menu.Root>
  );
}

function QualitySubMenu() {
  const options = useVideoQualityOptions({ auto: true, sort: "descending" });
  return (
    <Menu.RadioGroup className="w-full flex flex-col" value={options.selectedValue}>
      {options.map(({ label, value, select }) => (
        <Radio value={value} onSelect={select} key={value}>
          {label}
        </Radio>
      ))}
    </Menu.RadioGroup>
  );
}

export interface RadioProps extends Menu.RadioProps {}

function Radio({ children, ...props }: RadioProps) {
  return (
    <Menu.Radio
      className="ring-media-focus group relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2 outline-none data-[hocus]:bg-white/10 data-[focus]:ring-[3px]"
      {...props}
    >
      <span
        className={`w-4 h-4 transition-colors duration-30 border-2 grid place-content-center text-white rounded-full group-data-[checked]:bg-royal-blue group-data-[checked]:border-royal-blue`}
      >
        <IoCheckmark size={12} className=" stroke-2 hidden group-data-[checked]:block" />
      </span>
      <span className="ml-2">{children}</span>
    </Menu.Radio>
  );
}
