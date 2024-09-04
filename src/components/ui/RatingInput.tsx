import { useState } from "react";
import { HiStar } from "react-icons/hi2";

type StarsRatingProps = {
  onSetRating: (rating: number) => void;
  maxRating?: number;
  size?: number;
  color?: string;
  className?: string;
  rating: number;
};

export function RatingInput({ onSetRating, maxRating = 5, size = 30, className = "", rating = 0 }: StarsRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  function handleHover(rating: number) {
    setHoverRating(rating);
  }

  function handleRating(rating: number) {
    if (onSetRating) onSetRating(rating);
  }

  return (
    <div className={" flex justify-start flex-wrap items-center gap-4" + className}>
      <div className="flex gap-1">
        {Array.from({ length: maxRating }, (_, i) => (
          <HiStar
            key={i}
            className={`transition-colors duration-150 cursor-pointer ${(hoverRating ? hoverRating >= i + 1 : rating >= i + 1) ? `text-[#DD8809]` : `text-gray-400`}`}
            onClick={() => handleRating(i + 1)}
            size={size}
            onMouseEnter={() => handleHover(i + 1)}
            onMouseLeave={() => handleHover(0)}
          />
        ))}
      </div>
      <p className="text-gray-500 whitespace-nowrap">({hoverRating || rating || "0"} stars)</p>
    </div>
  );
}
