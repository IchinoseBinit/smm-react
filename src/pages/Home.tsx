import DarkModeToggle from "@/components/DarkModeToggle";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, [navigate]);
  return (
    <>
      <DarkModeToggle />
      <div>Home</div>
    </>
  );
}
