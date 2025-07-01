import { Route, Navigate, Routes } from "react-router";
import { useAuthContext } from "@/hooks/useAuthContext";
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import SendOtp from "@/pages/auth/SendOtp";
import ResetPsw from "@/pages/auth/ResetPsw";
import EmailVerification from "@/pages/auth/EmailVerification";
import { InitialAppLoading } from "../loadings";

const authRoutes = [
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/reset-password/send-opt", element: <SendOtp /> },
  { path: "/reset-password", element: <ResetPsw /> },
  { path: "/verify-otp", element: <EmailVerification /> },
];

export const AuthRoutes = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) return <InitialAppLoading />;

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <Routes>
      {authRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};
