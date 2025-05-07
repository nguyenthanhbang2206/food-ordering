import React from "react";
import { Navbar } from "../components/navbar/Navbar";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { UserProfile } from "../components/Profile/UserProfile";
import { Home } from "../components/Home/Home";
import { RestaurantDetail } from "../components/Restaurant/RestaurantDetail";
import { Cart } from "../components/Cart/Cart";
import { Profile } from "../components/Profile/Profile";
import { Register } from "../components/Auth/Register";
import { Login } from "../components/Auth/Login";
export const CustomerRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />{" "}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myProfile/*" element={<Profile />} />
      </Routes>
    </div>
  );
};
