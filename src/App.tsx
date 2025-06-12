import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoutesWithAuth } from "./lib/ProtectedRoutes";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./pages/dashboard/layout";
import Analytics from "./pages/dashboard/Analytics";

function App() {
  const { user, isLoading } = useAuth();
  if (isLoading) return;
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route element={<ProtectedRoutesWithAuth />}>
          <Route
            path="/"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/analytics"
            element={
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
