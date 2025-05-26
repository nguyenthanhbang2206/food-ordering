import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRestaurantStatistics } from "../State/Restaurant/Action";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { statistics, loading, error } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(getRestaurantStatistics());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-700">Restaurant Dashboard</h1>
      {loading && <p className="text-center text-gray-500">Loading statistics...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {statistics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <span className="text-5xl text-blue-500 mb-2">
              <i className="fas fa-utensils"></i>
            </span>
            <p className="text-2xl font-semibold text-gray-700">Total Foods</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{statistics.totalFoods}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <span className="text-5xl text-green-500 mb-2">
              <i className="fas fa-receipt"></i>
            </span>
            <p className="text-2xl font-semibold text-gray-700">Total Orders</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{statistics.totalOrders}</p>
          </div>
        </div>
      )}
    </div>
  );
};