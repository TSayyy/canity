import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkelton() {
  return (
    <main className="container flex flex-col gap-4 justify-center items-start z-20">
      <Skeleton className="w-60 h-10 bg-secondary/20" />
      <Skeleton className="w-72 md:w-96 h-6 bg-secondary/20" />
      <div className="flex gap-5">
        <Skeleton className="w-20 h-4 bg-secondary/20" />
        <Skeleton className="w-32 h-4 bg-secondary/20" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="w-36 h-8 bg-secondary/20" />
        <Skeleton className="w-72 md:w-96 h-2 bg-secondary/20" />
      </div>
    </main>
  );
}
