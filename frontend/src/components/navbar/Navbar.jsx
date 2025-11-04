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
 const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="px-5 z-50 py-[.8rem] bg-[#2563EB] lg:px-20 flex justify-between items-center relative">
      {/* Logo */}
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          onClick={() => navigate("/")}
          className="text-white text-2xl logo font-semibold"
        >
          Nguyễn Thanh Bằng
        </li>
      </div>

      {/* Hamburger menu icon on mobile */}
      <div className="lg:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <rect y="4" width="24" height="2" rx="1" fill="currentColor" />
            <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
            <rect y="18" width="24" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Navbar Actions */}
       {auth.user && (
      <div
        className={`
          flex-col lg:flex-row flex items-center space-y-4 lg:space-y-0 space-x-0 lg:space-x-6
          absolute lg:static top-full left-0 w-full lg:w-auto bg-[#2563EB] lg:bg-transparent
          transition-all duration-300 z-40
          ${menuOpen ? "flex" : "hidden lg:flex"}
        `}
      >
        {/* Search Icon & Input */}
        <div className="mb-2 lg:mb-0">
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
          className="!bg-green-500 hover:!bg-green-600 text-white font-semibold w-full lg:w-auto"
          sx={{ minWidth: 0, px: 2, py: 1, borderRadius: 2 }}
        >
          Orders
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigate("/foods")}
          className="!bg-[#2563EB] hover:!bg-[#431a9e] text-white font-semibold w-full lg:w-auto"
          sx={{ minWidth: 0, px: 2, py: 1, borderRadius: 2 }}
        >
          All Foods
        </Button>
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={handleFavouritesClick}
          className="!bg-yellow-400 hover:!bg-yellow-500 text-white font-semibold w-full lg:w-auto"
          sx={{ minWidth: 0, px: 2, py: 1, borderRadius: 2 }}
        >
          Favourites
        </Button>

        {auth.user?.role === "RESTAURANT_OWNER" && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleAdminClick}
            className="!bg-yellow-500 hover:!bg-yellow-600 text-white font-semibold w-full lg:w-auto"
            sx={{ minWidth: 0, px: 2, py: 1, borderRadius: 2 }}
          >
            Admin
          </Button>
        )}

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

        <div>
          <IconButton>
            <Badge
              onClick={handleCartClick}
              badgeContent={auth.user ? cart?.sum || 0 : 0}
              color="primary"
            >
              <ShoppingCartIcon sx={{ fontSize: 30, color: "white" }} />
            </Badge>
          </IconButton>
        </div>
      </div>)}
    </div>
  );
};