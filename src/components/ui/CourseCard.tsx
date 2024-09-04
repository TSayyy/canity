import { HiStar } from "react-icons/hi2";
import { IoPlayCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

import { useWishlist } from "@/hooks/useWishlist";
import { formatCurrency } from "@/utils/helpers";

import { Tag } from "./Tag";
import { WishListButton } from "./WishListButton";

type CourseCardProps = {
  id: string;
  name: string;
  image?: string | undefined;
  rate: number;
  level: string;
  duration: number;
  price: number;
  track: string;
  trackId: string;
  description: string;
  className?: string;
};

export default function CourseCard({
  name,
  track,
  duration,
  level,
  rate,
  image,
  price,
  id,
  trackId,
  description,
  className,
}: CourseCardProps) {
  const { isLoading, wishlistIds } = useWishlist();
  const isWishListed = wishlistIds?.includes(id);
  return (
    <div className={"text-black flex flex-col rounded-lg shadow-lg overflow-hidden border-2 grow " + className}>
      <div className=" bg-[#B7B9C3] relative overflow-hidden aspect-video">
        <img src={image} className=" object-cover h-full w-full" alt={`${name} image`} loading="lazy" />
        <Link
          to={`/course/${id}`}
          className=" absolute inset-0 z-10 bg-black/50 hover:opacity-100 flex justify-center items-center transition-all opacity-0 "
        >
          {!isLoading && (
            <WishListButton
              className="absolute top-2 right-2 text-sm shadow-custom"
              courseId={id}
              isWishListed={isWishListed}
            />
          )}

          <IoPlayCircleSharp className="text-white" size={50} />
        </Link>
      </div>
      <div className=" px-3 py-4 md:p-6 bg-white flex flex-col justify-between grow gap-2">
        <Link to={`/track/${trackId}`} className=" text-royal-blue font-semibold w-fit hover:underline">
          {track}
        </Link>
        <Link to={`/course/${id}`} className="text-lg font-semibold w-fit">
          {name}
        </Link>
        <p className=" text-neutral-gray text-sm grow ">
          {description.length > 100 ? description.slice(0, 100) + "..." : description}
        </p>
        <footer className="flex flex-wrap text-sm md:text-base justify-start gap-2 item-center">
          <Tag>
            {rate.toFixed(1)} <HiStar className="text-yellow-500" size={18} />
          </Tag>
          <Tag>{level}</Tag>
          <Tag>{duration} hrs</Tag>
          <Tag>{formatCurrency(price)}</Tag>
        </footer>
      </div>
    </div>
  );
}
