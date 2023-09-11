import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useCurrency } from "../hooks/useCurrency";
import { useAuth } from "../hooks/useAuth";

export default function CurrencyBlock({ currency }) {
  const theme = useTheme();
  const [currencyHistory, setCurrencyHistory] = useState();
  const [value, setValue] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { wallets, createTransaction } = useCurrency();
  const { user } = useAuth();
  const correspondingWallet =
    wallets && wallets.filter((w) => w.currency_id === currency.id)[0];
  const getCurrencyPriceHistory = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/price/${currency.id}/all`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setCurrencyHistory(res.data);
        }
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };
  const currencyLatestValue =
    currencyHistory && currencyHistory[currencyHistory.length - 1].value;
  const euroConvertedWalletValue =
    correspondingWallet && correspondingWallet.value * currencyLatestValue;

  const handleOpen = (e) => {
    e.preventDefault;
    setIsOpen(!isOpen);
  };

  const handleSubmitBuy = (e) => {
    e.preventDefault();
    createTransaction({
      user_id: user.current.id,
      currency_id: currency.id,
      euro_amount: value,
      transaction_type: "buy",
    });
  };

  const handleSubmitSell = (e) => {
    e.preventDefault();
    createTransaction({
      user_id: user.current.id,
      currency_id: currency.id,
      euro_amount: euroConvertedWalletValue,
      transaction_type: "sell",
    });
  };

  useState(() => {
    getCurrencyPriceHistory();
  }, []);

  const data = [];

  currencyHistory &&
    currencyHistory.map((h) => {
      const date = h.date;
      const value = h.value;
      data.push({ date, value });
    });

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{ color: "#1976d2", mb: 2, display: "flex" }}
        >
          <img
            src={`../../public${currency.logo_url}.png`}
            style={{ marginRight: ".5rem" }}
          />
          {currency.name}
        </Typography>

        {correspondingWallet && correspondingWallet.value !== 0 && (
          <Chip
            sx={{ width: "fit-content" }}
            icon={<img src={`../../public${currency.logo_url}.png`} />}
            label={`You own ${correspondingWallet.value} ${currency.name} (
              ${euroConvertedWalletValue} €)`}
          />
        )}
      </div>

      {currencyHistory ? (
        <>
          <ResponsiveContainer>
            <LineChart
              sx={{ height: "400px !important" }}
              data={data}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis
                dataKey="date"
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              >
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: "middle",
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                  }}
                >
                  Value (€)
                </Label>
              </YAxis>
              <Line
                isAnimationActive={false}
                type="monotone"
                dataKey="value"
                stroke={theme.palette.primary.main}
                dot={false}
              />
              <CartesianGrid stroke="#ccc" />
            </LineChart>
          </ResponsiveContainer>
          <ButtonGroup
            sx={{ mt: 2 }}
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button onClick={handleOpen}>Buy {currency.name}</Button>
            {correspondingWallet && correspondingWallet.value !== 0 && (
              <Button onClick={handleSubmitSell}>
                Sell my {correspondingWallet.value} {currency.name} (
                {euroConvertedWalletValue} €)
              </Button>
            )}
          </ButtonGroup>
          {isOpen && (
            <Box
              elevation={2}
              component="form"
              noValidate
              onSubmit={handleSubmitBuy}
            >
              <Grid container spacing={2}>
                <Grid item sx={{ mt: 2 }}>
                  <TextField
                    onChange={(e) => setValue(e.target.value)}
                    required
                    InputProps={{
                      inputProps: { min: 1 },
                    }}
                    type="number"
                    id="value"
                    label="Quantity (€)"
                    name="value"
                    autoComplete="Quantity"
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
                Confirm
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box>
          <CircularProgress />
        </Box>
      )}
    </React.Fragment>
  );
}
