import React from "react";
import { TbAdjustmentsFilled } from "react-icons/tb";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

import courseImage from "@/assets/coursanity-thumbnail-course.png";
import { Button } from "@/components/ui/Button_";
import CourseCard from "@/components/ui/CourseCard";
import Modal from "@/components/ui/Modal";
import { Paginate } from "@/components/ui/Paginate";
import { SearchBar } from "@/components/ui/SearchBar";
import { SomethingWentWrong } from "@/components/ui/SomethingWentWrong";
import { Spinner } from "@/components/ui/Spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/useApi";
import { useTracks } from "@/hooks/useTracks";
import { courseSchema } from "@/schemas/courseSchema";

import { FilterCoursesForm } from "./FilterCoursesForm";

const COURSES_PER_PAGE = 9;
export function AllCoursesSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // fetch Courses
  const { data: response } = useGetData(`courses?${searchParams.toString()}`);
  const { data, status } = response || {};
  const { courses, totalCourses, globalMaxPrice, globalMinPrice, minNumberOfChapters, maxNumberOfChapters } =
    data || {};

  const tracks = useTracks()?.map((track) => track.name);
  const selectedTrack = searchParams.get("track") || "all";

  const handleTrackChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === "all") {
      searchParams.delete("track");
      setSearchParams(searchParams, { replace: true });
      return;
    }
    if (e.currentTarget.value.toLowerCase() === selectedTrack) {
      searchParams.delete("track");
      setSearchParams(searchParams, { replace: true });
      return;
    }
    searchParams.set("track", e.currentTarget.value);
    setSearchParams(searchParams, { replace: true });
  };

  const handleDeletingAllFilters = () => {
    navigate("/courses", { replace: true });
  };

  if (status === "failed") {
    return <SomethingWentWrong />;
  }

  return (
    <main className=" py-20">
      <header className="container flex justify-center items-start flex-col-reverse gap-4 lg:flex-row lg:justify-between">
        <div className="flex justify-start gap-3 flex-wrap">
          {tracks?.length
            ? tracks.map((track, index) => (
                <button
                  key={index}
                  value={track.toLowerCase()}
                  className={` border-2 text-xs sm:text-sm md:text-base whitespace-nowrap transition-colors border-royal-blue px-4 py-2 rounded-xl ${track.toLowerCase() === selectedTrack.toLowerCase() ? "bg-royal-blue text-white" : "text-royal-blue hover:bg-dark-navy/5"}`}
                  onClick={handleTrackChange}
                >
                  {track}
                </button>
              ))
            : Array.from({ length: 8 }, (_, index) => <Skeleton key={index} className="w-28 h-8 rounded-lg" />)}
        </div>
        <div className="flex w-full grow lg:max-w-96  gap-2 max-h-12">
          <SearchBar
            className="bg-gray-200 text-gray-500 *:placeholder:text-gray-500/80 "
            onChange={() => null}
            value=""
          />

          <Modal>
            <Modal.Open opens="filter">
              <button className="bg-royal-blue aspect-square flex justify-center items-center text-white px-2 py-1 rounded-lg">
                <TbAdjustmentsFilled size={28} className="rotate-90 aspect-square" />
              </button>
            </Modal.Open>

            <Modal.Window name="filter">
              <FilterCoursesForm
                defaultChaptersRange={[minNumberOfChapters || 0, maxNumberOfChapters || 10]}
                defaultPricesRange={[globalMinPrice || 0, globalMaxPrice || 100]}
              />
            </Modal.Window>
          </Modal>
        </div>
      </header>
      {!courses ? (
        <div className="py-20 flex justify-center items-center">
          <Spinner className="w-36 h-36 stroke-zinc-500" />
        </div>
      ) : courses.length === 0 ? (
        <div className="container py-20 w-full flex justify-center items-center">
          <section className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-center">No courses available</h1>
            <Button text="Clear Filters" type="button" onClick={handleDeletingAllFilters} />
          </section>
        </div>
      ) : (
        <main className="container grid grid-cols-auto-fit-19 xl:grid-cols-3 gap-5 py-10">
          {courses?.map((course: z.infer<typeof courseSchema>) => (
            <CourseCard
              key={course.id}
              className=" min-w-72"
              id={course.id}
              name={course.title}
              track={course.trackName || "Data Science"}
              trackId={course.trackID}
              duration={course.estimatedTime}
              level={course.cLevel}
              rate={course.rating}
              image={course.image || courseImage}
              price={course.price}
              description={course.description}
            />
          ))}
        </main>
      )}
      <Paginate pageCount={Math.ceil(totalCourses / COURSES_PER_PAGE) || 1} />
    </main>
  );
}
