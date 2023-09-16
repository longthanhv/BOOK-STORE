/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// react-router components
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Material Kit 2 React themes
import theme from "assets/theme";

// Import MyPage

// Material Kit 2 React routes
import routes from "routes";
import adminRoutes from "adminRoutes";
import profileRoutes from "profileRoutes";
import hiddenAdminRoutes from "hiddenAdminRoutes";

import MySignIn from "./pages/Authentication/SignIn";
import MySignUp from "./pages/Authentication/SignUp";
import Home from "./pages/User/Home";
import Presentation from "./pages/Presentation";
import { AdminRoute } from "./components/AdminRoute";
import { AuthenRoute } from "./components/AuthenRoute";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.route} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route exact path="/" element={<AdminRoute />}>
          {getRoutes(adminRoutes)}
        </Route>
        <Route exact path="/" element={<AdminRoute />}>
          {getRoutes(hiddenAdminRoutes)}
        </Route>
        <Route exact path="/" element={<AuthenRoute />}>
          {getRoutes(profileRoutes)}
        </Route>
        {getRoutes(routes)}
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<MySignIn />} />
        <Route path="/sign-up" element={<MySignUp />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </ThemeProvider>
  );
}
