import { TbAdjustmentsFilled } from "react-icons/tb";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/Button_";
import MentorCard from "@/components/ui/MentorCard";
import Modal from "@/components/ui/Modal";
import { Paginate } from "@/components/ui/Paginate";
import { SearchBar } from "@/components/ui/SearchBar";
import { SomethingWentWrong } from "@/components/ui/SomethingWentWrong";
import { Spinner } from "@/components/ui/Spinner";
import { useGetData } from "@/hooks/useApi";
import { mentorSchema } from "@/schemas/mentorSchema";

import { FilterMentorsFrom } from "./FilterMentorsForm";

const MENTORS_PER_PAGE = 16;

export default function AllMentorsSection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: response } = useGetData(`mentors?${searchParams.toString()}`);
  const { data, status } = response || {};
  const { mentors, totalMentors, globalMinPrice, globalMaxPrice, globalMinExperience, globalMaxExperience } =
    data || {};

  if (status === "failed") {
    return <SomethingWentWrong />;
  }

  return (
    <div>
      <main className="container py-20">
        <section className="flex flex-col lg:flex-row justify-center gap-10 ">
          <aside className=" flex lg:flex-col  gap-2 lg:max-w-80 lg:min-w-80">
            <SearchBar
              className="bg-gray-200 text-gray-500 *:placeholder:text-gray-500/80 "
              onChange={() => null}
              value=""
            />
            <Modal>
              <Modal.Open opens="filter">
                <button className="bg-royal-blue aspect-square flex justify-center items-center text-white px-2 py-1 rounded-lg lg:hidden">
                  <TbAdjustmentsFilled size={28} className="rotate-90 aspect-square" />
                </button>
              </Modal.Open>

              <Modal.Window name="filter">
                <FilterMentorsFrom
                  defaultExperienceRange={[globalMinExperience || 0, globalMaxExperience || 10]}
                  defaultPricesRange={[globalMinPrice || 0, globalMaxPrice || 100]}
                />
              </Modal.Window>
            </Modal>
            <div className="grow hidden lg:block">
              <FilterMentorsFrom
                defaultExperienceRange={[globalMinExperience || 0, globalMaxExperience || 10]}
                defaultPricesRange={[globalMinPrice || 0, globalMaxPrice || 100]}
              />
            </div>
          </aside>
          {!mentors ? (
            <div className="py-20 grow flex justify-center items-center">
              <Spinner className="w-36 h-36 stroke-zinc-500" />
            </div>
          ) : mentors.length === 0 ? (
            <div className="container py-20 w-full flex ">
              <section className="flex grow flex-col items-center gap-3">
                <h1 className="text-3xl font-bold text-center">No mentors available</h1>
                <Button
                  className="max-w-36"
                  text="Clear Filters"
                  type="button"
                  onClick={() => navigate("/mentors", { replace: true })}
                />
              </section>
            </div>
          ) : (
            <aside className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4 h-min grow text-white ">
              {mentors.map((mentor: z.infer<typeof mentorSchema>) => (
                <MentorCard
                  key={mentor.id}
                  className="xxs:w-[150px] xxs:h-[200px] sm:w-[250px] sm:h-[300px]"
                  name={mentor.user.name}
                  rating={mentor.rating}
                  image={mentor.user.image}
                  title={mentor.track.name}
                  id={mentor.id}
                />
              ))}
            </aside>
          )}
        </section>
        <div className="mt-10">
          <Paginate pageCount={Math.ceil(totalMentors / MENTORS_PER_PAGE) || 1} />
        </div>
      </main>
    </div>
  );
}
