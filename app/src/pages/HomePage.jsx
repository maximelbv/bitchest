import {
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useCurrency } from "../hooks/useCurrency";
import CurrencyBlock from "../components/CurrencyBlock";
import Deposits from "../components/Deposits";
import Orders from "../components/Orders";

export default function HomePage() {
  const { currencies, wallets } = useCurrency();
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
          <Grid item xs={30} md={30} lg={30}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h5" sx={{ color: "#1976d2", mb: 2 }}>
                My Wallets
              </Typography>
              <div style={{ display: "flex" }}>
                {wallets &&
                  wallets.map((w) => {
                    const linkedCurrency =
                      currencies &&
                      currencies.filter((c) => c.id === w.currency_id);

                    return w.value !== 0 ? (
                      <div
                        key={w.id}
                        style={{
                          borderRadius: "10px",
                          marginRight: ".5rem",
                        }}
                      >
                        <Chip
                          icon={
                            <img
                              src={`../../public${
                                linkedCurrency && linkedCurrency[0].logo_url
                              }.png`}
                            />
                          }
                          label={`${w.value} ${
                            linkedCurrency && linkedCurrency[0].name
                          }`}
                        />
                      </div>
                    ) : (
                      ""
                    );
                  })}
              </div>
            </Paper>
          </Grid>
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
                      height: "fitContent",
                      "& .recharts-responsive-container": {
                        height: "300px !important",
                      },
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
