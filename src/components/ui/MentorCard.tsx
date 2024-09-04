import { HiStar } from "react-icons/hi2";
import { Link } from "react-router-dom";

import { Tag } from "./Tag";

type MentorCardProps = {
  name: string;
  image?: string | undefined;
  id: string;
  rating: number;
  title: string;
  className?: string;
};

export default function MentorCard({ name, id, rating, image, title, className }: MentorCardProps) {
  return (
    <div className={"rounded-lg shadow-lg overflow-hidden flex flex-col " + className}>
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={`${name} image`}
          title={`${name}`}
          className="bg-[#B7B9C3] aspect-square w-full h-full object-cover pb-0"
        />
        <div className="absolute -left-1 -top-1 flex w-full justify-between p-4 text-sm">
          <Tag>
            <HiStar className="inline-block h-5 w-5 text-yellow-500" />
            <p>{rating.toFixed(1)}</p>
          </Tag>
        </div>
      </div>
      <Link
        to={`/mentor/${id}`}
        className="bg-[#222C54] py-2 text-white  min-h-fit flex flex-col justify-center items-center"
      >
        <h1 className="text-base sm:text-xl text-center font-semibold">{name || "fake Mentor"}</h1>
        <p className=" text-center text-sm sm:text-base whitespace-nowrap">{title || "Web Developer"}</p>
      </Link>
    </div>
  );
}
