// Mui components
import {
  Box,
  ButtonGroup,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

// MK Mui components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Mui Icon
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

// Link
import { Link } from "react-router-dom";

//Image
import emptyCartImage from "../../../../assets/images/products/illustration_empty_cart.svg";
import CartItem from "./CartItems";

function Cart({ cartItems }) {
  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead
        sx={{
          display: "table-header-group",
          backgroundColor: "#F4F6F8",
          "& .MuiTableCell-head": { color: "#637381", fontWeight: 500 },
        }}
      >
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Tên sản phẩm</TableCell>
          <TableCell align="right">Giá</TableCell>
          <TableCell align="right">Số lượng</TableCell>
          <TableCell align="right">Tổng tiền</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.productId} cartItem={cartItem} />
        ))}
      </TableBody>
    </Table>
  );
}

export default Cart;
