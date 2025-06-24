import { Navigate, Outlet, useLocation } from "react-router";
import { UiProvider } from "../providers/uiProvider";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Suspense } from "react";

const ProtectedRoutesWithAuth = () => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <UiProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </UiProvider>
  );
};
export { ProtectedRoutesWithAuth };
