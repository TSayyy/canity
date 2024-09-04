import { Skeleton } from "@/components/ui/skeleton";

export default function AccordionSkelton() {
  return (
    <div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="mb-5 flex flex-col gap-2">
          <Skeleton className="w-96 h-8" />
          <Skeleton className="w-64 h-4" />
          <Skeleton className="w-48 h-4" />
        </div>
      ))}
    </div>
  );
}
