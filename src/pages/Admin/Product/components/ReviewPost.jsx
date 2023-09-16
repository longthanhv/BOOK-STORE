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
import Rating from "@mui/material/Rating";

// Material Kit 2 React examples
import MKAvatar from "components/MKAvatar";
import MKTypography from "../../../../components/MKTypography";

// Image
import team4 from "assets/images/team-4.jpg";
import { baseURL } from "../../../../services/axios";

function ReviewPost({ reviewPost }) {
  const { rating, description, createdAt, user } = reviewPost;
  const { name, avatar } = user[0];
  return (
    <Grid container spacing={2} pl={6} pr={8} mb={6}>
      <Grid container item xs={2} alignItems="center" flexDirection="column">
        <Grid item mb={2}>
          <MKAvatar src={avatar ? `${baseURL}/${avatar}` : team4} alt="xl" size="xl" />
        </Grid>
        <Grid item>
          <MKTypography variant="h6">{name}</MKTypography>
        </Grid>
        <Grid item>
          <MKTypography variant="body2">
            {new Date(createdAt.$date).toDateString().split(" ").slice(1).join(" ")}
          </MKTypography>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Grid>
          <Rating name="half-rating-read" value={rating} precision={1} readOnly />
        </Grid>
        <Grid>
          <MKTypography variant="subtitle2" mb={2} textAlign="justify">
            {description}
          </MKTypography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ReviewPost;
