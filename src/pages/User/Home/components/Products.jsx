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
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function Products({ image, name, count, sale, ...rest }) {
  const imageTemplate = (
    <MKBox
      bgColor="white"
      borderRadius="xl"
      shadow="lg"
      minHeight="10rem"
      sx={{
        textAlign: "center",
        overflow: "hidden",
        transform: "perspective(999px) rotateX(0deg) translate3d(0, 0, 0)",
        transformOrigin: "50% 0",
        backfaceVisibility: "hidden",
        willChange: "transform, box-shadow",
        transition: "transform 200ms ease-out",

        "&:hover": {
          transform: "perspective(999px) rotateX(7deg) translate3d(0px, -4px, 5px)",
        },
      }}
      {...rest}
    >
      {sale ? (
        <MKBox position="absolute" top={0} right={0} zIndex={2} p={1}>
          <LoyaltyOutlinedIcon />
        </MKBox>
      ) : null}
      <MKBox
        component="img"
        src={image}
        alt={name}
        width="150px"
        height="150px"
        opacity={sale ? 0.6 : 1}
      />
    </MKBox>
  );

  return (
    <MKBox position="relative">
      <Tooltip title={name} placement="top">
        {imageTemplate}
      </Tooltip>
      <MKBox mt={1} ml={1} lineHeight={1}>
        {name && (
          <MKTypography variant="h6" fontWeight="bold">
            {name}
          </MKTypography>
        )}
        {count > 0 && (
          <MKTypography variant="button" fontWeight="regular" color="secondary">
            {count} VND
          </MKTypography>
        )}
      </MKBox>
    </MKBox>
  );
}

export default Products;
