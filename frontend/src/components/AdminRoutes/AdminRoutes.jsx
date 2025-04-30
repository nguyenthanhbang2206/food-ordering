import React, { useEffect, useState } from "react";
import { Admin } from "../Admin/Admin";
import { CreateRestaurant } from "../Restaurant/CreateRestaurant";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
export const AdminRoutes = () => {
  const {restaurant} = useSelector((store) => store);

  return (
    <div>
      <Routes>
        <Route path="/*" element={restaurant.userRestaurant ? <Admin /> : <CreateRestaurant />} />
      </Routes>
    </div>
  );
};