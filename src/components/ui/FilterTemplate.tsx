import React from "react";

type FilterTemplateProps = {
  header: string;
  children: React.ReactNode;
};

export function FilterTemplate({ header, children }: FilterTemplateProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-semibold">{header}</h2>
      <hr className="border-[1px] border-gray-300 rounded-lg" />
      <div className="mt-2">{children}</div>
    </div>
  );
}
