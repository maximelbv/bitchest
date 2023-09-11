import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const CurrencyContext = createContext();

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function CurrencyProvider(props) {
  const [currencies, setCurrencies] = useState();
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    getAllCurrencies();
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

  const value = {
    currencies,
    getAllCurrencies,
    getCurrencyPriceHistory,
    apiError,
  };
  return (
    <CurrencyContext.Provider value={value}>
      {props.children}
    </CurrencyContext.Provider>
  );
}
