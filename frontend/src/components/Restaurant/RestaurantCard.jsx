import React from "react";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavouriteRestaurant } from "../State/Restaurant/Action";
import StarIcon from "@mui/icons-material/Star";
export const RestaurantCard = ({
  id,
  name,
  image,
  description,
  isOpen,
  isFavorite,
  onFavouriteToggle,
  averageRating,
  reviewCount,
}) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (isOpen) {
      navigate(`/restaurant/${id}`);
    }
  };
  return (
    <Card
      className={`m-5 p-2 bg-gray-900 text-white ${
        isOpen ? "cursor-pointer hover:shadow-lg" : "opacity-50"
      }`}
      onClick={handleCardClick}
    >
      <div className="w-[300px] h-[200px] rounded-lg overflow-hidden relative">
        <img className="w-full h-full object-cover" src={image} alt={name} />
        <Chip
          color={isOpen ? "success" : "error"}
          label={isOpen ? "Open" : "Closed"}
          size="small"
          className="absolute top-2 left-2"
        />
      </div>
      <div className="mt-3 px-2">
        <p className="font-semibold text-lg">{name}</p>
        {/* Hiển thị average rating và review count */}
        <div className="flex items-center gap-1 mb-1">
          <StarIcon fontSize="small" className="text-yellow-400" />
          <span className="text-sm text-yellow-900 font-semibold">
            {typeof averageRating === "number"
              ? averageRating.toFixed(1)
              : "0.0"}
          </span>
          <span className="text-xs text-gray-400 ml-2">
            ({reviewCount || 0} đánh giá)
          </span>
        </div>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <div className="flex justify-center">
        <IconButton
          className="favourite-button"
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện nổi bọt lên Card
            onFavouriteToggle();
          }}
        >
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
    </Card>
  );
};
