import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavouriteRestaurants,
  addFavouriteRestaurant,
} from "../State/Restaurant/Action";
import { RestaurantCard } from "../Restaurant/RestaurantCard";

export const Favorite = () => {
  const dispatch = useDispatch();
  const { favouriteRestaurants, loading, error } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    dispatch(getFavouriteRestaurants());
  }, [dispatch]);

  const handleFavouriteToggle = (restaurantId) => {
    dispatch(addFavouriteRestaurant(restaurantId)); // Toggle trạng thái yêu thích
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-4xl font-bold text-center mb-6">Your Favourites</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="flex flex-wrap justify-around mt-10 items-center">
        {!loading &&
          favouriteRestaurants &&
          favouriteRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              isOpen={restaurant.open}
              image={restaurant.images[0]}
              description={restaurant.description}
              isFavorite={true}
              averageRating={restaurant.averageRating}
              reviewCount={restaurant.reviewCount}
              onFavouriteToggle={() => handleFavouriteToggle(restaurant.id)}
            />
          ))}
      </div>
    </div>
  );
};
