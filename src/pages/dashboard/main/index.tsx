import { BsFillPeopleFill } from "react-icons/bs";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { PiBooksBold } from "react-icons/pi";
import { RiPresentationLine } from "react-icons/ri";
import { z } from "zod";

import { useGetData } from "@/hooks/useApi";
import { LoadingPage } from "@/layouts/LoadingPage";
import { mentorSchema } from "@/schemas/mentorSchema";

import { Statistic } from "./components/Statistic";
import { TopMentors } from "./components/TopMentors";
import { TopTracksChart } from "./components/TopTracksChart";
import { TopUsers } from "./components/TopUsers";

const totalUsers = [
  {
    name: "Jan",
    user: 6816,
  },
  {
    name: "Feb",
    user: 4511,
  },
  {
    name: "Mar",
    user: 5992,
  },
  {
    name: "Apr",
    user: 4588,
  },
  {
    name: "May",
    user: 4001,
  },
  {
    name: "Jun",
    user: 9795,
  },
  {
    name: "Jul",
    user: 1385,
  },
  {
    name: "Aug",
    user: 6224,
  },
  {
    name: "Sep",
    user: 6360,
  },
  {
    name: "Oct",
    user: 2933,
  },
  {
    name: "Nov",
    user: 4288,
  },
  {
    name: "Dec",
    user: 4394,
  },
];

type ResponseData = {
  courseCnt: number;
  mentorCnt: number;
  studentCnt: number;
  topMentors: z.infer<typeof mentorSchema>[];
  topTracks: { trackTitle: string; trackPercentage: number }[];
};
export function DashboardMain() {
  const { data: response, isLoading } = useGetData("/admin/dashboard");
  const { data } = response || {};
  const { courseCnt, mentorCnt, studentCnt, topMentors, topTracks }: ResponseData = data || {};
  if (isLoading) return <LoadingPage />;
  return (
    <main>
      <section className=" grid xl:grid-cols-4 sm:grid-cols-2 gap-3">
        <Statistic
          Icon={BsFillPeopleFill}
          title="Learners"
          value={studentCnt}
          IconClassName={"bg-[#3D42DF]/20 text-[#3D42DF]"}
          trend={8.5}
        />
        <Statistic
          Icon={RiPresentationLine}
          title="Mentors"
          value={mentorCnt}
          IconClassName={"bg-[#C94E08]/20 text-[#C94E08]"}
          trend={8.5}
        />
        <Statistic
          Icon={PiBooksBold}
          title="Courses"
          value={courseCnt}
          IconClassName={"bg-[#3498DB]/20 text-[#3498DB]"}
          trend={8.5}
        />
        <Statistic
          Icon={FaMoneyCheckDollar}
          title="Profits"
          value={1200}
          IconClassName={"bg-[#2ECC71]/20 text-[#2ECC71]"}
          trend={-8.5}
        />
      </section>
      <section className="py-4 grid xl:grid-cols-[1.5fr_2fr] gap-3">
        <TopTracksChart
          data={topTracks?.map((track) => ({
            name: track.trackTitle,
            value: track.trackPercentage,
          }))}
        />
        <TopUsers data={totalUsers} />
      </section>
      <section>
        <TopMentors mentors={topMentors} />
      </section>
    </main>
  );
}
