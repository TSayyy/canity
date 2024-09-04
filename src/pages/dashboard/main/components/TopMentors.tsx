import { z } from "zod";

import { mentorSchema } from "@/schemas/mentorSchema";

import { MentorsTable } from "../../components/MentorTable";

type TopMentorsProps = {
  mentors: z.infer<typeof mentorSchema>[];
};

export function TopMentors({ mentors }: TopMentorsProps) {
  return (
    <div className=" shadow-custom rounded-xl py-6">
      <h1 className=" text-2xl font-semibold px-6">Top Mentors</h1>
      <MentorsTable mentors={mentors} />
    </div>
  );
}
