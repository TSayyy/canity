import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

import { Paginate } from "@/components/ui/Paginate";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useGetData } from "@/hooks/useApi";
import { LoadingPage } from "@/layouts/LoadingPage";

import { CoursesTable } from "../components/CoursesTable";
import { AddCourseForm } from "./components/AddCourseForm";

const pageSize = 10;
export function DashboardCourses() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debounceSearch = useDebouncedCallback((value) => {
    searchParams.set("search", value);
    setSearchParams(searchParams);
  }, 500);

  // fetch Courses
  const { data: response, isLoading } = useGetData(
    `admin/courses?experience=1&pageSize=${pageSize}${searchParams.get("page") ? `&pageNumber=${searchParams.get("page")}` : ""}`
  );
  const { data } = response || {};
  const { courses, courseCnt } = data || {};
  return (
    <main>
      <section className=" shadow-custom rounded-xl py-6 mb-10">
        <header className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center px-6 mb-5">
          <h1 className=" text-2xl font-semibold ">Courses</h1>
          <div className="flex gap-2 justify-between lg:justify-end items-center">
            <SearchBar
              value={search}
              onChange={(value) => {
                setSearch(value);
                debounceSearch(value);
              }}
              className="min-w-48 bg-gray-100"
            />
            <Dialog open={isAddModalOpen} onOpenChange={() => setIsAddModalOpen((prev) => !prev)}>
              <DialogTrigger>
                <Button size={"sm"} className="flex gap-2 py-0">
                  <FaPlus /> Add
                </Button>
              </DialogTrigger>
              <DialogContent className=" container max-h-[95%] w-5/6 md:w-4/6  max-w-4xl  overflow-x-hidden">
                <DialogHeader>
                  <DialogTitle>
                    <h1 className="text-2xl font-semibold mb-5">Add a New Course</h1>
                  </DialogTitle>
                  <AddCourseForm onCloseModal={() => setIsAddModalOpen(false)} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        {isLoading ? <LoadingPage /> : <CoursesTable courses={courses} />}
      </section>
      <Paginate pageCount={courseCnt / pageSize} />
    </main>
  );
}
