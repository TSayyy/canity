import clsx from "clsx";
import { useEffect, useRef } from "react";

import { SideHeader } from "./header";
import { MessagesList } from "./messagesList";

export type TSideBar = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const SideBar = ({ open, setOpen }: TSideBar) => {
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // if user clicks outside the sidebar, close it
    const handleClick = (e: MouseEvent) => {
      if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [setOpen]);

  return (
    <aside
      ref={asideRef}
      className={clsx(
        "fixed z-50 sm:static h-svh overflow-y-hidden min-w-64 bg-[#0c1028] ps-2 py-4 space-y-6 transition-all duration-300 sm:duration-0 ease-cubic",
        {
          "left-0 top-0": open,
          "-left-64 top-0": !open,
        }
      )}
    >
      <SideHeader />
      <MessagesList />
    </aside>
  );
};
