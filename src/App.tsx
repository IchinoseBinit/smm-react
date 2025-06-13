import { Routes, Route } from "react-router";
import { ProtectedRoutesWithAuth } from "./lib/routes/ProtectedRoutes";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./pages/dashboard/layout";
import Analytics from "./pages/dashboard/Analytics";
import { AuthRoute } from "./lib/routes/PageRoutes";
import SendOtp from "./pages/auth/SendOtp";
import EmailVerification from "./pages/auth/EmailVerification";
import Register from "./pages/auth/Register";
import ResetPsw from "./pages/auth/ResetPsw";

function App() {
  return (
    <>
      <Routes>
        {AuthRoute("/register", <Register />)}
        {AuthRoute("/login", <Login />)}
        {AuthRoute("/reset-password/send-opt", <SendOtp />)}
        {AuthRoute("/reset-password", <ResetPsw />)}
        {AuthRoute("/verify-otp", <EmailVerification />)}

        <Route element={<ProtectedRoutesWithAuth />}>
          <Route
            path="/"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/analytics"
            element={
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
