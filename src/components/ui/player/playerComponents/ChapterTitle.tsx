import { ChapterTitle as Title, useChapterTitle } from "@vidstack/react";

export default function ChapterTitle() {
  const isChaptersExists = useChapterTitle();
  if (!isChaptersExists) return null;
  return (
    <span className="inline-block flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-2 text-sm font-medium text-white/70">
      <span className="mr-1">|</span>
      <Title />
    </span>
  );
}
