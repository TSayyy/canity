import { useSearchParams } from "react-router-dom";

import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

type CourseContentsProps = {
  courseChapters: {
    id?: string;
    chapterName: string;
    chapterLink: string;
  }[];
  progress: number;
};

export function CourseContents({ courseChapters, progress }: CourseContentsProps) {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentVideo = searchParam.get("chapter") || courseChapters[0]?.id?.toString();
  const handleVideoClick = (id: string) => {
    searchParam.set("chapter", id);
    setSearchParam(searchParam);
  };

  return (
    <div className="shadow-custom grow rounded-xl overflow-hidden">
      <header className="px-5 py-8 rounded-xl shadow-custom">
        <div className="w-full flex flex-col gap-2">
          <h2 className="ml-1 text-xl font-semibold">{Math.ceil((1 - progress) * 100)}% to complete</h2>
          <Progress className="h-2 rounded-full bg-zinc-300" value={progress * 100} />
        </div>
      </header>
      <main className="py-5 text-dark-navy">
        <ScrollArea type="always" className="h-64 xl:h-[350px] 2xl:h-[465px] 3xl:h-[668px]">
          <div className="flex flex-col gap-4 p-3">
            {courseChapters.map((chapter, index) => (
              <button
                key={chapter?.id}
                className={`flex justify-between transition-colors duration-150 w-full text-xl items-center gap-4 px-1 ${currentVideo === chapter?.id?.toString() ? " text-royal-blue" : " hover:text-royal-blue/70"} `}
                onClick={() => handleVideoClick(chapter?.id || "")}
              >
                <span className="flex gap-4">
                  <span
                    className={` text-sm flex justify-center items-center border-2 rounded-full w-7 h-7 aspect-square border-dark-navy font-semibold ${currentVideo === chapter.id ? " text-royal-blue" : " hover:text-royal-blue/70"}`}
                  >
                    {index + 1}
                  </span>
                  {chapter.chapterName}
                </span>
                {/* <span className="text-zinc-400">{chapter.duration}</span> */}
              </button>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
