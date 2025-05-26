import React, { useEffect } from "react";
import "./Home.css";
import { MultiCarousel } from "./MultiCarousel";
import { RestaurantCard } from "../Restaurant/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavouriteRestaurant,
  getAllRestaurant,
  getFavouriteRestaurants,
} from "../State/Restaurant/Action";
import { isPresentInFavorites } from "../../config/api";

export const Home = () => {
  const dispatch = useDispatch();
  const { restaurants, loading, error, favouriteRestaurants } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    dispatch(getAllRestaurant());
    dispatch(getFavouriteRestaurants());
  }, [dispatch]);

  const handleFavouriteToggle = (restaurantId) => {
    dispatch(addFavouriteRestaurant(restaurantId)); // Toggle yêu thích
  };

  return (
    <div className="bg-gradient-to-b from-[#5A20CB] to-[#f3e8ff] min-h-screen">
      {/* Banner */}
      <section className="banner relative flex flex-col items-center justify-center h-[350px] md:h-[420px]">
        <img
          src="/banner-food.jpg"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover rounded-b-3xl shadow-lg"
          style={{ zIndex: 1, opacity: 0.85 }}
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-60 rounded-b-3xl"
          style={{ zIndex: 2 }}
        ></div>
        <div className="relative z-10 text-center mt-10">
          <p className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            Welcome to <span className="text-yellow-300">Food Ordering</span>
          </p>
          <p className="mt-4 text-lg md:text-2xl text-white font-medium">
            Discover, order, and enjoy your favorite meals from the best
            restaurants!
          </p>
        </div>
      </section>

      {/* Top Meals */}
      <section className="flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-center mt-10">Top Meals</p>
        <MultiCarousel />
      </section>
      {/* Favourites */}
      <section className="flex flex-col items-center justify-center mt-16">
        <h1 className="text-4xl font-bold text-center text-[#5A20CB] mb-2 drop-shadow">
          Order from our favourites
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Hand-picked restaurants loved by our community
        </p>
        <div className="flex flex-wrap gap-8 justify-center items-center">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading &&
            restaurants &&
            restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="transition-transform duration-200 hover:scale-105"
              >
                <RestaurantCard
                  id={restaurant.id}
                  name={restaurant.name}
                  isOpen={restaurant.open}
                  image={restaurant.images[0]}
                  isFavorite={isPresentInFavorites(
                    favouriteRestaurants,
                    restaurant
                  )}
                  description={restaurant.description}
                  onFavouriteToggle={() => handleFavouriteToggle(restaurant.id)}
                />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
