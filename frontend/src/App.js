import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { CustomerRoutes } from "./Routes/CustomerRoutes";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "./components/State/Auth/Action";

function App() {
  const dispatch = useDispatch();
   const token = localStorage.getItem("token");
   const {auth} = useSelector((store) => store);
   useEffect(() => {
    dispatch(getProfile(auth.token || token));
   }, [auth.token])
  return (
  
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <CustomerRoutes></CustomerRoutes>
    </ThemeProvider>
  );
}

export default App;
