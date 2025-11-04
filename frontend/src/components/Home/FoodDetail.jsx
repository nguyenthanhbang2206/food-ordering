import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/api";

export const FoodDetail = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarFoods, setSimilarFoods] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/foods/${foodId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFood(res.data.data);
      } catch (err) {
        setFood(null);
      }
      setLoading(false);
    };
    fetchFood();
  }, [foodId]);

  useEffect(() => {
    const fetchSimilarFoods = async () => {
      setSimilarLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_URL}/food-recommendations/${foodId}/similar`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSimilarFoods(res.data.data || []);
      } catch (err) {
        setSimilarFoods([]);
      }
      setSimilarLoading(false);
    };
    if (foodId) fetchSimilarFoods();
  }, [foodId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">Loading...</div>
      </div>
    );
  if (!food)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center text-red-500">Food not found.</div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#E6E6FA] to-white py-8 px-2">
      <div className="max-w-5xl mx-auto">
        <button
          className="mb-6 text-blue-600 hover:underline"
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button>
        {/* Card chi tiết món ăn */}
        <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row gap-8 p-6 md:p-10 mb-10 items-center md:items-start">
          <img
            src={
              food.images[0]?.startsWith("http")
                ? food.images[0]
                : `${API_URL}/images/foods/${food.images[0]}`
            }
            alt={food.name}
            className="w-full max-w-[320px] h-[220px] md:h-[320px] object-cover rounded-xl shadow"
          />
          <div className="flex-1 w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2563EB] mb-3">
              {food.name}
            </h1>
            <p className="text-gray-700 mb-3 text-base md:text-lg">
              {food.description}
            </p>
            <div className="flex flex-wrap gap-4 mb-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-sm">
                {food.price} đ
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold text-sm">
                Sold: {food.sold}
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold text-sm">
                {food.cuisine}
              </span>
              {food.vegetarian && (
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold text-sm">
                  Vegetarian
                </span>
              )}
              {food.spicy && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold text-sm">
                  Spicy
                </span>
              )}
            </div>
            <div className="mb-2 text-sm text-gray-600">
              <span className="font-semibold">Category:</span>{" "}
              {food.foodCategory?.name || "N/A"}
            </div>
            <div className="mb-2 text-sm text-gray-600">
              <span className="font-semibold">Restaurant:</span>{" "}
              {food.restaurant?.name || "N/A"}
            </div>
            {food.ingredients && food.ingredients.length > 0 && (
              <div className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">Ingredients:</span>{" "}
                {food.ingredients.map((ing) => ing.name).join(", ")}
              </div>
            )}
          </div>
        </div>
        {/* Món ăn tương tự */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#2563EB] mb-6">
            Similar Foods
          </h2>
          {similarLoading ? (
            <p>Loading...</p>
          ) : similarFoods.length === 0 ? (
            <p className="text-gray-500 italic">No similar foods found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {similarFoods.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-xl shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
                  onClick={() => navigate(`/food/${item.id}`)}
                >
                  <img
                    src={
                      item.images[0]?.startsWith("http")
                        ? item.images[0]
                        : `${API_URL}/images/foods/${item.images[0]}`
                    }
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded mb-2"
                  />
                  <div className="font-bold text-lg mb-1 text-center">
                    {item.name}
                  </div>
                  <div className="text-gray-600 text-sm mb-1 text-center line-clamp-2">
                    {item.description}
                  </div>
                  <div className="text-[#2563EB] font-semibold mb-2">
                    {item.price} đ
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Sold: <span className="font-bold">{item.sold}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
