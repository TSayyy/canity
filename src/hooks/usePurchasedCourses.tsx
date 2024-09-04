import { z } from "zod";

import { courseSchema } from "@/schemas/courseSchema";

import { useGetData } from "./useApi";

export function usePurchasedCourses(size?: number, pageSize?: number) {
  const { data: response, isLoading } = useGetData(
    `courses/me${size ? `&size=${size}` : ""}${pageSize ? `&pageSize=${pageSize}` : ""}`
  );
  const { courses }: { courses: { course: z.infer<typeof courseSchema> }[] } = response?.data || {};
  const purchasedCourses = courses?.map((course) => course.course);
  const purchasedCoursesIds = purchasedCourses?.map((course) => course.id);

  return { isLoading, purchasedCourses, purchasedCoursesIds };
}
