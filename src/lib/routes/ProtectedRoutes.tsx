import { Navigate, Outlet, useLocation } from "react-router";
import { UiProvider } from "../providers/uiProvider";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Suspense } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { InitialAppLoading } from "../loadings";

const ProtectedRoutesWithAuth = () => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return <InitialAppLoading />;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <UiProvider>
      <Suspense
        fallback={
          <Center minH="200px">
            <Spinner color="teal.500" size="lg" />
          </Center>
        }
      >
        <Outlet />
      </Suspense>
    </UiProvider>
  );
};
export { ProtectedRoutesWithAuth };
