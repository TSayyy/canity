import { ScrollArea } from "@/components/ui/scroll-area";

type CourseContentProps = {
  courseChapters: {
    id?: string;
    chapterName: string;
    chapterLink: string;
  }[];
};

export function CourseContent({ courseChapters }: CourseContentProps) {
  return (
    <ScrollArea type="always" className="  shadow-custom rounded-lg p-3 h-96">
      <div className="divide-y-2">
        {courseChapters.length === 0 && (
          <div className="text-center font-medium  text-lg py-10">No Chapters Available</div>
        )}
        {courseChapters.map((chapter, index) => (
          <button key={chapter.id} className={`flex py-4 transition-colors duration-150 w-full text-xl items-center  `}>
            <span className="flex items-center gap-4 text-sm">
              <span
                className={` text-sm flex justify-center items-center border-2 rounded-full w-7 h-7 aspect-square border-dark-navy font-semibold `}
              >
                {index + 1}
              </span>
              <span className=" text-start">
                <span className="font-semibold">Chapter {index + 1} : </span>
                {chapter.chapterName}
              </span>
            </span>
            <span className="flex-1"></span>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
