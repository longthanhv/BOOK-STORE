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
import CartItem from "../components/CartItem";

//Image
import emptyCartImage from "../../../../assets/images/products/illustration_empty_cart.svg";
import SelectRadio from "../../../../components/SelectRadio";

function createItem(id, value) {
  return { id, value };
}

const deliveryOptions = [
  createItem(
    0,
    <MKBox>
      <MKTypography variant="h6">Giao hàng tiết kiệm </MKTypography>
      <MKTypography variant="body2">Miễn phí</MKTypography>
    </MKBox>
  ),
  createItem(
    20000,
    <MKBox>
      <MKTypography variant="h6">Giao hàng nhanh</MKTypography>
      <MKTypography variant="body2">Phí ship 20000 VNĐ</MKTypography>
    </MKBox>
  ),
];

const paymentOptions = [
  createItem(
    "cash",
    <MKBox>
      <MKTypography variant="h6">Thanh toán tiền mặt</MKTypography>
      <MKTypography variant="body2">Thanh toán khi nhận hàng</MKTypography>
    </MKBox>
  ),
  createItem(
    "momo",
    <MKBox>
      <MKTypography variant="h6">Chuyển khoản ngân hàng</MKTypography>
      <MKTypography variant="body2">
        Quét mã QR để thanh toán
      </MKTypography>
    </MKBox>
  ),
  // createItem(
  //   "vnpay",
  //   <MKBox>
  //     <MKTypography variant="h6">Pay with VNPay</MKTypography>
  //     <MKTypography variant="body2">
  //       You will be redirected to VNPay website to complete your purchase securely.
  //     </MKTypography>
  //   </MKBox>
  // ),
];

const radioStyle = {
  display: "flex",
  "& .MuiFormGroup-root": { gap: 2 },
  "& .MuiFormControlLabel-root": {
    opacity: 0.8,
    borderRadius: 3,
    display: "flex",
    flexGrow: 1,
    boxShadow: "#919eab33 0px 0px 2px 0px, #919eab33 0px 12px 24px -4px;",
    p: 2,
    m: 0,
  },
  "& .MuiFormControlLabel-root:has(.Mui-checked)": {
    opacity: 1,
  },
};

function Payment({ handlePreviousStep, orderInfo, setOrderInfo }) {
  const { shipping, paymentOption } = orderInfo;
  return (
    <>
      <MKBox borderRadius="xl" shadow="myCustom_1" sx={{ p: 3, mb: 2 }}>
        <MKTypography variant="h5" sx={{ mb: 3 }}>
          Hình thức giao hàng
        </MKTypography>
        <SelectRadio
          row
          items={deliveryOptions}
          color="success"
          myStyle={radioStyle}
          value={shipping}
          setValue={setOrderInfo}
          name="shipping"
        />
      </MKBox>
      <MKBox borderRadius="xl" shadow="myCustom_1" sx={{ p: 3, mb: 2 }}>
        <MKTypography variant="h5" sx={{ mb: 3 }}>
          Phương thức thanh toán
        </MKTypography>
        <SelectRadio
          items={paymentOptions}
          color="success"
          myStyle={radioStyle}
          value={paymentOption}
          setValue={setOrderInfo}
          name="paymentOption"
        />
      </MKBox>
      <MKButton variant="text" color="secondary" onClick={handlePreviousStep}>
        <KeyboardArrowLeftIcon /> Quay lại
      </MKButton>
    </>
  );
}

export default Payment;
