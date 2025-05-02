import React, { useEffect } from "react";
import "./Home.css";
import { MultiCarousel } from "./MultiCarousel";
import { RestaurantCard } from "../Restaurant/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurant } from "../State/Restaurant/Action";

export const Home = () => {
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    dispatch(getAllRestaurant()); // Gọi API để lấy danh sách nhà hàng
  }, [dispatch]);

  return (
    <div>
      <section className="banner relative flex flex-col items-center justify-center mt-10">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-4xl font-bold text-white">
            Welcome to Our Website
          </p>
          <p className="z-10 font-bold text-white">
            Taste the convenience: Food, Fast, and Delivered
          </p>
        </div>
        <div className="cover absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      </section>

      <section className="flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-center mt-10">Top Meals</p>
        <MultiCarousel />
      </section>

      <section className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold text-center">
          Order from our favourites
        </h1>
        <div className="flex flex-wrap justify-around mt-10 items-center">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading &&
            restaurants &&
            restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                name={restaurant.name}
                image={restaurant.images[0]}
                description={restaurant.description}
              />
            ))}
        </div>
      </section>
    </div>
  );
};
