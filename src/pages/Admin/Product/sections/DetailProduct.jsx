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
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";

// Material Kit 2 React components
import MKBadge from "components/MKBadge";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function DetailProduct({ product }) {
  const { name, price, priceOnSale, ratingInfo } = product;
  const { totalRating, totalStats } = ratingInfo;
  return (
    <MKBox lineHeight={1}>
      {priceOnSale ? (
        <MKBadge variant="contained" color="info" badgeContent="Sale" container sx={{ mb: 1 }} />
      ) : null}
      <MKTypography variant="h3" mb={1}>
        {name || "Name of Product"}
      </MKTypography>
      <MKBox sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Rating
          name="half-rating-read"
          value={totalRating / totalStats}
          precision={0.1}
          readOnly
        />
        <MKTypography variant="subtitle2" ml={1}>
          ({totalStats} reviews)
        </MKTypography>
      </MKBox>
      <MKTypography variant="h6" mb={1}>
        {priceOnSale ? (
          <strike style={{ marginRight: 16, display: "inline-block", opacity: 0.5 }}>
            {price} VND
          </strike>
        ) : null}
        {priceOnSale ? priceOnSale : price} VND
      </MKTypography>
      <Divider sx={{ color: "#344767", opacity: 0.75 }} />
    </MKBox>
  );
}

export default DetailProduct;
