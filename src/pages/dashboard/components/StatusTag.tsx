import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

type StatusTagProps = {
  status: "rejected" | "pending" | "accepted";
  className?: string;
};
const StatusMap = {
  rejected: {
    className: "bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000] border-2",

    text: "rejected",
  },
  pending: {
    className: "bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900] border-2",
    text: "Pending",
  },
  accepted: {
    className: "bg-mint-green/20 text-mint-green border-mint-green border-2",
    text: "Accepted",
  },
};
export function StatusTag({ status, className = "" }: StatusTagProps) {
  return <Tag className={cn(StatusMap[status].className, className)}>{StatusMap[status].text}</Tag>;
}
