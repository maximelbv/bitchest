import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RootLayout from "./layouts/RootLayout";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <main>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route path="/home" element={<HomePage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
