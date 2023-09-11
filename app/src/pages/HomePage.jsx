import { Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { useCurrency } from "../hooks/useCurrency";
import CurrencyBlock from "../components/CurrencyBlock";
import Deposits from "../components/Deposits";
import Orders from "../components/Orders";

export default function HomePage() {
  const { currencies } = useCurrency();
  return (
    <div>
      <Container maxWidth="none" sx={{ mt: 3, mb: 4 }}>
        <Typography
          sx={{ fontWeight: "bolder", fontFamily: "poppins" }}
          variant="h3"
        >
          Overview
        </Typography>
        <Divider sx={{ mt: 2, mb: 2, borderColor: "rgba(0, 0, 0, .2)" }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 330,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>
        <Grid spacing={3}>
          <Typography
            sx={{ mt: 8, fontWeight: "bolder", fontFamily: "poppins" }}
            variant="h3"
          >
            Currencies quotes
          </Typography>
          <Divider sx={{ mt: 2, mb: 2, borderColor: "rgba(0, 0, 0, .2)" }} />
          {currencies &&
            currencies.map((c) => {
              return (
                <Grid key={c.id} item xs={12} md={8} lg={9} sx={{ mt: 4 }}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <CurrencyBlock currency={c} />
                  </Paper>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
}
