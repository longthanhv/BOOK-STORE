import { ButtonGroup, Grid, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import MKButton from "../../../../components/MKButton";
import MKTypography from "../../../../components/MKTypography";
// Mui Icon
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import cmFn from "../../../../services/common";

function CartItem({ cartItem }) {
  const { productId, name, price, quantity } = cartItem;
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{productId}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell align="right">{cmFn.cvNum(price, false)}</TableCell>
      <TableCell align="right">{quantity}</TableCell>
      <TableCell align="right">{cmFn.cvNum(price * quantity, false)}</TableCell>
    </TableRow>
  );
}

export default CartItem;
