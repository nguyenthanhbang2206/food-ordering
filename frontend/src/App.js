import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { CustomerRoutes } from "./Routes/CustomerRoutes";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* <Navbar /> */}
      {/* <Home /> */}
      {/* <RestaurantDetail /> */}
      {/* <Cart /> */}
      <CustomerRoutes></CustomerRoutes>
    </ThemeProvider>
  );
}

export default App;
