import { Navigate, Outlet, useLocation } from "react-router";
import { UiProvider } from "../providers/uiProvider";
import { useAuthContext } from "@/hooks/useAuthContext";

const ProtectedRoutesWithAuth = () => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <UiProvider>
      <Outlet />
    </UiProvider>
  );
};
export { ProtectedRoutesWithAuth };
