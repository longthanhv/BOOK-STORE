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

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

import MyNavBars from "../../../layouts/MyNavbars";

import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import * as yup from "yup";
import authService from "../../../services/auth/authService";

const FORM_SIGN_UP = {
  username: "",
  password: "",
  confirmPw: "",
};

const validationSchema = yup.object({
  username: yup
    .string()
    .min(4, "Username is Too Short!")
    .max(20, "Username is Too Long!")
    .required("Username is required"),
  password: yup
    .string()
    .min(4, "Password is Too Short!")
    .max(20, "Password is Too Long!")
    .required("Password is requried"),
  confirmPw: yup
    .string()
    .min(4, "Password is Too Short!")
    .max(20, "Password is Too Long!")
    .required("Password is requried")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function MySignUp() {
  const [formSignUp, setFormSignUp] = useState(FORM_SIGN_UP);
  const [validateForm, setValidateForm] = useState(FORM_SIGN_UP);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await validationSchema
      .validate(formSignUp, { abortEarly: false })
      .then(async () => {
        const isSignupSuccess = await authService.signup(formSignUp);
        console.log(isSignupSuccess);
        if (isSignupSuccess) {
          const role = authService.getRole();
          const decode = authService.decodeJwtToken();
          if (role === "customer" && decode.exp * 1000 > new Date()) {
            navigate("/user/home");
          }
        }
      })
      .catch((err) => {
        err.inner.forEach((error) => {
          setValidateForm((curValidate) => {
            return {
              ...curValidate,
              [error.path]: error.message,
            };
          });
        });
      });
  };

  return (
    <>
      <MyNavBars routes={[]} transparent relative light />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Đăng kí
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Tên đăng nhập"
                      fullWidth
                      name="username"
                      value={formSignUp.username}
                      setValue={setFormSignUp}
                      helperText={validateForm.username}
                      error={validateForm.username}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Mật khẩu"
                      fullWidth
                      name="password"
                      value={formSignUp.password}
                      setValue={setFormSignUp}
                      helperText={validateForm.password}
                      error={validateForm.password}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Nhập lại mật khẩu"
                      fullWidth
                      name="confirmPw"
                      value={formSignUp.confirmPw}
                      setValue={setFormSignUp}
                      helperText={validateForm.confirmPw}
                      error={validateForm.confirmPw}
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                      Đăng kí
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Bạn đã có tài khoản?{" "}
                      <MKTypography
                        component={Link}
                        to="/sign-in"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Đăng nhập
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default MySignUp;
