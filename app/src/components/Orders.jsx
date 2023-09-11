import React, { useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { useCurrency } from "../hooks/useCurrency";

export default function Orders() {
  const { transactions, currencies } = useCurrency();
  const [ordersOpen, setOrdersOpen] = useState(false);

  return (
    <React.Fragment>
      <Typography variant="h5" sx={{ color: "#1976d2", mb: 2 }}>
        Recent Orders
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Transaction</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Amount (€)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions &&
            currencies &&
            transactions.slice(0, ordersOpen ? 20 : 5).map((t) => {
              const linkedCurrency =
                currencies && currencies.filter((c) => c.id === t.currency_id);
              return (
                <TableRow key={t.id}>
                  <TableCell>{t.created_at}</TableCell>
                  <TableCell>{t.transaction_type}</TableCell>
                  <TableCell>
                    {linkedCurrency && linkedCurrency[0].name}
                  </TableCell>
                  <TableCell align="right">{`${t.euro_amount}`}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Link
        onClick={() => setOrdersOpen(!ordersOpen)}
        color="primary"
        href="#"
        sx={{ mt: 3 }}
      >
        {ordersOpen ? "Less" : "See more orders"}
      </Link>
    </React.Fragment>
  );
}
