/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import CenteredFooter from "examples/Footers/CenteredFooter";

// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import MyNavBars from "../MyNavbars";
// import CenteredFooter from "examples/Footers/CenteredFooter";
import Breadcrumbs from "examples/Breadcrumbs";

// Routes
import adminRoutes from "adminRoutes";
import profileRoutes from "profileRoutes";

// Images
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth/authService";

function MyBaseLayout({ breadcrumb, title, children, searchBtn }) {
  const signInAction = { type: "internal", route: "/sign-in", color: "info", label: "Đăng nhập" };
  let profileRoute = profileRoutes[0];
  authService.isAuthen() &&
    (profileRoute = {
      ...profileRoute,
      name: authService.decodeJwtToken().name,
      avatar: authService.decodeJwtToken().avatar,
    });
  const routes = authService.isAuthen()
    ? authService.isAdmin()
      ? [...adminRoutes, profileRoute]
      : [profileRoute]
    : [];

  const [value, setValue] = useState();
  const navigation = useNavigate();

  return (
    <MKBox display="flex" flexDirection="column" bgColor="grey-300" minHeight="100vh">
      <MKBox bgColor="white" shadow="sm" py={0.25}>
        <MyNavBars
          routes={routes}
          transparent
          relative
          action={!authService.isAuthen() ? signInAction : null}
          searchBtn={
            searchBtn
              ? {
                  label: "Tìm kiếm",
                  value: value,
                  onChange: (event) => setValue(event.target.value),
                  onClick: () => {
                    navigation("/products", { state: { name: value } });
                  },
                }
              : null
          }
        />
      </MKBox>
      <Container sx={{ mt: 6 }}>
        <Grid container item xs={12} flexDirection="column" justifyContent="center" mx="auto">
          {breadcrumb && (
            <MKBox sx={{ width: "fit-content" }} mb={3}>
              <Breadcrumbs routes={breadcrumb} />
            </MKBox>
          )}
          {title && (
            <MKTypography variant="h3" mb={1}>
              {title}
            </MKTypography>
          )}
          {children}
        </Grid>
      </Container>
      <MKBox mt="auto"><CenteredFooter/></MKBox>
    </MKBox>
  );
}

export default MyBaseLayout;
