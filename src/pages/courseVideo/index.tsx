import { useParams } from "react-router-dom";
import { z } from "zod";

import { SomethingWentWrong } from "@/components/ui/SomethingWentWrong";
import { useGetData } from "@/hooks/useApi";
import { LoadingPage } from "@/layouts/LoadingPage";
import { courseSchema } from "@/schemas/courseSchema";

import { AboutInstructor } from "./AboutInstructor";
import { CourseContents } from "./CourseContents";
import { CourseDescription } from "./CourseDescription";
import { CoursePlayer } from "./CoursePlayer";

type responseType = {
  course: z.infer<typeof courseSchema>;
  relatedCourses: z.infer<typeof courseSchema>[];
};
export function CourseVideo() {
  const { id: courseId } = useParams();
  const { status, data: response, isLoading } = useGetData(`courses/${courseId}`);
  const data = response?.data;
  const { course }: responseType = data || {};
  if (isLoading) return <LoadingPage />;
  if (status === "error") return <SomethingWentWrong />;
  return (
    <div className="sm:container sm:space-y-5 pb-10 sm:py-10">
      <header className="hidden sm:block">
        <h1 className="text-3xl font-semibold text-dark-navy">{course.title}</h1>
        <p className="text-zinc-500">{course?.mentor?.user?.name}</p>
      </header>

      <main className="grid grid-cols-[1fr_20rem] grid-rows-[auto_1fr] gap-6">
        <section className=" col-span-2 xl:col-span-1">
          <CoursePlayer courseChapters={course.chapters} />
        </section>
        <section className="px-4 sm:px-0 flex h-fit flex-col gap-5 row-span-2 col-span-2 xl:col-span-1">
          <header className="sm:hidden">
            <h1 className="text-xl sm:text-3xl font-semibold text-dark-navy">{course.title}</h1>
            <p className="text-zinc-500">{course?.mentor?.user?.name}</p>
          </header>
          <CourseContents courseChapters={course?.chapters} progress={course?.progress || 0} />
          <AboutInstructor mentor={course.mentor} />
        </section>
        <section className="px-4 sm:px-0 col-span-2 xl:col-span-1 ">
          <CourseDescription course={course} />
        </section>
      </main>
    </div>
  );
}
