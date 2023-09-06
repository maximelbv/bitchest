import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    (async () => {
      await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    })();
  }, []);

  return <h1>Home Page</h1>;
}
