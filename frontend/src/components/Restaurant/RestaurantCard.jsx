import React from "react";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

export const RestaurantCard = ({
  id,
  name,
  image,
  description,
  isOpen,
  isFavorite,
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
        <img
          className="w-full h-full object-cover"
          src={`http://localhost:8080/images/restaurants/${image}`}
          alt={name}
        />
        <Chip
          color={isOpen ? "success" : "error"}
          label={isOpen ? "Open" : "Closed"}
          size="small"
          className="absolute top-2 left-2"
        />
      </div>
      <div className="mt-3 px-2">
        <p className="font-semibold text-lg">{name}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <div className="flex justify-center">
        <IconButton>
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
    </Card>
  );
};