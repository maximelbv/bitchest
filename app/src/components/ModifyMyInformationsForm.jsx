import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import Cookies from "js-cookie";

export default function ModifyMyInformationsForm() {
  const currentUser = JSON.parse(Cookies.get("user"));
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { updateUser } = useUser();

  const body = password
    ? { email: email, password: password }
    : { email: email };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(currentUser.id, body);
    console.log(body);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        mt: 1,
        paddingLeft: 0.5,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Modify my informations
      </Typography>
      <Box elevation={2} component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              id="email"
              name="email"
              defaultValue={currentUser.email}
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
