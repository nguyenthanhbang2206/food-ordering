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
import { API_URL, isPresentInFavorites } from "../../config/api";
import axios from "axios";
import { addCartItemToCart } from "../State/Cart/Action";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
export const Home = () => {
  const [popularFoods, setPopularFoods] = useState([]);
  const [latestFoods, setLatestFoods] = useState([]);
  const [foodLoading, setFoodLoading] = useState(false);
  const [forYouFoods, setForYouFoods] = useState([]); // Thêm state mới
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const dispatch = useDispatch();
  const { restaurants, loading, error, favouriteRestaurants } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    dispatch(getAllRestaurant());
    dispatch(getFavouriteRestaurants());
    fetchPopularFoods();
    fetchLatestFoods();
    fetchForYouFoods();
  }, [dispatch]);
  const fetchForYouFoods = async () => {
    setFoodLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/food-recommendations/for-you`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setForYouFoods(res.data.data || []);
    } catch (err) {
      setForYouFoods([]);
    }
    setFoodLoading(false);
  };

  const fetchPopularFoods = async () => {
    setFoodLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/foods/popular`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const res = await axios.get(`${API_URL}/foods/latest`, {
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

  const handleAddToCart = async (food) => {
    try {
      await dispatch(addCartItemToCart(food.id, 1));
      setSnackbar({
        open: true,
        message: "Thêm vào giỏ hàng thành công!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Lỗi!",
        severity: "error",
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#2563EB] to-[#f3e8ff] min-h-screen">
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
      <section className="max-w-screen-xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold text-[#A3E635] mb-4">
          Recommended For You
        </h2>
        {foodLoading ? (
          <p>Loading...</p>
        ) : forYouFoods.length === 0 ? (
          <p className="text-gray-500 italic">No recommendations found.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {forYouFoods.map((food) => (
              <div
                key={food.id}
                className="bg-white rounded-xl shadow p-4 w-[260px] flex flex-col items-center cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/food/${food.id}`)}
              >
                <img
                  src={
                    food.images[0]?.startsWith("http")
                      ? food.images[0]
                      : `${API_URL}/images/foods/${food.images[0]}`
                  }
                  alt={food.name}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
                <div className="font-bold text-lg mb-1">{food.name}</div>
                <div className="text-gray-600 text-sm mb-1">
                  {food.description}
                </div>
                <div className="text-[#2563EB] font-semibold mb-2">
                  {food.price} đ
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Đã bán: <span className="font-bold">{food.sold}</span>
                </div>
                <button
                  className="bg-[#2563EB] text-white px-4 py-2 rounded font-semibold hover:bg-[#431a9e] transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(food);
                  }}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Popular Foods */}
      <section className="max-w-screen-xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold text-[#A3E635] mb-4">
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
                className="bg-white rounded-xl shadow p-4 w-[260px] flex flex-col items-center cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/food/${food.id}`)} // navigate on card click
              >
                <img
                  src={
                    food.images[0]?.startsWith("http")
                      ? food.images[0]
                      : `${API_URL}/images/foods/${food.images[0]}`
                  }
                  alt={food.name}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
                <div className="font-bold text-lg mb-1">{food.name}</div>
                <div className="text-gray-600 text-sm mb-1">
                  {food.description}
                </div>
                <div className="text-[#2563EB] font-semibold mb-2">
                  {food.price}đ
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Đã bán: <span className="font-bold">{food.sold}</span>
                </div>
                <button
                  className="bg-[#2563EB] text-white px-4 py-2 rounded font-semibold hover:bg-[#431a9e] transition"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card navigation
                    handleAddToCart(food);
                  }}
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
        <h2 className="text-2xl font-bold text-[#A3E635] mb-4">Newest Foods</h2>
        {foodLoading ? (
          <p>Loading...</p>
        ) : latestFoods.length === 0 ? (
          <p className="text-gray-500 italic">No latest foods found.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {latestFoods.map((food) => (
              <div
                key={food.id}
                className="bg-white rounded-xl shadow p-4 w-[260px] flex flex-col items-center cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/food/${food.id}`)} // navigate on card click
              >
                <img
                  src={
                    food.images[0]?.startsWith("http")
                      ? food.images[0]
                      : `${API_URL}/images/foods/${food.images[0]}`
                  }
                  alt={food.name}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
                <div className="font-bold text-lg mb-1">{food.name}</div>
                <div className="text-gray-600 text-sm mb-1">
                  {food.description}
                </div>
                <div className="text-[#2563EB] font-semibold mb-2">
                  {food.price} đ
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Đã bán: <span className="font-bold">{food.sold}</span>
                </div>
                <button
                  className="bg-[#2563EB] text-white px-4 py-2 rounded font-semibold hover:bg-[#431a9e] transition"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card navigation
                    handleAddToCart(food);
                  }}
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
        <h1 className="text-4xl font-bold text-center text-[#2563EB] mb-2 drop-shadow">
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
      <footer className="w-full bg-[#2563EB] text-white mt-16 py-6">
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
      <button
        onClick={() => navigate("/ai/chat")}
        className="fixed bottom-8 right-8 z-50 bg-[#2563EB] hover:bg-[#431a9e] text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center transition"
        title="Chat with AI"
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#fff" opacity="0.15" />
          <path
            d="M12 2C6.48 2 2 5.92 2 10.5c0 2.13 1.17 4.05 3.09 5.41-.13.47-.5 1.73-.57 1.99-.09.34.13.68.48.68.11 0 .23-.03.34-.1.29-.17 1.7-1.07 2.4-1.51.7.19 1.44.3 2.26.3 5.52 0 10-3.92 10-8.5S17.52 2 12 2z"
            fill="#fff"
          />
          <circle cx="9" cy="10" r="1" fill="#2563EB" />
          <circle cx="15" cy="10" r="1" fill="#2563EB" />
          <path
            d="M9.5 13c.5.67 1.5 1 2.5 1s2-.33 2.5-1"
            stroke="#2563EB"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
