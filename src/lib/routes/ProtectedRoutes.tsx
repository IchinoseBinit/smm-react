import { Navigate, Outlet, useLocation } from "react-router";
import { UiProvider } from "../providers/uiProvider";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Suspense } from "react";
import { Center, Skeleton, Spinner } from "@chakra-ui/react";

const ProtectedRoutesWithAuth = () => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) return <Skeleton height="300px" borderRadius="md" />;
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
