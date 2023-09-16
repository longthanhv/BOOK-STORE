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

// @mui material components
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Kit 2 React components

// Link Router Dom

// My Components
import MyBaseLayout from "../../../layouts/MyBaseLayout";
import team4 from "assets/images/team-4.jpg";
import MKAvatar from "../../../components/MKAvatar";
import ProfileInfo from "./sections/ProfileInfo";
import { useEffect, useState } from "react";
import profileService from "../../../services/auth/profileService";

const INITIAL_PROFILE = {
  avatar: "",
  name: "",
  phone: "",
  moreDetail: {},
};
function ProfilePage() {
  const [data, setData] = useState(INITIAL_PROFILE);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchDataProfile = async () => {
    const res = await profileService.get();
    res.status === 200 && setData(res.data.profile);
  };

  useEffect(() => {
    fetchDataProfile();
  }, []);

  useEffect(() => {
    isSuccess && fetchDataProfile();
  }, [isSuccess]);

  console.log(data);
  return (
    <MyBaseLayout>
      <Container>
        <ProfileInfo
          image={data.avatar}
          name={data.name}
          phone={data.phone}
          moreDetail={data.moreDetail}
          setIsSuccess={setIsSuccess}
        />
      </Container>
    </MyBaseLayout>
  );
}

export default ProfilePage;
