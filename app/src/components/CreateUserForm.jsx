import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { MenuItem, Select } from "@mui/material";
import { useRef, useState } from "react";
import { useUser } from "../hooks/useUser";

export default function CreateUserForm() {
  const email = useRef();
  const password = useRef();
  const [role, setRole] = useState("member");
  const { createUser } = useUser();

  const handleChange = (ref, event) => {
    ref.current = event.target.value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser({
      email: email.current,
      password: password.current,
      role: role,
    });
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
      <Box elevation={2} component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => handleChange(email, e)}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => handleChange(password, e)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              fullWidth
              value={role}
              label="role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={"member"}>Member</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
}
