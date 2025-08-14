import React, { useEffect, useState } from "react";
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
import { Button, InputBase, Paper } from "@mui/material";
import { searchRestaurants } from "../State/Restaurant/Action";

export const Navbar = () => {
  const { auth } = useSelector((store) => store);
  const { cart } = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (auth.user) {
      dispatch(getCartByUserLogin());
    }
  }, [auth.user, dispatch]);

  const handleAvatarClick = () => {
    navigate("/myProfile");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleAdminClick = () => {
    navigate("/admin/restaurant/dashboard");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      dispatch(searchRestaurants(searchValue.trim()));
      setShowSearch(false);
      setSearchValue("");
      navigate("/search");
    }
  };

  const handleOrdersClick = () => {
    navigate("/myProfile/orders");
  };

  const handleFavouritesClick = () => {
    navigate("/myProfile/favorites");
  };

  return (
    <div className="px-5 z-50 py-[.8rem] bg-[#5A20CB] lg:px-20 flex justify-between">
      {/* Logo */}
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          onClick={() => navigate("/")}
          className="text-white text-2xl logo font-semibold"
        >
          Nguyễn Thanh Bằng
        </li>
      </div>

      {/* Navbar Actions */}
      <div className="flex items-center space-x-2 lg:space-x-10">
        {/* Search Icon & Input */}
        <div>
          <IconButton onClick={() => setShowSearch((prev) => !prev)}>
            <SearchIcon sx={{ fontSize: 30, color: "white" }} />
          </IconButton>
          {showSearch && (
            <Paper
              component="form"
              onSubmit={handleSearch}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                position: "absolute",
                top: "60px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 100,
                width: 300,
              }}
              elevation={4}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search restaurants…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                autoFocus
              />
              <IconButton type="submit" sx={{ p: "10px" }}>
                <SearchIcon />
              </IconButton>
            </Paper>
          )}
        </div>

        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={handleOrdersClick}
          className="!bg-green-500 hover:!bg-green-600 text-white font-semibold"
          sx={{ minWidth: 0, px: 2, py: 1, borderRadius: 2 }}
        >
          Orders
        </Button>
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={handleFavouritesClick}
          className="!bg-yellow-400 hover:!bg-yellow-500 text-white font-semibold"
          sx={{ minWidth: 0, px: 2, py: 1, borderRadius: 2 }}
        >
          Favourites
        </Button>

        {/* Nếu user là RESTAURANT_OWNER thì hiện nút Admin */}
        {auth.user?.role === "RESTAURANT_OWNER" && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleAdminClick}
            className="!bg-yellow-500 hover:!bg-yellow-600 text-white font-semibold"
            sx={{ minWidth: 0, px: 2, py: 1, borderRadius: 2 }}
          >
            Admin
          </Button>
        )}
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
              badgeContent={auth.user ? cart?.sum || 0 : 0} // Nếu chưa đăng nhập thì luôn là 0
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
