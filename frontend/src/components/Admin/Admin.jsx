import React from "react";
import { Sidebar } from "./Sidebar";
import { Outlet, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Orders } from "./Orders";
import { Ingredients } from "./Ingredients";
import { FoodCategories } from "./FoodCategories";
import { Food } from "./Food";
import { RestaurantDetails } from "./RestaurantDetails";

export const Admin = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="food-categories" element={<FoodCategories />} />
          <Route path="food" element={<Food />} />
          <Route path="details" element={<RestaurantDetails />} />
        </Routes>
      </div>
    </div>
  );
};
