import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { addMentor, deleteMentor, getMentors, updateMentor } from "@/Data/dataService";
// Ensure correct casing
import { Mentor } from "@/Data/mentorsData.tsx";

// Ensure correct casing

type MentorResponse = {
  status: "success" | "failed";
  code: number;
  data: Mentor[] | Mentor | Partial<Mentor> | null;
};

// Utility function for consistent response format
export const globalResponseFormat = (data: Mentor[] | Mentor | Partial<Mentor> | null, code = 200): MentorResponse => ({
  status: data ? "success" : "failed",
  code,
  data,
});

// Fetch all mentors
export function useGetMentors() {
  return useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const res = await getMentors();
      return globalResponseFormat(res);
    },
  });
}

// Add a new mentor
export function useAddMentor() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["addMentor"],
    mutationFn: async (mentor: Mentor) => {
      await addMentor(mentor); // assuming addMentor is async
      return globalResponseFormat(mentor, 201);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["mentors"] }); // Correct usage
      if (data.code === 401) navigate("/auth/login");
    },
  });
}

// Update an existing mentor
export function useUpdateMentor() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["updateMentor"],
    mutationFn: async ({ id, updatedMentor }: { id: number; updatedMentor: Partial<Mentor> }) => {
      await updateMentor(id, updatedMentor); // assuming updateMentor is async
      return globalResponseFormat(updatedMentor);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["mentors"] }); // Correct usage
      if (data.code === 401) navigate("/auth/login");
    },
  });
}

// Delete a mentor
export function useDeleteMentor() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["deleteMentor"],
    mutationFn: async (id: number) => {
      await deleteMentor(id); // assuming deleteMentor is async
      return globalResponseFormat(null, 204);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["mentors"] }); // Correct usage
      if (data.code === 401) navigate("/auth/login");
    },
  });
}
