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
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Material Kit 2 React examples
import MKProgress from "../../../../components/MKProgress";
import MKTypography from "../../../../components/MKTypography";

import cmFn from "../../../../services/common";

function RatingStats({ stats, star, totalStats }) {
  return (
    <Stack spacing={3} direction="row" alignItems="center">
      <Grid item xs={2}>
        <MKTypography variant="body2">{star} Star</MKTypography>
      </Grid>
      <Grid item xs={8}>
        <MKProgress color="secondary" value={(stats / totalStats) * 100} />
      </Grid>
      <Grid item xs={2}>
        <MKTypography textAlign="center" variant="body2">
          {cmFn.cvNum(stats, true)}
        </MKTypography>
      </Grid>
    </Stack>
  );
}

export default RatingStats;
