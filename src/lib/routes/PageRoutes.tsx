import { useAuth } from "@/hooks/useAuth";
import { Navigate, Route } from "react-router";

const AuthRoute = (path: string, element: React.ReactNode) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;

  return (
    <Route
      path={path}
      element={isAuthenticated ? <Navigate to="/" replace /> : element}
    />
  );
};

export { AuthRoute };
