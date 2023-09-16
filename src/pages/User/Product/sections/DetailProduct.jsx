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
import ButtonGroup from "@mui/material/ButtonGroup";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBadge from "components/MKBadge";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

// React
import { useState } from "react";

// Material Icon
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";

function DetailProduct({ product }) {
  const { id, name, price, priceOnSale, ratingInfo } = product;
  const { totalRating, totalStats } = ratingInfo;
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(quantity - 1);
  };

  const handleAddCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let isNew = true;
    for (const item of cart) {
      if (item.productId === id) {
        item.quantity += 1;
        isNew = false;
      }
    }
    localStorage.setItem(
      "cart",
      isNew
        ? JSON.stringify([
            ...cart,
            { productId: id, productName: name, price: priceOnSale || price, quantity: quantity },
          ])
        : JSON.stringify(cart)
    );
  };

  const handleBuyNow = () => {
    handleAddCart();
    navigate("/checkout");
  };

  return (
    <MKBox lineHeight={1}>
      {priceOnSale ? (
        <MKBadge variant="contained" color="info" badgeContent="Khuyến mãi" container sx={{ mb: 1 }} />
      ) : null}
      <MKTypography variant="h3" mb={1}>
        {name || "Tên sản phẩm"}
      </MKTypography>
      <MKBox sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Rating name="half-rating-read" value={totalRating / totalStats} precision={0.1} readOnly />
        <MKTypography variant="subtitle2" ml={1}>
          ({totalStats} Đánh giá)
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
      <Grid container justifyContent="space-between" flexDirection={{ xs: "column", sm: "row" }}>
        <Grid>
          <MKTypography variant="subtitle1" ml={1} fontWeight="regular">
            Số lượng:
          </MKTypography>
        </Grid>
        <Grid>
          <ButtonGroup variant="outlined">
            <MKButton
              variant="outlined"
              color="dark"
              onClick={handleDecrease}
              disabled={quantity == 1}
              size="small"
            >
              -
            </MKButton>
            <MKInput
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#344767 !important",
                  borderRadius: 0,
                  borderLeft: 0,
                  borderRight: 0,
                },
                "& .MuiOutlinedInput-input": {
                  textAlign: "center",
                  width: 50,
                },
              }}
              size="small"
              value={quantity}
              disabled
            />
            <MKButton
              variant="outlined"
              color="dark"
              onClick={handleIncrease}
              size="small"
              sx={{ borderLeft: 0 }}
              disabled={quantity === product.quantity}
            >
              +
            </MKButton>
          </ButtonGroup>
          <MKTypography variant="subtitle2" ml={1} textAlign="right" mt={0.5}>
            Có sẵn: {product.quantity}
          </MKTypography>
        </Grid>
      </Grid>
      <Divider sx={{ color: "#344767", opacity: 0.75 }} />
      <Grid container justifyContent="space-around" pt={1}>
        <Grid item xs={5}>
          <MKButton color="warning" fullWidth onClick={handleAddCart}>
            <AddShoppingCartIcon />
            &nbsp; Thêm vào giỏ hàng
          </MKButton>
        </Grid>
        <Grid item xs={5}>
          <MKButton color="success" fullWidth onClick={handleBuyNow}>
            Mua ngay
          </MKButton>
        </Grid>
      </Grid>
    </MKBox>
  );
}

export default DetailProduct;
