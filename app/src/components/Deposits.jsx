import * as React from "react";
import Typography from "@mui/material/Typography";
import { useAuth } from "../hooks/useAuth";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

export default function Deposits() {
  const { user } = useAuth();

  return (
    <React.Fragment>
      <Typography variant="h5" sx={{ color: "#1976d2", mb: 2 }}>
        Balance
      </Typography>
      <Typography color="text.secondary">Cash</Typography>
      <Typography component="p" variant="h4">
        {user && user.current.balance} €
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 3 }}>
        Total
      </Typography>
      <Typography component="p" variant="h4">
        {} €
      </Typography>
      <Typography color="text.secondary" sx={{ justifySelf: "flex-end" }}>
        on {getDate()}
      </Typography>
    </React.Fragment>
  );
}
