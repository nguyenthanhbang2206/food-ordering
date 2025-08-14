import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { UserProfile } from "../components/Profile/UserProfile";
import { Home } from "../components/Home/Home";
import { RestaurantDetail } from "../components/Restaurant/RestaurantDetail";
import { Cart } from "../components/Cart/Cart";
import { Profile } from "../components/Profile/Profile";
import { Register } from "../components/Auth/Register";
import { Login } from "../components/Auth/Login";
import { PrivateRoute } from "../components/PrivateRoute";
import SearchPage from "../components/Home/SearchPage";
import { ForgotPassword } from "../components/Auth/ForgotPassword";
import { ResetPassword } from "../components/Auth/ResetPassword";
import { Checkout } from "../components/Cart/Checkout";
import { ThankYou } from "../components/Cart/ThankYou";
export const CustomerRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <SearchPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/restaurant/:id"
          element={
            <PrivateRoute>
              <RestaurantDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout></Checkout>
            </PrivateRoute>
          }
        />
        <Route
          path="/thank-you"
          element={
            <PrivateRoute>
              <ThankYou></ThankYou>
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/myProfile/*"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};
