import CourseCard from "@/components/ui/CourseCard";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistSection() {
  const { wishlist, isLoading } = useWishlist();

  return (
    <section className="py-10">
      <div className="flex justify-between items-baseline">
        <h1 className="text-3xl 3xl:text-4xl font-semibold">My Wishlist:</h1>
        {wishlist?.length > 3 && (
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
      {wishlist?.length === 0 && (
        <div className="text-center text-lg text-neutral-gray py-10">No courses in your wishlist</div>
      )}
      <main className="grid grid-cols-auto-fit-19 xl:grid-cols-3 gap-5 mt-10 md:max-lg:last:*:col-span-2">
        {wishlist
          ?.slice(0, 3)
          .map((course) => (
            <CourseCard
              key={course.course.id}
              className=" min-w-72"
              name={course.course.title}
              rate={course.course.rating}
              description={course.course.description}
              level={course.course.cLevel}
              id={course.course.id}
              track={course.course.trackName}
              duration={course.course.estimatedTime || 0}
              image={course.course.image}
              price={course.course.price}
              trackId={course.course.trackID}
            />
          ))}
      </main>
    </section>
  );
}
