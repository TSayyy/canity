import React from "react";
import { twMerge } from "tailwind-merge";

interface TTagProps extends React.ComponentPropsWithoutRef<"span"> {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = "", ...props }: TTagProps) {
  return (
    <span
      {...props}
      className={twMerge(
        "inline-flex items-center font-[500] whitespace-nowrap justify-center gap-1 select-none rounded-lg text-black bg-[#E5E7ED] px-2 py-1",
        className
      )}
    >
      {children}
    </span>
  );
}
