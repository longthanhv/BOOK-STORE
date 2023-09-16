import { Divider, Modal, Slide } from "@mui/material";

import WarningIcon from "@mui/icons-material/Warning";
import MKBox from "../../../../components/MKBox";
import MKButton from "../../../../components/MKButton";
import adminService from "../../../../services/admin";
import MKTypography from "../../../../components/MKTypography";

import momoQrCode from "../../../../assets/images/products/momo-upload-api-220418155002-637858938029609599.jfif";
import vnpayQrCode from "../../../../assets/images/products/maqrkalite.jpg";

function OrderSuccessModal({ show, toggleModal, orderId, orderInfo }) {
  const { paymentOption } = orderInfo;
  console.log(paymentOption);
  const handleSubmit = async () => {
    window.location.reload();
  };

  return (
    <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
      <Slide direction="down" in={show} timeout={500}>
        <MKBox
          position="relative"
          width="70%"
          display="flex"
          flexDirection="column"
          borderRadius="xl"
          bgColor="white"
          shadow="xl"
        >
          <MKBox display="flex" alignitems="center" justifyContent="space-between" p={2}>
            <MKTypography variant="h5">Tạo đơn hàng thành công !</MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2} sx={{ textAlign: "center" }}>
            <p>Mã đơn hàng: ({orderId})</p>
            {paymentOption === "momo" ? (
              <>
              <p>Quét mã QR để thanh toán </p>
                <MKBox
                  component="img"
                  src={momoQrCode}
                  alt="momo-qr-code"
                  width="auto"
                  height="280px"
                />
              </>
            ) : (
              <>
                <p>Please scan this QR Code for payment: </p>
                <MKBox
                  component="img"
                  src={vnpayQrCode}
                  alt="vnpay-qr-code"
                  width="auto"
                  height="280px"
                />
              </>
            )}
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="end" p={1.5}>
            <MKButton variant="gradient" color="success" onClick={handleSubmit}>
              Hoàn thành
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

export default OrderSuccessModal;
