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

import { useEffect, useState } from "react";

// @mui material components
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Icon
import DescriptionIcon from "@mui/icons-material/Description";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ReviewTab from "../components/ReviewTab";

function DescriptionProduct({ product }) {
  const { description } = product;
  const [activeTab, setActiveTab] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleTabType = (event, newValue) => setActiveTab(newValue);

  useEffect(() => {
    setTimeout(() => setSuccess(false), 3000);
  }, [success]);

  return (
    <MKBox
      width="100%"
      position="relative"
      borderRadius="xl"
      shadow="lg"
      mb={2}
      sx={{ overflow: "hidden", backgroundColor: "white !important" }}
    >
      <MKBox
        px={3}
        sx={{
          borderBottom: ({ borders: { borderWidth, borderColor } }) =>
            `${borderWidth[1]} solid ${borderColor}`,
        }}
      >
        <Grid container spacing={2} justifyContent="space-between" py={1}>
          <Grid item xs={12} lg={3}>
            <AppBar position="static">
              <Tabs value={activeTab} onChange={handleTabType}>
                <Tab icon={<DescriptionIcon style={{ marginRight: 10 }} />} label="Description" />
                <Tab icon={<ReviewsIcon style={{ marginRight: 10 }} />} label="Reviews" />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox display={activeTab === 0 ? "block" : "none"}>
        <MKBox width="100%" p={3}>
          <MKTypography variant="body1" mb={1} sx={{ textAlign: "justify" }}>
          {<div className="content" dangerouslySetInnerHTML={{ __html: description }}></div> ||
              "This is Description of the Product"}
          </MKTypography>
        </MKBox>
      </MKBox>
      <MKBox display={activeTab === 1 ? "block" : "none"} p={0}>
        <ReviewTab product={product} />
      </MKBox>
    </MKBox>
  );
}

export default DescriptionProduct;
