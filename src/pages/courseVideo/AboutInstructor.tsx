import { Link } from "react-router-dom";
import { z } from "zod";

import { UserAvatar } from "@/components/ui/UserAvatar";
import { mentorSchema } from "@/schemas/mentorSchema";

type AboutInstructorProps = {
  mentor: z.infer<typeof mentorSchema>;
};
export function AboutInstructor({ mentor }: AboutInstructorProps) {
  return (
    <div className="px-5 grid gap-3 py-5 text-dark-navy shadow-custom rounded-xl">
      <h2 className="text-xl font-[500]">About Instructor</h2>
      <section className="flex gap-3">
        <UserAvatar className="w-16 h-16" imageUrl={mentor.user.image} name={mentor.user.name} />
        <div className="grow">
          <Link to={`mentor/${mentor.id}`} className="text-2xl text-royal-blue font-[500]">
            {mentor.user.name}
          </Link>
          <p className="text-zinc-400">{mentor.title}</p>
        </div>
      </section>
      <p className="text-balance">{mentor.about}</p>
    </div>
  );
}
