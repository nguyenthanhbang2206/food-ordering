import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#1976d2", // #e91e63
        },
        secondary: {
            main: "#dc004e", // #5A20CB
        },
        black: {
            main: "#0D0D0D",
        },
        background: {
            main: "#0000000",
            default: "#0D0D0D",
            paper: "#0D0D0D",
        },
        textColor: {
            main: "#111111",
        },
    },
});