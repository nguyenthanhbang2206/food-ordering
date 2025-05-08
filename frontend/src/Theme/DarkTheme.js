import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#5A20CB",
        },
        secondary: {
            main: "#E6E6FA",
        },
        background: {
            main: "#E6E6FA",
            default: "#E6E6FA",
            paper: "#E6E6FA",
        },
        textColor: {
            main: "#000000",
        },
    },
});