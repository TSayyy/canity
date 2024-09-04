import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export const RatingStars = ({ rating }: { rating: number }) => {
  if (rating > 5) return null;
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < rating;
        return isFilled ? (
          <FaStar key={i} className="text-yellow-500 text-xl" />
        ) : (
          <FaRegStar key={i} className="text-xl" />
        );
      })}
    </div>
  );
};
