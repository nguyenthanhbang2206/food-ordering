import React from "react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Dashboard", path: "/admin/restaurant/dashboard" },
    { title: "Orders", path: "/admin/restaurant/orders" },
    { title: "Ingredients", path: "/admin/restaurant/ingredients" },
    { title: "Food Categories", path: "/admin/restaurant/food-categories" },
    { title: "Food", path: "/admin/restaurant/food" },
    { title: "Restaurant Details", path: "/admin/restaurant/details" },
    { title: "Logout", path: "/logout" },
  ];

  const handleNavigation = (path) => {
    if (path === "/logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4">Admin Panel</h2>
      <ul className="space-y-4 p-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => handleNavigation(item.path)}
            className="cursor-pointer hover:bg-gray-700 p-2 rounded"
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};