import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { CustomerRoutes } from "./Routes/CustomerRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "./components/State/Auth/Action";
import { Routers } from "./components/Routers/Routers";
import { getMyRestaurant } from "./components/State/Restaurant/Action";
function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getProfile(token)); // Gọi API để lấy thông tin người dùng
    }
  }, [dispatch, token, user]);
  // useEffect(() => {
    
  //     dispatch(getMyRestaurant()); // Gọi API để lấy thông tin người dùng
    
  // }, [user]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}

export default App;
