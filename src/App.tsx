import { Route, Routes, useNavigate } from "react-router";
import Register from "./pages/auth/Register";
import EmailVerification from "./pages/auth/EmailVerification";
import Login from "./pages/auth/Login";
import SendOtp from "./pages/auth/SendOtp";
import ResetPsw from "./pages/auth/ResetPsw";
import {
  ProtectedRoutesWithAuth,
  ProtectedRoutesWithUI,
} from "./lib/ProtectedRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, recheckAuth } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, navigate, recheckAuth]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<EmailVerification />} />
      <Route path="/reset-password/send-opt" element={<SendOtp />} />
      <Route path="/reset-password" element={<ResetPsw />} />

      <Route element={<ProtectedRoutesWithAuth />}>
        <Route element={<ProtectedRoutesWithUI />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
