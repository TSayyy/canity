import { z } from "zod";

import { SomethingWentWrong } from "@/components/ui/SomethingWentWrong";
import { Spinner } from "@/components/ui/Spinner";
// import { mentor } from "@/db/mentor";
import { useGetData } from "@/hooks/useApi";
import { mentorSchema } from "@/schemas/mentorSchema";

import { MentorInfo } from "../components/mentorInfo";
import { SkillsBox } from "../components/skillsBox";
import { AvailabilityEditor } from "./components/AvailabilityEditor";
import { BookedSessions } from "./components/BookedSessions";
import { MeStats } from "./components/meStats";
import { MeHeader } from "./components/mentorMeHeader";

export const MentorMePage = () => {
  const { data: response } = useGetData(`/mentors/profile`);
  const { data, status } = response || {};
  const { mentor }: { mentor: z.infer<typeof mentorSchema> } = data || {};
  console.log(mentor?.Visit);
  if (!status) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <Spinner className=" w-32 h-32 stroke-zinc-500" />
      </div>
    );
  }
  if (!(status === "success")) {
    return <SomethingWentWrong />;
  }

  return (
    <>
      <MeHeader
        name={mentor?.user?.name}
        jobTitle={mentor?.title}
        description={mentor?.about}
        image={mentor?.user?.image}
      />
      <main className="w-full py-10 *:text-dark-navy">
        <div className="container">
          <SkillsBox skills={mentor?.skills} />
          <div className="my-8 flex flex-col md:flex-row gap-y-8 gap-x-4 justify-between">
            <MentorInfo
              experience={mentor?.experience}
              workExperience={mentor?.workExperience}
              education={mentor?.education}
              rating={mentor?.rating}
              resume={mentor?.resume}
              languages={mentor?.languages}
              country={mentor?.user?.country}
              city={mentor?.user?.city}
              timeZones={mentor?.timeZones}
            />
            <MeStats mentor={mentor} />
          </div>
          <div className="my-8 flex flex-col md:flex-row gap-y-8 gap-x-4 justify-between">
            <AvailabilityEditor availabilities={mentor?.availability} />
            <BookedSessions sessions={mentor?.sessions} userRole="mentor" />
          </div>
        </div>
      </main>
    </>
  );
};
