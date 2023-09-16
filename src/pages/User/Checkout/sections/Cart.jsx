// Mui components
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

// MK Mui components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Mui Icon
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

// Link
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";

//Image
import emptyCartImage from "../../../../assets/images/products/illustration_empty_cart.svg";

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  return (
    <>
      <MKBox borderRadius="xl" shadow="myCustom_1" sx={{ mb: 2, minHeight: 400 }}>
        <MKTypography variant="h5" sx={{ p: 3 }}>
          Giỏ hàng <span style={{ fontWeight: 400, fontSize: "1rem" }}>({cartItems.length} item)</span>
        </MKTypography>
        {cartItems.length ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                display: "table-header-group",
                backgroundColor: "#F4F6F8",
                "& .MuiTableCell-head": { color: "#637381", fontWeight: 500 },
              }}
            >
              <TableRow>
                <TableCell>Sản phẩm</TableCell>
                <TableCell align="right">Giá</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell align="right">Tổng </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((cartItem) => (
                <CartItem
                  key={cartItem.productId}
                  cartItem={cartItem}
                  setCartItems={setCartItems}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box sx={{ pt: 4, pb: 8, "& img": { width: "300px", display: "block", m: "auto" } }}>
            <img src={emptyCartImage} alt="empty-cart" />
            <MKTypography textAlign="center" variant="h5" sx={{ mt: 5 }}>
              Giỏ hàng trống
            </MKTypography>
            <MKTypography textAlign="center" variant="subtitle2" sx={{ mt: 1 }}>
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </MKTypography>
          </Box>
        )}
      </MKBox>
      <MKButton variant="text" color="secondary" onClick={() => navigate(-1)}>
        <KeyboardArrowLeftIcon /> Tiếp tục mua sắm
      </MKButton>
    </>
  );
}

export default Cart;
