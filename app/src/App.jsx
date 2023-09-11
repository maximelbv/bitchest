import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RootLayout from "./layouts/RootLayout";
import { AuthProvider } from "./hooks/useAuth";
import UsersManagementPage from "./pages/UsersManagementPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Cookies from "js-cookie";
import NotFoundPage from "./pages/NotFoundPage";
import MyInformationsPage from "./pages/MyInformationsPage";
import { UserProvider } from "./hooks/useUser";
import { ToastContainer } from "react-toastify";
import { CurrencyProvider } from "./hooks/useCurrency";

function App() {
  const user = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : undefined;

  return (
    <BrowserRouter>
      <main>
        <AuthProvider>
          <UserProvider>
            <CurrencyProvider>
              <ToastContainer
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />

              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute
                      isAllowed={
                        !!user &&
                        (user.role === "admin" || user.role === "member")
                      }
                    >
                      <RootLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/home" element={<HomePage />} />
                  <Route
                    path="/my-informations"
                    element={<MyInformationsPage />}
                  />
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
              <ToastContainer />
            </CurrencyProvider>
          </UserProvider>
        </AuthProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
