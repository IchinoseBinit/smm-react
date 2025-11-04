import { Route, Navigate, Routes } from "react-router";
import { useAuthContext } from "@/hooks/useAuthContext";
// import Register from "@/pages/auth/Register";
// import Login from "@/pages/auth/Login";
import SendOtp from "@/pages/auth/SendOtp";
import ResetPsw from "@/pages/auth/ResetPsw";
import EmailVerification from "@/pages/auth/EmailVerification";
import { InitialAppLoading } from "../loadings";
import OrganizationSignup from "@/pages/organization/OrganizationSignup";
import OrganizationRegister from "@/pages/auth/OrganizationRegister";

const authRoutes = [
  { path: "/register", element: <OrganizationRegister /> },
  { path: "/login", element: <OrganizationSignup /> },
  { path: "/reset-password/send-otp", element: <SendOtp /> },
  { path: "/reset-password", element: <ResetPsw /> },
  { path: "/verify-otp", element: <EmailVerification /> },
]

export const AuthRoutes = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) return <InitialAppLoading />;

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <Routes>
      {authRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};
