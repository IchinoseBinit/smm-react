import { Navigate, Outlet, useLocation } from "react-router";
import { UiProvider } from "./providers/uiProvider";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoutesWithAuth = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

const ProtectedRoutesWithUI = () => {
  return (
    <UiProvider>
      <Outlet />
    </UiProvider>
  );
};

export { ProtectedRoutesWithUI, ProtectedRoutesWithAuth };
