import { z } from "zod";

import { SocialCard } from "@/components/ui/SocialCard";
import { mentorSchema } from "@/schemas/mentorSchema";

// import { SocialCard } from "./SocialCard";
import { LearnersCard } from "./learnersCard";
import { StatsCard } from "./visitsCard";

export const MeStats = ({ mentor }: { mentor: z.infer<typeof mentorSchema> }) => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex gap-6 flex-col sm:max-md:flex-row lg:flex-row">
        <LearnersCard learnersNumber={mentor.noStudents} />
        <SocialCard
          className="min-w-fit "
          mail={mentor.user.email}
          github={mentor.gitHub}
          linkedin={mentor.linkedIn}
          facebook={mentor.facebook}
          href={{
            mail: mentor.user.email,
            github: mentor.gitHub,
            linkedin: mentor.linkedIn,
            facebook: mentor.facebook,
          }}
        />
      </div>
      <StatsCard visits={mentor.Visit} />
    </div>
  );
};
