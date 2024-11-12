import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Course } from "@/Data/coursesData";
import {
  addCourse,
  addMentor,
  deleteCourse,
  deleteMentor,
  getCourses,
  getMentors,
  updateCourse,
  updateMentor,
} from "@/Data/dataService";
import { Mentor } from "@/Data/mentorsData";

// Handle global response format
type TStatus = "success" | "failed";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalResponseFormat = (data: any, code: number = 200): { status: TStatus; code: number; data: any } => {
  return {
    status: "success",
    code,
    data,
  };
};

// COURSES CRUD Operations using local data
export function useGetCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = getCourses();
      return globalResponseFormat(res);
    },
  });
}

export function useAddCourse() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["addCourse"],
    mutationFn: async (course: Course) => {
      addCourse(course);
      return globalResponseFormat(course, 201);
    },
    onSuccess: (data) => {
      if (data.code === 401) navigate("/auth/login");
    },
  });
}

export function useUpdateCourse() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["updateCourse"],
    mutationFn: async ({ id, updatedCourse }: { id: number; updatedCourse: Partial<Course> }) => {
      updateCourse(id, updatedCourse);
      return globalResponseFormat(updatedCourse);
    },
    onSuccess: (data) => {
      if (data.code === 401) navigate("/auth/login");
    },
  });
}

export function useDeleteCourse() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["deleteCourse"],
    mutationFn: async (id: number) => {
      deleteCourse(id);
      return globalResponseFormat(null, 204);
    },
    onSuccess: (data) => {
      if (data.code === 401) navigate("/auth/login");
    },
  });
}

// MENTORS CRUD Operations using local data
export function useGetMentors() {
  return useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const res = getMentors();
      return globalResponseFormat(res);
    },
  });
}

export function useAddMentor() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["addMentor"],
    mutationFn: async (mentor: Mentor) => {
      addMentor(mentor);
      return globalResponseFormat(mentor, 201);
    },
    onSuccess: (data) => {
      if (data.code === 401) navigate("/auth/login");
    },
  });
}

export function useUpdateMentor() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["updateMentor"],
    mutationFn: async ({ id, updatedMentor }: { id: number; updatedMentor: Partial<Mentor> }) => {
      updateMentor(id, updatedMentor);
      return globalResponseFormat(updatedMentor);
    },
    onSuccess: (data) => {
      if (data.code === 401) navigate("/auth/login");
    },
  });
}

export function useDeleteMentor() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["deleteMentor"],
    mutationFn: async (id: number) => {
      deleteMentor(id);
      return globalResponseFormat(null, 204);
    },
    onSuccess: (data) => {
      if (data.code === 401) navigate("/auth/login");
    },
  });
}
