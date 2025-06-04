import DarkModeToggle from "@/components/DarkModeToggle";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { getTokenExpiry } from "@/lib/token";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) {
      navigate("/login");
      return;
    }
    const exp = getTokenExpiry(token);
    if (Date.now() >= exp * 1000) {
      Cookies.remove("access_token");
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <DarkModeToggle />
      <div>Home</div>
    </>
  );
}
