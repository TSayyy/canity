import { Link } from "react-router-dom";

type TrackCardProps = {
  title: string;
  image?: string | undefined;
  id: string;
};

export default function TrackCard({ title, image, id }: TrackCardProps) {
  return (
    <Link
      style={{ backgroundImage: `url(${image})` }}
      to={`/track/${id}`}
      className="relative min-w-fit py-3 px-10 bg-cover bg-opacity-20 overflow-hidden rounded-lg"
    >
      <h1 className="text-white text-sm md:text-lg lg:text-xl absolute font-semibold flex justify-center items-center z-10 bg-dark-navy/60 inset-0 opacity-100">
        {title}
      </h1>
      <h1 className="text-sm md:text-lg lg:text-xl font-semibold opacity-0">{title}</h1>
    </Link>
  );
}
