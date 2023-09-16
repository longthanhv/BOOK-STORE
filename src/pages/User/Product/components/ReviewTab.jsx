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
import Pagination from "@mui/material/Pagination";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Images
import team4 from "assets/images/team-4.jpg";

// @mui icons
import CreateIcon from "@mui/icons-material/Create";

import cmFn from "../../../../services/common";
import RatingStats from "./RatingStats";
import ReviewPost from "./ReviewPost";
import { useEffect, useState } from "react";
import ModalWritingReview from "./ModalWritingReview";
import userService from "../../../../services/user";

const INITIAL_LIMTI = {
  page: 1,
  size: 5,
};

function ReviewTab({ product, isSuccess, setIsSuccess }) {
  const { ratingInfo, id } = product;
  const { rating, totalRating, totalStats } = ratingInfo;

  const [limit, setLimit] = useState(INITIAL_LIMTI);
  const [data, setData] = useState({
    total: 0,
    reviews: [],
  });
  const [show, setShow] = useState(false);
  const toggleModal = () => {
    setShow(!show);
    setIsSuccess(false);
  };

  const handleChange = (event, value) => {
    setLimit((curLimit) => {
      return {
        ...curLimit,
        page: value,
      };
    });
  };

  useEffect( () => {
    const fetchData = async()=>{
      if (id) {
      const response = await userService.review.getMany(id, limit);
      response.status === 200 &&
      await setData({ reviews: response.data.reviews, total: response.data.total });
    }
    }
    fetchData()
  }, [product, limit]);

  useEffect(() => {
    const fetchData=async()=>{
      if (isSuccess) {
      const response = await userService.review.getMany(id, limit);
      response.status === 200 &&
        await setData({ reviews: response.data.reviews, total: response.data.total });
    }
    }
    fetchData()
  }, [isSuccess]);

  return (
    <MKBox component="section">
      <Grid container xs={12} sx={{ mx: "auto" }} mb={4}>
        <Grid
          item
          xs={12}
          md={4}
          p={3}
          sx={{
            borderBottom: ({ borders: { borderWidth, borderColor } }) =>
              `${borderWidth[1]} solid ${borderColor}`,
          }}
        >
          <Stack spacing={1} textAlign="center" alignItems="center">
            <MKTypography variant="h5">Đánh giá</MKTypography>
            <MKTypography variant="h1">
              {(totalStats ? totalRating / totalStats : 0).toFixed(1)}/5
            </MKTypography>
            <Rating
              name="half-rating-read"
              value={totalStats ? totalRating / totalStats : 0}
              precision={0.1}
              readOnly
            />
            <MKTypography variant="body2">({cmFn.cvNum(totalStats, true)} reviews)</MKTypography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          p={3}
          sx={{
            border: ({ borders: { borderWidth, borderColor } }) =>
              `${borderWidth[1]} solid ${borderColor}`,
            borderTop: 0,
          }}
        >
          <Stack spacing={1}>
            {rating.map((stats, i) => {
              return <RatingStats stats={stats} star={i + 1} totalStats={totalStats} key={i} />;
            })}
          </Stack>
        </Grid>
        <Grid
          container
          xs={12}
          md={4}
          sx={{
            borderBottom: ({ borders: { borderWidth, borderColor } }) =>
              `${borderWidth[1]} solid ${borderColor}`,
          }}
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <Grid>
            <MKButton variant="outlined" color="secondary" onClick={toggleModal}>
              <CreateIcon />
              &nbsp; Viết đánh giá
            </MKButton>
          </Grid>
        </Grid>
      </Grid>
      <Stack>
        {data.reviews.map((review, i) => (
          <ReviewPost reviewPost={review} key={i} />
        ))}
        <Grid margin="auto" mb={6}>
          <Pagination
            count={Math.ceil(data.total / limit.size)}
            page={limit.page}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
          />
        </Grid>
      </Stack>
      <ModalWritingReview
        show={show}
        toggleModal={toggleModal}
        setIsSuccess={setIsSuccess}
        productId={id}
      />
    </MKBox>
  );
}

export default ReviewTab;
