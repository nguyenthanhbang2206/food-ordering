import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RestaurantCard } from "../Restaurant/RestaurantCard";
import { addFavouriteRestaurant } from "../State/Restaurant/Action";
import { isPresentInFavorites } from "../../config/api";

const SearchPage = () => {
  const dispatch = useDispatch();
  // Lấy kết quả tìm kiếm từ searchResults, fallback về restaurants nếu chưa có
  const { searchResults, favouriteRestaurants, loading, error } = useSelector(
    (state) => state.restaurant
  );

  const handleFavouriteToggle = (restaurantId) => {
    dispatch(addFavouriteRestaurant(restaurantId));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Search Results</h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && (!searchResults || searchResults.length === 0) && (
        <p className="text-center text-gray-500">No restaurants found.</p>
      )}
      <div className="flex flex-wrap gap-6 justify-center">
        {searchResults &&
          searchResults.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              isOpen={restaurant.open}
              image={restaurant.images?.[0]}
              isFavorite={isPresentInFavorites(
                favouriteRestaurants,
                restaurant
              )}
              description={restaurant.description}
              onFavouriteToggle={() => handleFavouriteToggle(restaurant.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
