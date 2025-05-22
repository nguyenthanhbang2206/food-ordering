import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { ShoppingBag } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch } from "react-redux";
import { logout } from "../State/Auth/Action";

const menu = [
  {
    title: "Profile",
    icon: <PersonIcon className="text-blue-500 w-6 h-6" />,
    path: "/myProfile",
  },
  {
    title: "Orders",
    icon: <ShoppingBag className="text-green-500 w-6 h-6" />,
    path: "/myProfile/orders",
  },
  {
    title: "Favorites",
    icon: <FavoriteIcon className="text-red-500" />,
    path: "/myProfile/favorites",
  },
  {
    title: "Logout",
    icon: <LogoutIcon className="text-gray-500" />,
    path: "/logout",
  },
];

export const ProfileNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (path) => {
    if (path === "/logout") {
      // Xử lý logic logout tại đây (nếu cần)
     dispatch(logout());
     navigate("/login") // Giả sử bạn có một action logoutUser để xử lý đăng xuất
    }
    navigate(path);
  };

  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Profile Navigation</h2>
      <ul className="space-y-4">
        {menu.map((item, index) => (
          <li
            key={index}
            onClick={() => handleNavigation(item.path)}
            className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <div>{item.icon}</div>
            <span className="text-lg font-medium">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
