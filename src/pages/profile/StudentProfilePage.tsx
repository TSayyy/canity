import { z } from "zod";

import { SocialCard } from "@/components/ui/SocialCard";
import { SomethingWentWrong } from "@/components/ui/SomethingWentWrong";
import { useGetData } from "@/hooks/useApi";
import { LoadingPage } from "@/layouts/LoadingPage";
import { studentSchema } from "@/schemas/studentSchema";

import { BookedSessions } from "../mentor/me/components/BookedSessions";
import MyCoursesSection from "./components/MyCoursesSection";
import { StudentHeader } from "./components/StudentHeader";
import { StudentInfo } from "./components/StudentInfo";
import { TracksProgress } from "./components/TracksProgress";
import WishlistSection from "./components/WishlistSection";

export function StudentProfilePage() {
  const { data: response, isLoading } = useGetData("students/profile");

  const { status, data } = response?.data || {};
  const { student }: { student: z.infer<typeof studentSchema> } = data || {};

  if (isLoading) return <LoadingPage />;
  if (!(status === "Success")) {
    return <SomethingWentWrong />;
  }
  return (
    <main>
      <StudentHeader name={student.user.name} studentImage={student.user.image} id={student.id} />
      <main className="container pb-20">
        <section className="flex basis-1/2 flex-col gap-5 py-10 lg:flex-row">
          <StudentInfo
            bio={student.user.bio}
            dob={student.user.dob}
            country={student.user.country}
            city={student.user.city}
          />
          <div className=" grid gap-5 sm:grid-cols-2 lg:flex basis-1/2  lg:max-w-xl">
            <TracksProgress tracks={student.tracks} />
            <SocialCard
              className="min-w-fit "
              mail={student.user.email}
              github={student.gitHub}
              linkedin={student.linkedIn}
              facebook={student.facebook}
              href={{
                mail: student.user.email,
                github: student.gitHub,
                linkedin: student.linkedIn,
                facebook: student.facebook,
              }}
            />
          </div>
        </section>
        <section className="py-10">
          <BookedSessions sessions={student.sessions || []} userRole="student" className="h-48" />
        </section>
        <WishlistSection />
        <MyCoursesSection />
      </main>
    </main>
  );
}
