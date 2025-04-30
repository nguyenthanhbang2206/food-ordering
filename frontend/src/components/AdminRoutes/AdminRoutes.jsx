import React, { useEffect, useState } from "react";
import { Admin } from "../Admin/Admin";
import { CreateRestaurant } from "../Restaurant/CreateRestaurant";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

export const AdminRoutes = () => {
  const [restaurantExists, setRestaurantExists] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/v1/admin/my-restaurant", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRestaurantExists(response.data.data);
      } catch (error) {
        setRestaurantExists(false);
      }
    };
    fetchRestaurant();
  }, []);

  if (restaurantExists === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route path="/*" element={restaurantExists ? <Admin /> : <CreateRestaurant />} />
      </Routes>
    </div>
  );
};