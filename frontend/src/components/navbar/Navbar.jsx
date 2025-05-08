import React, { useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { pink } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Person from "@mui/icons-material/Person";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartByUserLogin } from "../State/Cart/Action";

export const Navbar = () => {
  const { auth } = useSelector((store) => store);
  const { cart } = useSelector((store) => store.cart); // Lấy thông tin giỏ hàng từ Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      dispatch(getCartByUserLogin()); // Gọi API lấy thông tin giỏ hàng khi người dùng đã đăng nhập
    }
  }, [auth.user, dispatch]);

  const handleAvatarClick = () => {
    navigate("/myProfile");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <div className="px-5 z-50 py-[.8rem] bg-[#5A20CB] lg:px-20 flex justify-between">
      {/* Logo */}
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          onClick={() => navigate("/")}
          className="text-white text-2xl logo font-semibold"
        >
          Logo
        </li>
      </div>

      {/* Navbar Actions */}
      <div className="flex items-center space-x-2 lg:space-x-10">
        {/* Search Icon */}
        <div>
          <IconButton>
            <SearchIcon sx={{ fontSize: 30, color: "white" }} />
          </IconButton>
        </div>

        {/* User Avatar or Login Icon */}
        <div>
          {auth.user ? (
            <Avatar
              onClick={handleAvatarClick}
              sx={{
                width: 40,
                height: 40,
                bgcolor: "white",
                color: pink.A400,
                cursor: "pointer",
              }}
              src=""
            >
              {auth.user?.fullName?.[0]?.toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/login")}>
              <Person sx={{ fontSize: 30, color: "white" }} />
            </IconButton>
          )}
        </div>

        {/* Shopping Cart Icon */}
        <div>
          <IconButton>
            <Badge
              onClick={handleCartClick}
              badgeContent={cart?.sum || 0} // Hiển thị số lượng cartItem từ thuộc tính sum
              color="primary"
            >
              <ShoppingCartIcon sx={{ fontSize: 30, color: "white" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  );
};
