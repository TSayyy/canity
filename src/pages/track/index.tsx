import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import mentorImage from "@/assets/home/Mentor.png";
import courseImage from "@/assets/coursanity-thumbnail-course.png";
import CourseCard from "@/components/ui/CourseCard";
import MentorCard from "@/components/ui/MentorCard";
import { SomethingWentWrong } from "@/components/ui/SomethingWentWrong";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/useApi";
import { trackSchema } from "@/schemas/trackSchema";

import { PageSkelton } from "./PageSkelton";
import { TrackHeader } from "./TrackHeader";

export function Track() {
  const navigate = useNavigate();
  const { id } = useParams();

  // fetch Track Data
  const { data: response } = useGetData(`/tracks/${id}`);
  const { data, status } = response || {};
  const { data: track }: { data: z.infer<typeof trackSchema> } = data || {};

  if (status === "failed") {
    return <SomethingWentWrong />;
  }

  return (
    <>
      <TrackHeader track={track as z.infer<typeof trackSchema>} />
      {!track ? (
        <PageSkelton />
      ) : (
        <main className="container ">
          <header className="flex flex-col gap-10 py-10">
            <div className="flex md:gap-4 gap-2 flex-wrap">
              {track.keywords.map((topic, index) => (
                <Tag
                  title={topic}
                  key={index}
                  className="bg-white capitalize border-royal-blue text-royal-blue border-[1px] font-[400]"
                >
                  {topic}
                </Tag>
              ))}
            </div>
            <section className=" grid md:grid-cols-[1fr_300px] gap-5">
              <aside className="flex flex-col gap-2">
                <h4 className="font-semibold text-lg">Description:</h4>
                <p className="max-w-[900px] leading-5">{track?.description}</p>
              </aside>
              <aside className="flex flex-col mr-6 gap-2 ">
                <Button
                  size={"lg"}
                  variant={"outline"}
                  className="w-full border-royal-blue text-royal-blue hover:text-royal-blue"
                  type="button"
                  onClick={() => navigate(`/quiz/${track.title}`)}
                >
                  Take a quiz
                </Button>
                <Button size={"lg"} className="w-full" type="button" onClick={() => navigate(`/roadmap/${track.id}`)}>
                  Show Roadmap
                </Button>
              </aside>
            </section>
          </header>
          <main className="mb-16 grid gap-10">
            <section className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold">Ordered Courses:</h3>
              <div className="grid grid-cols-auto-fit-19 gap-3">
                {track?.courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    name={course.title}
                    description={course.description}
                    rate={course.rating}
                    track={course.trackName}
                    trackId={course.trackID}
                    duration={course.estimatedTime}
                    level={course.cLevel}
                    image={course.image || courseImage}
                    price={course.price}
                    id={course.id}
                  />
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold">Related Mentors:</h3>
              <div
                className={`flex justify-start 2xl:justify-between flex-wrap gap-2 sm:gap-3 last:items-end last:grow`}
              >
                {track.mentors.map((mentor) => (
                  <MentorCard
                    className="xxs:w-[150px] xxs:h-[200px] xs:w-[180px] xs:h-[220px] sm:w-[250px] sm:h-[300px]"
                    key={mentor.id}
                    name={mentor.user.name}
                    title={mentor.title}
                    rating={mentor.rating}
                    image={mentor.user.image || mentorImage}
                    id={mentor.id}
                  />
                ))}
              </div>
            </section>
          </main>
        </main>
      )}
    </>
  );
}
