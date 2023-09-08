import { Button } from "@mui/material";

export default function NotFoundPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "8rem", margin: "0", lineHeight: ".8" }}>404</h1>
      <p>Page not found</p>
      <Button variant="contained" href="/">
        Return to Home
      </Button>
    </div>
  );
}
