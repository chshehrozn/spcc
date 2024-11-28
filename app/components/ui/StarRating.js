import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        return index < rating ? (
          <FaStar key={index} className="text-yellow-500" />
        ) : (
          <FaRegStar key={index} className="text-yellow-500" />
        );
      })}
    </div>
  );
};
export default StarRating;
