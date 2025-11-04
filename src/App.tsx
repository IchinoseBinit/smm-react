import { Routes, Route } from "react-router";
import { ProtectedRoutesWithAuth } from "./lib/routes/ProtectedRoutes";
import { flatRoute, layoutRoute } from "./lib/routes/route";
import { AuthRoutes } from "./lib/routes/PageRoutes";
import Account from "./pages/account/Account";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Calendar from "./pages/calendar/Calendar";
import AccConnect from "./pages/account/AccConnect";
import FbPages from "./pages/account/FbPages";
import Manager from "./pages/manager/Manager";
import FacebookSuccessPage from "./features/accounts/components/facebook/FbSuccessPage";
import TiktokSuccessPage from "./features/accounts/components/titkok/TkSuccessPage";
import YoutubeSuccessPage from "./features/accounts/components/youtube/YtSuccessPage"
import LandingPage from "./pages/landing/Landing"
import Privacypolicy from "./pages/legal/Privacypolicy"
import Termsofservices from "./pages/legal/Termsofservices"
import Aboutus from "./pages/Company/Aboutus"
import OrganizationSignup from "./pages/organization/OrganizationSignup"
import Contactus from "./pages/Contactus/Contactus"
import Inviteteammates from "./pages/organization/Inviteteammates"
import Profile from "./pages/Profile/Profile";
import PricingPage from "./pages/Pricing/Pricing";
import SendOtp from "./pages/auth/SendOtp";
import ResetPsw from "./pages/auth/ResetPsw";
function App() {
  return (
    <>
      <Routes>
        {flatRoute({ path: "/", component: <LandingPage /> })}
        {flatRoute({ path: "/pricing", component: <PricingPage /> })}
        {flatRoute({ path: "/privacypolicy", component: <Privacypolicy /> })}
        {flatRoute({ path: "/aboutus", component: <Aboutus /> })}
        {flatRoute({
          path: "/reset-password",
          component: <ResetPsw />,
        })}
        ,
        {flatRoute({
          path: "/reset-password/send-otp",
          component: <SendOtp />,
        })},
        {flatRoute({
          path: "/auth",
          component: <OrganizationSignup />,
        })}
        {flatRoute({
          path: "/login",
          component: <OrganizationSignup />,
        })}
        {flatRoute({
          path: "/invite",
          component: <Inviteteammates />,
        })}
        {flatRoute({
          path: "/termsofservices",
          component: <Termsofservices />,
        })}
        <Route path="/*" element={<AuthRoutes />} />
        <Route element={<ProtectedRoutesWithAuth />}>
          {layoutRoute({ path: "/dashboard", component: <Dashboard /> })}
          {layoutRoute({ path: "/create", component: <Create /> })}
          {layoutRoute({
            path: "/calendar",
            component: <Calendar />,
          })}
          {layoutRoute({
            path: "/contactus",
            component: <Contactus />,
          })}
          {layoutRoute({
            path: "/posts",
            component: <Manager />,
          })}
          {layoutRoute({
            path: "/profile",
            component: <Profile />,
          })}
          {layoutRoute({
            path: "/account",
            component: <Account />,
          })}
          {layoutRoute({
            path: "/account/connect",
            component: <AccConnect />,
          })}
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
  )
}

export default App;
