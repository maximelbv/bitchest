import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

const CurrencyContext = createContext();

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function CurrencyProvider(props) {
  const [currencies, setCurrencies] = useState();
  const [transactions, setTransactions] = useState();
  const [wallets, setWallets] = useState();
  const [apiError, setApiError] = useState(null);
  const { user, fetchUser } = useAuth();

  useEffect(() => {
    getAllCurrencies();
    user.current && getAllTransactions(user.current.id);
    user.current && getAllWallets(user.current.id);
  }, []);

  const getAllCurrencies = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/currency/all`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setCurrencies(res.data);
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message);
      });
  };

  const getAllWallets = async (userId) => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/wallet/user/${userId}/all`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setWallets(res.data);
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message);
      });
  };

  const getCurrencyPriceHistory = async (currencyId) => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/price/${currencyId}/all`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message);
      });
  };

  const getCurrentPrice = async (currencyId) => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/price/${currencyId}/current`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message);
      });
  };

  const getAllTransactions = async (userId) => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/transaction/user/${userId}/all`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setTransactions(res.data.reverse());
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message);
      });
  };

  const createTransaction = async (body) => {
    await axios
      .post(`${import.meta.env.VITE_API_URL}/transaction`, body, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });

          fetchUser();
          getAllCurrencies();
          user.current && getAllTransactions(user.current.id);
          user.current && getAllWallets(user.current.id);
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message);
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
  };

  const value = {
    currencies,
    transactions,
    wallets,
    getAllCurrencies,
    getAllTransactions,
    getCurrentPrice,
    getCurrencyPriceHistory,
    createTransaction,
    apiError,
  };
  return (
    <CurrencyContext.Provider value={value}>
      {props.children}
    </CurrencyContext.Provider>
  );
}
