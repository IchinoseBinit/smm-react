import DashboardLayout from "@/pages/layout";
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
        element={<DashboardLayout>{component}</DashboardLayout>}
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
