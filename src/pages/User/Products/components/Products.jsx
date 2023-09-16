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
import PropTypes from "prop-types";

// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";

function Products({ image, name, price, priceOnSale, ...rest }) {
  const imageTemplate = (
    <MKBox
      bgColor="white"
      borderRadius="xl"
      shadow="lg"
      minHeight="10rem"
      sx={{
        overflow: "hidden",
        transform: "perspective(999px) rotateX(0deg) translate3d(0, 0, 0)",
        transformOrigin: "50% 0",
        backfaceVisibility: "hidden",
        willChange: "transform, box-shadow",
        transition: "transform 200ms ease-out",
        textAlign: "center",
        "&:hover": {
          transform: "perspective(999px) rotateX(7deg) translate3d(0px, -4px, 5px)",
        },
      }}
      {...rest}
    >
      {priceOnSale ? (
        <MKBox position="absolute" top={0} right={0} zIndex={2} p={1}>
          <LoyaltyOutlinedIcon />
        </MKBox>
      ) : null}
      <MKBox
        component="img"
        src={image}
        alt={name}
        height="160px"
        width="auto"
        opacity={priceOnSale ? 0.6 : 1}
      />
    </MKBox>
  );

  return (
    <MKBox position="relative">
      <Tooltip title={name} placement="top">
        {imageTemplate}
      </Tooltip>
      <MKBox mt={1} ml={1} lineHeight={1}>
        <MKTypography variant="h6" fontWeight="bold">
          {name}
        </MKTypography>
        <MKTypography variant="button" fontWeight="regular" color="secondary">
          {priceOnSale ? priceOnSale : price} VND
        </MKTypography>
      </MKBox>
    </MKBox>
  );
}

export default Products;
