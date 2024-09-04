import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import { Tag } from "./Tag";

type KeywordsProps = {
  keywords: string[];
  className?: string;
  keyWordClassName?: string;
};

export function Keywords({
  keywords,
  className,
  keyWordClassName,
  ...rest
}: KeywordsProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...rest}>
      {keywords.map((keyword) => (
        <Tag
          title={keyword}
          key={keyword}
          className={cn(
            "bg-white capitalize border-royal-blue text-royal-blue border-[1px] font-[400]",
            keyWordClassName
          )}
        >
          {keyword}
        </Tag>
      ))}
    </div>
  );
}
