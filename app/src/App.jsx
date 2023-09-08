import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RootLayout from "./layouts/RootLayout";
import { AuthProvider } from "./contexts/AuthContext";
import UsersManagementPage from "./pages/UsersManagementPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Cookies from "js-cookie";
import NotFoundPage from "./pages/NotFoundPage";
import MyInformationsPage from "./pages/MyInformationsPage";

function App() {
  const user = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : undefined;

  console.log(user);

  return (
    <BrowserRouter>
      <main>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isAllowed={
                    !!user && (user.role === "admin" || user.role === "member")
                  }
                >
                  <RootLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/home" element={<HomePage />} />
              <Route path="/my-informations" element={<MyInformationsPage />} />
              <Route
                path="users-management"
                element={
                  <ProtectedRoute
                    redirectPath="/home"
                    isAllowed={!!user && user.role === "admin"}
                  >
                    <UsersManagementPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<LoginPage user={user} />} />
          </Routes>
        </AuthProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
