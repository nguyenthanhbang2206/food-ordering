import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { Home } from "./components/Home/Home";
import { RestaurantDetail } from "./components/Restaurant/RestaurantDetail";
import { Cart } from "./components/Cart/Cart";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      {/* <Home /> */}
      {/* <RestaurantDetail /> */}
      <Cart />
    </ThemeProvider>
  );
}

export default App;
