import CourseCard from "@/components/ui/CourseCard";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { usePurchasedCourses } from "@/hooks/usePurchasedCourses";

export default function MyCoursesSection() {
  const { isLoading, purchasedCourses } = usePurchasedCourses();
  return (
    <section className="py-10">
      <div className="flex justify-between items-baseline">
        <h1 className="text-3xl 3xl:text-4xl font-semibold">My Courses:</h1>
        {purchasedCourses?.length > 3 && (
          <Button className="text-lg md:text-xl 3xl:text-2xl" variant="link">
            see more
          </Button>
        )}
      </div>
      {isLoading && (
        <div className=" grid place-items-center min-h-96">
          <Spinner />
        </div>
      )}
      {purchasedCourses?.length === 0 && (
        <div className="text-center text-lg text-neutral-gray py-10">You have not purchased any courses yet</div>
      )}
      <main className="grid grid-cols-auto-fit-19 xl:grid-cols-3 gap-5 mt-10 md:max-lg:last:*:col-span-2">
        {purchasedCourses
          ?.slice(0, 3)
          .map((course) => (
            <CourseCard
              key={course.id}
              className=" min-w-72"
              name={course.title}
              rate={course.rating}
              description={course.description}
              level={course.cLevel}
              id={course.id}
              track={course.trackName}
              duration={course.estimatedTime || 0}
              image={course.image}
              price={course.price}
              trackId={course.trackID}
            />
          ))}
      </main>
    </section>
  );
}
