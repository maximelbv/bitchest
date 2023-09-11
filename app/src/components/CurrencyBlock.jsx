import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { useCurrency } from "../hooks/useCurrency";
import axios from "axios";

export default function CurrencyBlock({ currency }) {
  const theme = useTheme();
  // const { getCurrencyPriceHistory } = useCurrency();
  const [currencyHistory, setCurrencyHistory] = useState();

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
      <Typography variant="h5" sx={{ color: "#1976d2", mb: 2 }}>
        {currency.name}
      </Typography>

      {currencyHistory ? (
        <ResponsiveContainer>
          <LineChart
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
      ) : (
        <Box>
          <CircularProgress />
        </Box>
      )}
    </React.Fragment>
  );
}
