import { Navigate, Outlet, useLocation } from "react-router";
import { UiProvider } from "../providers/uiProvider";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Suspense } from "react";
import { Center, Spinner, Box, Text } from "@chakra-ui/react";
import { InitialAppLoading } from "../loadings";

const AdminRoutesWithAuth = () => {
  const { isAuthenticated, isLoading, user } = useAuthContext();
  const location = useLocation();

  if (isLoading) return <InitialAppLoading />;

  // First check authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Then check if user is admin (check lowercase as JWT returns "admin" not "ADMIN")
  if (user?.role !== "admin") {
    return (
      <UiProvider>
        <Center minH="100vh" flexDirection="column">
          <Box textAlign="center" p={8}>
            <Text fontSize="6xl" mb={4}>
              403
            </Text>
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
              Access Denied
            </Text>
            <Text fontSize="md" color="gray.600" _dark={{ color: "gray.400" }}>
              You don't have permission to access this page.
            </Text>
            <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.500" }} mt={4}>
              This area is restricted to administrators only.
            </Text>
          </Box>
        </Center>
      </UiProvider>
    );
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

export { AdminRoutesWithAuth };
