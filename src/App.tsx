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
import Create from "./pages/dashboard/create/Create";
import Account from "./pages/dashboard/account/Account";
import AccConnect from "./pages/dashboard/account/AccConnect";
import FacebookSuccessPage from "./pages/dashboard/account/FbSuccessPage";

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
          <Route
            path="/create"
            element={
              <DashboardLayout>
                <Create />
              </DashboardLayout>
            }
          />
          <Route
            path="/account"
            element={
              <DashboardLayout>
                <Account />
              </DashboardLayout>
            }
          />
          <Route
            path="/account/connect"
            element={
              <DashboardLayout>
                <AccConnect />
              </DashboardLayout>
            }
          />
        </Route>
        <Route
          path="/auth/facebook/success"
          element={<FacebookSuccessPage />}
        />
      </Routes>
    </>
  );
}

export default App;
