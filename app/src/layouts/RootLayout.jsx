import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import CustomAppBar from "../components/CustomAppBar";

const defaultTheme = createTheme();

export default function RootLayout() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomAppBar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[100],
            flexGrow: 1,
            height: "auto",
            minHeight: "calc(100vh - 64px)",
            marginTop: "64px",
            padding: "1rem",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
