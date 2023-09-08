import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, createTheme } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomAppBar from "../components/CustomAppBar";
import { useAuth } from "../contexts/AuthContext";

const defaultTheme = createTheme();

export default function RootLayout({ children }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user.current) {
      navigate("/login");
    }
  }, []);

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
            height: "100vh",
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
