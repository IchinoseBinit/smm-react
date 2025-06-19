import { Routes, Route } from "react-router";
import { ProtectedRoutesWithAuth } from "./lib/routes/ProtectedRoutes";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./pages/layout";
import Analytics from "./pages/dashboard/Analytics";
import { AuthRoute } from "./lib/routes/PageRoutes";
import SendOtp from "./pages/auth/SendOtp";
import EmailVerification from "./pages/auth/EmailVerification";
import Register from "./pages/auth/Register";
import ResetPsw from "./pages/auth/ResetPsw";
import Create from "./pages/create/Create";
import Account from "./pages/account/Account";
import AccConnect from "./pages/account/AccConnect";
import FacebookSuccessPage from "./pages/account/FbSuccessPage";

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
          <Route
            path="/create"
            element={
              <DashboardLayout>
                <Create />
              </DashboardLayout>
            }
          />
          <Route
            path="/account"
            element={
              <DashboardLayout>
                <Account />
              </DashboardLayout>
            }
          />
          <Route
            path="/account/connect"
            element={
              <DashboardLayout>
                <AccConnect />
              </DashboardLayout>
            }
          />
          <Route path="/auth/facebook" element={<FacebookSuccessPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

// new configure

// import { Suspense, lazy, useEffect, useState } from "react";
// import { Routes, Route } from "react-router";
// import { ProtectedRoutesWithAuth } from "./lib/routes/ProtectedRoutes";
// import { AuthRoute } from "./lib/routes/PageRoutes";
// import { Box, ProgressCircle } from "@chakra-ui/react";

// const Login = lazy(() => import("./pages/auth/Login"));
// const Register = lazy(() => import("./pages/auth/Register"));
// const SendOtp = lazy(() => import("./pages/auth/SendOtp"));
// const EmailVerification = lazy(() => import("./pages/auth/EmailVerification"));
// const ResetPsw = lazy(() => import("./pages/auth/ResetPsw"));
// const DashboardLayout = lazy(() => import("./pages/layout"));
// const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
// const Analytics = lazy(() => import("./pages/dashboard/Analytics"));
// const Create = lazy(() => import("./pages/create/Create"));
// const Account = lazy(() => import("./pages/account/Account"));
// const AccConnect = lazy(() => import("./pages/account/AccConnect"));
// const FacebookSuccessPage = lazy(() => import("./pages/account/FbSuccessPage"));

// function App() {
//   const [isInitialLoading, setIsInitialLoading] = useState(true);

//   useEffect(() => {
//     const timeout = setTimeout(() => setIsInitialLoading(false), 1000);
//     return () => clearTimeout(timeout);
//   }, []);

//   if (isInitialLoading) {
//     return (
//       <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
//         <ProgressCircle.Root value={null} size="sm">
//           <ProgressCircle.Circle>
//             <ProgressCircle.Track />
//             <ProgressCircle.Range />
//           </ProgressCircle.Circle>
//         </ProgressCircle.Root>
//       </Box>
//     );
//   }
//   return (
//     <Suspense fallback={<div>Loading…</div>}>
//       <Routes>
//         {AuthRoute("/register", <Register />)}
//         {AuthRoute("/login", <Login />)}
//         {AuthRoute("/reset-password/send-opt", <SendOtp />)}
//         {AuthRoute("/reset-password", <ResetPsw />)}
//         {AuthRoute("/verify-otp", <EmailVerification />)}

//         <Route element={<ProtectedRoutesWithAuth />}>
//           <Route
//             path="/"
//             element={
//               <DashboardLayout>
//                 <Dashboard />
//               </DashboardLayout>
//             }
//           />
//           <Route
//             path="/analytics"
//             element={
//               <DashboardLayout>
//                 <Analytics />
//               </DashboardLayout>
//             }
//           />
//           <Route
//             path="/create"
//             element={
//               <DashboardLayout>
//                 <Create />
//               </DashboardLayout>
//             }
//           />
//           <Route
//             path="/account"
//             element={
//               <DashboardLayout>
//                 <Account />
//               </DashboardLayout>
//             }
//           />
//           <Route
//             path="/account/connect"
//             element={
//               <DashboardLayout>
//                 <AccConnect />
//               </DashboardLayout>
//             }
//           />
//           <Route path="/auth/facebook" element={<FacebookSuccessPage />} />
//         </Route>
//       </Routes>
//     </Suspense>
//   );
// }

// export default App;
