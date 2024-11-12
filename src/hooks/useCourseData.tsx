import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Course } from "@/Data/coursesData";
import { addCourse, deleteCourse, getCourses, updateCourse } from "@/Data/dataService";

type ResponseFormat = {
  status: "success" | "failed";
  code: number;

  data: Course[] | Course | Partial<Course> | null;
};

export const globalResponseFormat = (data: Course[] | Course | Partial<Course> | null, code = 200): ResponseFormat => ({
  status: "success",
  code,
  data,
});

// Fetch all courses
export function useGetCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await getCourses();
      return globalResponseFormat(res);
    },
  });
}

// Add a new course
export function useAddCourse() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["addCourse"],
    mutationFn: async (course: Course) => {
      await addCourse(course);
      return globalResponseFormat(course, 201);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      if (data.code === 401) navigate("/auth/login");
    },
  });
}

// Update an existing course
export function useUpdateCourse() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["updateCourse"],
    mutationFn: async ({ id, updatedCourse }: { id: number; updatedCourse: Partial<Course> }) => {
      await updateCourse(id, updatedCourse);
      return globalResponseFormat(updatedCourse);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      if (data.code === 401) navigate("/auth/login");
    },
  });
}

// Delete a course
export function useDeleteCourse() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["deleteCourse"],
    mutationFn: async (id: number) => {
      await deleteCourse(id);
      return globalResponseFormat(null, 204);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      if (data.code === 401) navigate("/auth/login");
    },
  });
}
