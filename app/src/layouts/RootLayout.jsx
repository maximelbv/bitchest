import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("user")) {
      navigate("/login");
    }
  }, []);

  return <div>root</div>;
}
