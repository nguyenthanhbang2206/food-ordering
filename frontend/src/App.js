import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { getProfile, logout } from "./components/State/Auth/Action";
import { getMyRestaurant } from "./components/State/Restaurant/Action";
import { darkTheme } from "./Theme/DarkTheme";
import { Routers } from "./components/Routers/Routers";
import { setOnUnauthorizedCallback, getTokenExpiration } from "./config/api";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.auth);

  // Lấy profile user nếu đã có token nhưng chưa có user info
  useEffect(() => {
    if (token && !user) {
      dispatch(getProfile(token));
    }
  }, [dispatch, token, user]);

  // Lấy danh sách nhà hàng khi user có dữ liệu
  useEffect(() => {
    if (user) {
      dispatch(getMyRestaurant());
    }
  }, [user]);

  // Đăng ký callback khi bị lỗi 401
  useEffect(() => {
    setOnUnauthorizedCallback(() => {
      dispatch(logout());
      navigate("/login");
    });
  }, [navigate]);

  // Kiểm tra token hết hạn và tự động logout
  useEffect(() => {
    if (!token) return;

    const exp = getTokenExpiration(token);
    if (!exp) return; // Token không hợp lệ hoặc không có exp

    const now = Math.floor(Date.now() / 1000); // thời gian hiện tại tính bằng giây

    if (exp < now) {
      // Token đã hết hạn => logout ngay
      dispatch(logout());
      navigate("/login");
    } else {
      // Tính thời gian còn lại token sống
      const timeout = (exp - now) * 1000; // ms
      // Đặt timeout tự động logout khi token hết hạn
      const timerId = setTimeout(() => {
        dispatch(logout());
        navigate("/login");
      }, timeout);

      return () => clearTimeout(timerId); // cleanup khi component unmount hoặc token thay đổi
    }
  }, [token, navigate]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}

export default App;
