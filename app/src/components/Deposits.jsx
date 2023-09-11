import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

export default function Deposits() {
  const { user } = useAuth();
  let navigate = useNavigate();

  return (
    <React.Fragment>
      <Typography variant="h5" sx={{ color: "#1976d2", mb: 2 }}>
        Balance
      </Typography>
      <Typography component="p" variant="h4">
        {user && user.current.balance} €
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {getDate()}
      </Typography>
      <div>
        <Link
          color="primary"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/my-informations");
          }}
        >
          View details
        </Link>
      </div>
    </React.Fragment>
  );
}
