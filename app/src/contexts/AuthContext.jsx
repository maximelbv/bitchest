import axios from "axios";
import { createContext, useContext, useEffect, useRef } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  let user = useRef(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
  );

  useEffect(() => {
    if (!Cookies.get("user")) {
      fetchUser();
    }
    if (Cookies.get("user")) {
      user.current = JSON.parse(Cookies.get("user"));
    }
  }, []);

  const fetchUser = async () => {
    if (!Cookies.get("user")) {
      await axios
        .get(
          `${import.meta.env.VITE_API_URL}/user`,

          {
            withCredentials: true,
          }
        )
        .then(async (res) => {
          if (res.status === 200) {
            const userData = await res.data;
            Cookies.set("user", JSON.stringify(userData), {
              secure: true,
              sameSite: "strict",
            });
            user.current = JSON.parse(Cookies.get("user"));
          }
        })
        .catch((err) => {
          console.error(err);
        });
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

  const logout = async (email, password) => {
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/logout`,
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          Cookies.remove("user");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const value = {
    user,
    login,
    logout,
    fetchUser,
    useAuth,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
