import { useParams } from "react-router-dom";
import { z } from "zod";

import { SomethingWentWrong } from "@/components/ui/SomethingWentWrong";
import { useGetData } from "@/hooks/useApi";
import { LoadingPage } from "@/layouts/LoadingPage";
import { mentorSchema } from "@/schemas/mentorSchema";

import { MentorInfo } from "../components/mentorInfo";
import { SkillsBox } from "../components/skillsBox";
import { MentorSmallCalendar } from "./components/mentorSmallCalendar";
import { ViewerHeader } from "./components/mentorViewHeader";

export const MentorViewerPage = () => {
  const { id } = useParams();
  const { data: mentorData, isLoading, isError } = useGetData(`students/view-mentor/${id}`);
  const { mentor }: { mentor: z.infer<typeof mentorSchema> } = mentorData?.data?.data?.mentor ?? {};
  if (isError || mentorData?.status === "failed" || !mentor) return <SomethingWentWrong />;
  if (isLoading) return <LoadingPage />;
  return (
    <main className="min-h-dvh flex flex-col">
      <ViewerHeader
        name={mentor?.user?.name || "name"}
        description={mentor?.about || "about "}
        jobTitle={mentor?.title || "title "}
        image={mentor?.user?.image}
        price={mentor?.pricePerHour}
      />
      <main className="w-full py-10 *:text-dark-navy">
        <div className="container">
          <SkillsBox skills={mentor?.skills} />
          <div className="my-8 flex flex-col lg:flex-row gap-y-8 gap-x-4 justify-between">
            <MentorInfo {...mentor} city={mentor?.user.city} country={mentor?.user.country} timeZones="UTC+2" />
            <MentorSmallCalendar availability={mentor?.availability} />
          </div>
        </div>
      </main>
    </main>
  );
};
