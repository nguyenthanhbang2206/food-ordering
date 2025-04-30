import React from "react";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const RestaurantCard = () => {
  const isOpen = true;
  const isFavorite = true;

  return (
    <Card className="m-5 p-2 bg-gray-900 text-white">
      <div className="w-[300px] h-[200px] rounded-lg overflow-hidden relative">
        <img
          className="w-full h-full object-cover"
          src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ="
          alt="Restaurant"
        />
        <Chip
          color={isOpen ? "success" : "error"}
          label={isOpen ? "Open" : "Closed"}
          size="small"
          className="absolute top-2 left-2"
        />
      </div>
      <div className="mt-3 px-2">
        <p className="font-semibold text-lg">Restaurant Name</p>
        <p>4.5 ⭐</p>
      </div>
      <div className="flex justify-center">
        <IconButton>
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
    </Card>
  );
};
