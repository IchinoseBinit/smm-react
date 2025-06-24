import DashboardLayout from "@/pages/layout";
import { Center, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { Route } from "react-router";

export const layoutRoute = ({
  path,
  component,
}: {
  path: string;
  component: React.ReactNode;
}) => {
  return (
    <>
      <Route
        path={path}
        element={
          <DashboardLayout>
            <Suspense
              fallback={
                <Center minH="200px">
                  <Spinner color="teal.500" size="lg" />
                </Center>
              }
            >
              {component}
            </Suspense>
          </DashboardLayout>
        }
      />
    </>
  );
};

export const flatRoute = ({
  path,
  component,
}: {
  path: string;
  component: React.ReactNode;
}) => <Route path={path} element={component} />;
