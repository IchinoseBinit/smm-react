import DashboardLayout from "@/pages/layout";
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
            <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>
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
