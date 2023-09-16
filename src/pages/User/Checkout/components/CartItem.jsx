import { ButtonGroup, Grid, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import MKButton from "../../../../components/MKButton";
import MKTypography from "../../../../components/MKTypography";
// Mui Icon
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import cmFn from "../../../../services/common";

function CartItem({ cartItem, setCartItems }) {
  const { productId, productName, price, quantity } = cartItem;
  const handleIncrease = (productId) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        return item.productId === productId ? { ...item, quantity: quantity + 1 } : item;
      });
    });
  };

  const handleDecrease = (productId) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        return item.productId === productId ? { ...item, quantity: quantity - 1 } : item;
      });
    });
  };

  const handleDelete = (productId) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => {
        return item.productId !== productId;
      });
    });
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{productName}</TableCell>
      <TableCell align="right">{cmFn.cvNum(price, false)}</TableCell>
      <TableCell align="right">
        <Grid>
          <ButtonGroup variant="outlined">
            <MKButton
              variant="outlined"
              color="dark"
              onClick={() => {
                handleDecrease(productId);
              }}
              disabled={quantity === 1}
              size="small"
              sx={{ borderRight: 'none !important' }}
            >
              -
            </MKButton>
            <MKButton
              disabled
              size="small"
              variant="outlined"
              color="dark"
              sx={{
                borderLeft: "none !important",
                width: "20px",
              }}
            >
              {quantity}
            </MKButton>
            <MKButton
              variant="outlined"
              color="dark"
              onClick={() => {
                handleIncrease(productId);
              }}
              size="small"
              sx={{ borderLeft: 'none !important' }}
            >
              +
            </MKButton>
          </ButtonGroup>
        </Grid>
      </TableCell>
      <TableCell align="right">{cmFn.cvNum(price * quantity, false)}</TableCell>
      <TableCell align="right">
        <MKButton variant="text" color="secondary" size="large" iconOnly circular>
          <DeleteForeverOutlinedIcon
            onClick={() => {
              handleDelete(productId);
            }}
          />
        </MKButton>
      </TableCell>
    </TableRow>
  );
}

export default CartItem;
