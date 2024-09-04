import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

import { Paginate } from "@/components/ui/Paginate";
import { SearchBar } from "@/components/ui/SearchBar";
import { SomethingWentWrong } from "@/components/ui/SomethingWentWrong";
import { useGetData } from "@/hooks/useApi";
import { LoadingPage } from "@/layouts/LoadingPage";

import { MentorsTable } from "../components/MentorTable";

export function DashboardMentors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debounceSearch = useDebouncedCallback((value) => {
    searchParams.set("search", value);
    setSearchParams(searchParams);
  }, 500);

  // fetch Courses
  const { data: response, isLoading } = useGetData(
    `admin/mentors?image=true&name=true&track=true${searchParams.get("page") ? `&pageNumber=${searchParams.get("page")}` : ""}`
  );
  const { data, status } = response || {};
  const { mentors, mentorCnt, pageSize } = data || {};
  console.log(mentorCnt, pageSize);
  if (status === "failed") return <SomethingWentWrong />;
  return (
    <main>
      <section className=" shadow-custom rounded-xl py-6 mb-10">
        <header className="flex flex-col sm:flex-row  sm:justify-between sm:items-center gap-3 px-6 mb-5">
          <h1 className=" text-2xl font-semibold ">Mentors</h1>
          <div className="flex gap-2 justify-end items-center">
            <SearchBar
              value={search}
              onChange={(value) => {
                setSearch(value);
                debounceSearch(value);
              }}
              className="min-w-48 bg-gray-100"
            />
          </div>
        </header>
        {isLoading ? <LoadingPage /> : <MentorsTable mentors={mentors} />}
      </section>
      <Paginate pageCount={mentorCnt / pageSize} />
    </main>
  );
}
