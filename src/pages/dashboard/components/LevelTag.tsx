import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

type LevelTagProps = {
  level: "intermediate" | "beginner" | "hard" | "advanced";
  className?: string;
};
const levelMap = {
  intermediate: {
    className: "bg-mint-green/20 text-mint-green border-mint-green border-2",
    text: "Intermediate",
  },
  beginner: {
    className: "bg-dark-navy/20 text-dark-navy border-dark-navy border-2",
    text: "Beginner",
  },
  hard: {
    className: "bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000] border-2",
    text: "Hard",
  },
  advanced: {
    className: "bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000] border-2",
    text: "Advanced",
  },
};
export function LevelTag({ level, className = "" }: LevelTagProps) {
  return <Tag className={cn(levelMap[level]?.className, className)}>{levelMap[level]?.text}</Tag>;
}
