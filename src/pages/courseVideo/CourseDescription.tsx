import { AiFillSignal } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { HiMiniRectangleStack, HiStar } from "react-icons/hi2";
import { IoCalendarNumber } from "react-icons/io5";
import { MdWatchLater } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { z } from "zod";

import { Tag } from "@/components/ui/Tag";
import { courseSchema } from "@/schemas/courseSchema";

type CourseDescriptionProps = {
  course: z.infer<typeof courseSchema>;
};

export function CourseDescription({ course }: CourseDescriptionProps) {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex gap-2 sm:gap-4 flex-wrap ">
        <Tag className="select-none ">
          <HiStar className="text-yellow-500" size={18} />
          {course?.rating.toFixed(1)}
        </Tag>
        <Tag className=" select-none flex gap-1 rounded-xl px-3 ">
          <TbTargetArrow className="text-royal-blue" /> {course?.track?.title}
        </Tag>
        <Tag className=" select-none flex gap-1 rounded-xl px-3 ">
          <IoCalendarNumber className="text-royal-blue" /> {new Date(course?.publishTime).toLocaleDateString()}
        </Tag>
        <Tag className=" select-none flex gap-1 rounded-xl px-3 ">
          <MdWatchLater className="text-royal-blue" /> {course?.estimatedTime} hrs
        </Tag>
        <Tag className=" select-none flex gap-1 rounded-xl px-3 ">
          <HiMiniRectangleStack className="text-royal-blue" /> {course?.noChapters} chapters
        </Tag>
        <Tag className=" select-none flex gap-1 rounded-xl px-3 ">
          <AiFillSignal className="text-royal-blue" /> {course?.cLevel}
        </Tag>
        <Tag className=" select-none flex gap-1 rounded-xl px-3 ">
          <FaUser className="text-royal-blue" /> {course?.noStudentsEnrolled}+ learners
        </Tag>
      </header>
      <main className="grid gap-2">
        <h3 className="text-xl font-medium">Description :</h3>
        <p className=" font-normal text-balance">{course?.description}</p>
      </main>
      <footer className="flex flex-wrap gap-2 sm:gap-4">
        {course?.keywords.map((topic, index) => (
          <Tag
            title={topic}
            key={index}
            className="bg-white capitalize border-royal-blue text-royal-blue border-[1px] font-[400]"
          >
            {topic}
          </Tag>
        ))}
      </footer>
    </section>
  );
}
