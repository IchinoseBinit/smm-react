import { lazy } from "react";
import { Routes, Route } from "react-router";
import { ProtectedRoutesWithAuth } from "./lib/routes/ProtectedRoutes";
import { flatRoute, layoutRoute } from "./lib/routes/route";
import { AuthRoute } from "./lib/routes/PageRoutes";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import SendOtp from "./pages/auth/SendOtp";
import EmailVerification from "./pages/auth/EmailVerification";
import ResetPsw from "./pages/auth/ResetPsw";

export const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
export const Create = lazy(() => import("./pages/create/Create"));
export const AccConnect = lazy(() => import("./pages/account/AccConnect"));
export const Account = lazy(() => import("./pages/account/Account"));
export const FbPages = lazy(() => import("./pages/account/FbPages"));
export const FacebookSuccessPage = lazy(
  () => import("./features/accounts/components/facebook/FbSuccessPage"),
);
export const TiktokSuccessPage = lazy(
  () => import("./features/accounts/components/titkok/TkSuccessPage"),
);
export const YoutubeSuccessPage = lazy(
  () => import("./features/accounts/components/youtube/YtSuccessPage"),
);

function App() {
  return (
    <>
      <Routes>
        {AuthRoute("/register", <Register />)}
        {AuthRoute("/login", <Login />)}
        {AuthRoute("/reset-password/send-opt", <SendOtp />)}
        {AuthRoute("/reset-password", <ResetPsw />)}
        {AuthRoute("/verify-otp", <EmailVerification />)}

        <Route element={<ProtectedRoutesWithAuth />}>
          {layoutRoute({ path: "/", component: <Dashboard /> })}
          {layoutRoute({ path: "/create", component: <Create /> })}
          {layoutRoute({
            path: "/account/connect",
            component: <AccConnect />,
          })}
          {layoutRoute({ path: "/account", component: <Account /> })}
          {layoutRoute({
            path: "/account/facebook/pages",
            component: <FbPages />,
          })}

          {flatRoute({
            path: "/auth/facebook",
            component: <FacebookSuccessPage />,
          })}
          {flatRoute({
            path: "/auth/tiktok",
            component: <TiktokSuccessPage />,
          })}
          {flatRoute({
            path: "/auth/youtube",
            component: <YoutubeSuccessPage />,
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
