import { FaUser } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { HiStar } from "react-icons/hi2";
import { z } from "zod";

import { Tag } from "@/components/ui/Tag";
import { Progress } from "@/components/ui/progress";
import { trackSchema } from "@/schemas/trackSchema";

import TrackHeaderImage from "../../assets/trackHeaderImage.jpg";
import { HeaderSkelton } from "./HeaderSkelton";

type TrackHeaderProps = {
  track: z.infer<typeof trackSchema>;
};

export function TrackHeader({ track }: TrackHeaderProps) {
  return (
    <header className="relative flex justify-start items-center min-h-80 bg-gradient-to-br from-dark-navy via-dark-navy/90 text-white py-20">
      <div
        style={{ backgroundImage: `url(${TrackHeaderImage})` }}
        className=" absolute inset-0 -z-10 bg-no-repeat bg-right bg-dark-navy bg-cover  after:content-[''] after:top-0 after:left-0 after:absolute after:-z-1 after:w-full  after:h-[20%]  after:bg-gradient-to-b after:from-dark-navy after:via-dark-navy/20"
      />
      {track ? (
        <main className="container flex flex-col gap-4 justify-center items-start z-20">
          <h1 className="text-5xl font-semibold">{track?.title}</h1>
          <p className="text-lg ">{track?.subtitle}</p>
          <div className="flex gap-5 flex-wrap">
            <Tag className="bg-[#374573] select-none text-white">
              <HiStar className="text-yellow-500" size={18} />
              {track?.rating?.toFixed(1)}
            </Tag>
            <Tag className="bg-[#374573] select-none flex gap-2 text-white">
              <FaUser className="text-royal-blue" /> {track?.noStudentsEnrolled}+ learners
            </Tag>
            <Tag className="bg-[#374573] select-none flex gap-2 text-white">
              <FaClock className="text-royal-blue" /> {track?.estimatedTime} hours
            </Tag>
          </div>
          <div className="w-full flex flex-col gap-2">
            <h2 className="ml-1 text-xl font-semibold">{Math.ceil((1 - track?.progress) * 100)}% to complete</h2>
            <Progress className="max-w-96 h-2 bg-dark-navy text-white shadow-2xl" value={track?.progress * 100} />
          </div>
        </main>
      ) : (
        <HeaderSkelton />
      )}
    </header>
  );
}
