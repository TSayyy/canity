import { useParams } from "react-router-dom";
import { z } from "zod";

import CourseCard from "@/components/ui/CourseCard";
import { Keywords } from "@/components/ui/Keywords";
import { SomethingWentWrong } from "@/components/ui/SomethingWentWrong";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { WishListButton } from "@/components/ui/WishListButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/useApi";
import { useWishlist } from "@/hooks/useWishlist";
import { LoadingPage } from "@/layouts/LoadingPage";
import { courseSchema } from "@/schemas/courseSchema";
import { formatCurrency } from "@/utils/helpers";

import BuyCourseBtn from "./components/BuyCourseBtn";
import { CourseContent } from "./components/CourseContent";
import { CourseDetails } from "./components/courseDetails";

type responseType = {
  course: z.infer<typeof courseSchema>;
  relatedCourses: z.infer<typeof courseSchema>[];
};
export function CourseInfo() {
  const { id: courseId } = useParams();

  // fetch course data
  const { status, data: response, isLoading } = useGetData(`courses/${courseId}`);
  const data = response?.data;
  const { course, relatedCourses }: responseType = data || {};

  // wishlist check
  const { isLoading: isLoadingWishlist, wishlistIds } = useWishlist();
  const isWishListed = wishlistIds?.includes(courseId || "");

  if (isLoading) return <LoadingPage />;
  if (status === "error") return <SomethingWentWrong />;
  return (
    <main>
      <main className="grid lg:grid-cols-[1fr_28rem] lg:grid-rows-[minmax(min,1fr)_1fr]">
        <section className="bg-dark-navy text-white py-10 space-y-4 ">
          <div className="container space-y-2">
            <h1 className="text-4xl font-semibold hidden lg:block">{course.title}</h1>
            <h2 className="text-2xl lg:hidden">Course Description :</h2>
            <p className="text-lg">{course.description}</p>
          </div>
          <CourseDetails {...course} />
          <div className="container pt-3 flex justify-start items-center gap-3">
            <UserAvatar imageUrl={course.mentor?.user?.image} name={course.mentor?.user?.name} className=" h-10 w-10" />
            <span className="text-xl">Instructor: {course.mentor?.user?.name}</span>
          </div>
        </section>
        <div className=" container py-10 lg:pt-10 lg:px-5 lg:bg-dark-navy relative row-start-1 lg:row-start-auto ">
          <header className=" lg:absolute lg:me-10 lg:p-5 grid gap-5  lg:shadow-custom rounded-xl bg-white">
            <div className=" lg:hidden">
              <h1 className="text-2xl font-semibold text-dark-navy">{course.title}</h1>
              <p className="text-zinc-500 text-lg">{course.trackName}</p>
            </div>
            <img src={course.image} alt={course.title} className=" lg:rounded-xl" loading="lazy" />
            <Keywords keywords={course.keywords} />

            <h1 className="text-4xl text-dark-navy font-semibold">{formatCurrency(course.price)}</h1>
            <div className="grid gap-2">
              <BuyCourseBtn courseId={courseId} />
              {isLoadingWishlist ? (
                <Skeleton className="w-full h-10 bg-royal-blue/10" />
              ) : (
                <WishListButton
                  className=" justify-center border-[1px] border-royal-blue"
                  courseId={course.id}
                  isWishListed={isWishListed}
                />
              )}
            </div>
          </header>
        </div>
        <section className="py-10 container grid gap-3">
          <h1 className="text-3xl font-semibold">Course Content :</h1>
          <CourseContent courseChapters={course.chapters} />
        </section>
      </main>
      <section className="container py-10">
        <h1 className="text-3xl font-semibold">Related courses:</h1>
        <div className=" grid grid-cols-auto-fit-19 gap-3">
          {relatedCourses.map((course) => (
            <CourseCard
              className="max-w-[470px"
              key={course.id}
              id={course.id}
              name={course.title}
              description={course.description}
              image={course.image}
              rate={course.rating}
              level={course.cLevel}
              price={course.price}
              track={course.trackName}
              trackId={course.trackID}
              duration={course.estimatedTime}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
