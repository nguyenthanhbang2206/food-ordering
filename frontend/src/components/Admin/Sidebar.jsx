import React, { Profiler, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person"; 

export const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { title: "Dashboard", path: "/admin/restaurant/dashboard", icon: <DashboardIcon /> },
    { title: "Orders", path: "/admin/restaurant/orders", icon: <ListAltIcon /> },
    { title: "Ingredients", path: "/admin/restaurant/ingredients", icon: <RestaurantMenuIcon /> },
    { title: "Food Categories", path: "/admin/restaurant/food-categories", icon: <CategoryIcon /> },
    { title: "Food", path: "/admin/restaurant/food", icon: <FastfoodIcon /> },
    { title: "Restaurant Details", path: "/admin/restaurant/details", icon: <InfoIcon /> },
    { title: "Homepage", path: "/", icon: <HomeIcon /> },
        { title: "Profile", path: "/myProfile", icon:  <PersonIcon /> },
    { title: "Logout", path: "/logout", icon: <LogoutIcon /> },
  ];

  const handleNavigation = (path) => {
    if (path === "/logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      navigate(path);
    }
    setOpen(false); // Đóng sidebar khi chọn menu trên mobile
  };

  return (
    <>
      {/* Nút mở sidebar trên mobile */}
      <button
        className="fixed top-4 left-4 z-50 bg-[#5A20CB] text-white p-2 rounded shadow sm:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        ☰
      </button>
      {/* Overlay khi mở sidebar trên mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#5A20CB] to-[#2d1068] text-white flex flex-col z-50
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          sm:relative sm:translate-x-0 sm:flex
          shadow-2xl
        `}
        style={{ minHeight: "100vh" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
            <FastfoodIcon sx={{ fontSize: 28 }} />
            Admin Panel
          </h2>
          {/* Nút đóng sidebar trên mobile */}
          <button
            className="sm:hidden text-white text-2xl"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>
        <ul className="space-y-2 p-4 flex-1">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`
                cursor-pointer flex items-center gap-3 p-3 rounded-lg
                transition-colors duration-150
                hover:bg-white/10 hover:pl-6
                active:bg-white/20
                font-medium
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
        
      </div>
    </>
  );
};