import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import ErrorPage from "./pages/error";
import Home from "./pages/home";

const router = createBrowserRouter(
  // createRoutesFromElements(
  //   <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
  //   <Route path="/login" element={<LoginPage />} />
  // )

  [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
  ]
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
