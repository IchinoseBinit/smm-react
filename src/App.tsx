import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import EmailVerification from "./pages/auth/EmailVerification";
import Login from "./pages/auth/Login";
import SendOtp from "./pages/auth/SendOtp";
import ResetPsw from "./pages/auth/ResetPsw";
import {
  ProtectedRoutesWithAuth,
  ProtectedRoutesWithUI,
} from "./lib/ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<EmailVerification />} />
      <Route path="/reset-password/send-opt" element={<SendOtp />} />
      <Route path="/reset-password" element={<ResetPsw />} />

      <Route element={<ProtectedRoutesWithAuth />}>
        <Route element={<ProtectedRoutesWithUI />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
