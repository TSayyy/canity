import React from "react";

import { cn } from "@/lib/utils";

type OrderFieldProps = {
  header: string;
  children: React.ReactNode;
  className?: string;
};
export function OrderField({ header, children, className = "" }: OrderFieldProps) {
  return (
    <div className={cn("bg-[#E8E8EC] rounded-sm p-2", className)}>
      <header className="font-semibold mb-2">{header}</header>
      {children}
    </div>
  );
}
