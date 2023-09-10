import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState();
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/user/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(true);
        if (res.status === 200) {
          setUsers(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message);
      });
  };

  const createUser = async (body) => {
    await axios
      .post(`${import.meta.env.VITE_API_URL}/user`, body, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          getAllUsers();
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message);
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
  };

  const updateUser = async (userId, body) => {
    await axios
      .put(`${import.meta.env.VITE_API_URL}/user/${userId}`, body, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          if (userId === JSON.parse(Cookies.get("user")).id) {
            Cookies.set("user", JSON.stringify(body));
          }

          toast.success(res.data.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message);
      });
  };

  const deleteUser = async (userId) => {
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/user/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          getAllUsers();
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message);
      });
  };

  const value = {
    users,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    apiError,
    isLoading,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
