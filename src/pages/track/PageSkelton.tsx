import { Skeleton } from "@/components/ui/skeleton";

export function PageSkelton() {
  return (
    <main className="container ">
      <header className="flex flex-col gap-10 py-10">
        <div className="flex md:gap-4 gap-2 flex-wrap">
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="w-32 h-8 " />
          ))}
        </div>
        <section className="flex flex-col lg:flex-row gap-6 justify-between">
          <aside className="flex flex-col gap-2 grow">
            <h4 className="font-semibold text-lg">Description:</h4>
            <Skeleton className="w-4/5 h-8 " />
            <Skeleton className="w-1/2 h-8 " />
          </aside>
          <aside className="flex w-96 flex-col gap-2">
            <Skeleton className="w-72 h-12 " />
            <Skeleton className="w-72 h-12 " />
          </aside>
        </section>
      </header>
      <main className="mb-16 grid gap-10">
        <section className="flex flex-col gap-3">
          <h3 className="text-2xl font-semibold">Ordered Courses:</h3>
          <div className="grid grid-cols-auto-fit-19 gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-96 " />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-3">
          <h3 className="text-2xl font-semibold">Related Mentors:</h3>
          <div className="flex justify-start flex-wrap gap-2 sm:gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="w-[150px] h-[200px] sm:w-[250px] sm:h-[300px]" />
            ))}
          </div>
        </section>
      </main>
    </main>
  );
}
