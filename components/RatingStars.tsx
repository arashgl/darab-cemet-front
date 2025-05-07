import { FaStar, FaRegStar } from "react-icons/fa";

interface RatingStarsProps {
  rating: number;
}

export default function RatingStars({ rating }: RatingStarsProps) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= Math.round(rating) ? (
          <FaStar key={star} className="text-yellow-500" />
        ) : (
          <FaRegStar key={star} className="text-gray-300" />
        )
      )}
    </div>
  );
}
