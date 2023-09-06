import axios from "axios";
import { createContext, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const fetchUser = async () => {
    if (!Cookies.get("user")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.status === 200) {
          const userData = await response.json();
          Cookies.set("user", userData, { secure: true, sameSite: "strict" });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const login = async (email, password) => {
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          fetchUser();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const value = {
    login,
    fetchUser,
    useAuth,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
