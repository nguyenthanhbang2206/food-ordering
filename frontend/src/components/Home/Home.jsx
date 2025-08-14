import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { addCartItemToCart } from "../State/Cart/Action";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const [popularFoods, setPopularFoods] = useState([]);
  const [latestFoods, setLatestFoods] = useState([]);
  const [foodLoading, setFoodLoading] = useState(false);
  const dispatch = useDispatch();
  const { restaurants, loading, error, favouriteRestaurants } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    dispatch(getAllRestaurant());
    dispatch(getFavouriteRestaurants());
    fetchPopularFoods();
    fetchLatestFoods();
  }, [dispatch]);
  const fetchPopularFoods = async () => {
    setFoodLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8080/api/v1/foods/popular",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPopularFoods(res.data.data || []);
    } catch (err) {
      setPopularFoods([]);
    }
    setFoodLoading(false);
  };

  const fetchLatestFoods = async () => {
    setFoodLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/v1/foods/latest", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLatestFoods(res.data.data || []);
    } catch (err) {
      setLatestFoods([]);
    }
    setFoodLoading(false);
  };

  const handleFavouriteToggle = (restaurantId) => {
    dispatch(addFavouriteRestaurant(restaurantId)); // Toggle yêu thích
  };

  const handleAddToCart = (food) => {
    dispatch(addCartItemToCart(food.id, 1)); // Thêm 1 món vào giỏ
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

      {/* Popular Foods */}
      <section className="max-w-screen-xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold text-[#5A20CB] mb-4">
          Popular Foods
        </h2>
        {foodLoading ? (
          <p>Loading...</p>
        ) : popularFoods.length === 0 ? (
          <p className="text-gray-500 italic">No popular foods found.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {popularFoods.map((food) => (
              <div
                key={food.id}
                className="bg-white rounded-xl shadow p-4 w-[260px] flex flex-col items-center"
              >
                <img
                  src={
                    food.images[0]?.startsWith("http")
                      ? food.images[0]
                      : `http://localhost:8080/images/foods/${food.images[0]}`
                  }
                  alt={food.name}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
                <div className="font-bold text-lg mb-1">{food.name}</div>
                <div className="text-gray-600 text-sm mb-1">
                  {food.description}
                </div>
                <div className="text-[#5A20CB] font-semibold mb-2">
                  ${food.price}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Đã bán: <span className="font-bold">{food.sold}</span>
                </div>
                <button
                  className="bg-[#5A20CB] text-white px-4 py-2 rounded font-semibold hover:bg-[#431a9e] transition"
                  onClick={() => handleAddToCart(food)}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      {/* Latest Foods */}
      <section className="max-w-screen-xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold text-[#5A20CB] mb-4">Newest Foods</h2>
        {foodLoading ? (
          <p>Loading...</p>
        ) : latestFoods.length === 0 ? (
          <p className="text-gray-500 italic">No latest foods found.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {latestFoods.map((food) => (
              <div
                key={food.id}
                className="bg-white rounded-xl shadow p-4 w-[260px] flex flex-col items-center"
              >
                <img
                  src={
                    food.images[0]?.startsWith("http")
                      ? food.images[0]
                      : `http://localhost:8080/images/foods/${food.images[0]}`
                  }
                  alt={food.name}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
                <div className="font-bold text-lg mb-1">{food.name}</div>
                <div className="text-gray-600 text-sm mb-1">
                  {food.description}
                </div>
                <div className="text-[#5A20CB] font-semibold mb-2">
                  ${food.price}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Đã bán: <span className="font-bold">{food.sold}</span>
                </div>
                <button
                  className="bg-[#5A20CB] text-white px-4 py-2 rounded font-semibold hover:bg-[#431a9e] transition"
                  onClick={() => handleAddToCart(food)}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            ))}
          </div>
        )}
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
                  averageRating={restaurant.averageRating}
                  reviewCount={restaurant.reviewCount}
                  onFavouriteToggle={() => handleFavouriteToggle(restaurant.id)}
                />
              </div>
            ))}
        </div>
      </section>
      <footer className="w-full bg-[#5A20CB] text-white mt-16 py-6">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="text-lg font-bold mb-2 md:mb-0">Food Ordering</div>
          <div className="flex gap-4 text-sm">
            <a
              href="https://github.com/nguyenthanhbang2206"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <span>
              <span className="font-semibold">Nguyễn Thanh Bằng</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
