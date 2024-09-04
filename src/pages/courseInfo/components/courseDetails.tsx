import { AiFillSignal } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { HiMiniRectangleStack, HiStar } from "react-icons/hi2";
import { IoCalendarNumber } from "react-icons/io5";
import { MdWatchLater } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";

import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

type courseDetailsProps = {
  rating: number;
  track: {
    id: string;
    title: string;
  };
  publishTime: string;
  estimatedTime: number;
  noChapters: number;
  cLevel: string;
  noStudentsEnrolled: number;
  className?: string;
  itemClassName?: string;
};
export function CourseDetails({
  rating,
  track,
  publishTime,
  estimatedTime,
  noChapters,
  cLevel,
  noStudentsEnrolled,
  className,
  itemClassName,
}: courseDetailsProps) {
  return (
    <div className={cn("container flex gap-2 flex-wrap ", className)}>
      <Tag className={cn("select-none bg-[#374573] text-white ", itemClassName)}>
        <HiStar className="text-yellow-500" size={18} />
        {rating.toFixed(1)}
      </Tag>
      <Tag className={cn(" select-none flex gap-1 rounded-xl px-3 bg-[#374573] text-white", itemClassName)}>
        <TbTargetArrow className="text-royal-blue" /> {track.title}
      </Tag>
      <Tag className={cn(" select-none flex gap-1 rounded-xl px-3 bg-[#374573] text-white", itemClassName)}>
        <IoCalendarNumber className="text-royal-blue" /> {new Date(publishTime).toLocaleDateString()}
      </Tag>
      <Tag className={cn(" select-none flex gap-1 rounded-xl px-3 bg-[#374573] text-white", itemClassName)}>
        <MdWatchLater className="text-royal-blue" /> {estimatedTime} hrs
      </Tag>
      <Tag className={cn(" select-none flex gap-1 rounded-xl px-3 bg-[#374573] text-white", itemClassName)}>
        <HiMiniRectangleStack className="text-royal-blue" /> {noChapters} chapters
      </Tag>
      <Tag className={cn(" select-none flex gap-1 rounded-xl px-3 bg-[#374573] text-white", itemClassName)}>
        <AiFillSignal className="text-royal-blue" /> {cLevel}
      </Tag>
      <Tag className={cn(" select-none flex gap-1 rounded-xl px-3 bg-[#374573] text-white", itemClassName)}>
        <FaUser className="text-royal-blue" /> {noStudentsEnrolled}+ learners
      </Tag>
    </div>
  );
}
