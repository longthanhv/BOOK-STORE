import { Divider, Modal, Slide } from "@mui/material";
import MKBox from "../../../../../components/MKBox";
import MKButton from "../../../../../components/MKButton";
import MKTypography from "../../../../../components/MKTypography";

import WarningIcon from "@mui/icons-material/Warning";
import userService from "../../../../../services/user";

function WarningModal({ show, toggleModal, idModal, setIsSuccess }) {
  const handleSubmit = async () => {
    const res = await userService.order.cancel(idModal);
    if (res.status === 200) {
      toggleModal();
      setIsSuccess(true);
    }
  };

  return (
    <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
      <Slide direction="down" in={show} timeout={500}>
        <MKBox
          position="relative"
          width="30%"
          display="flex"
          flexDirection="column"
          borderRadius="xl"
          bgColor="white"
          shadow="xl"
        >
          <MKBox display="flex" alignitems="center" justifyContent="space-between" p={2}>
            <MKTypography variant="h5">Hủy đơn hàng</MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2} sx={{ textAlign: "center" }}>
            <WarningIcon fontSize="large" color="error" />
            <p>Do you really want to cancel this order ({idModal}) ???</p>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="space-between" p={1.5}>
            <MKButton variant="gradient" color="dark" onClick={toggleModal}>
              Cancel
            </MKButton>
            <MKButton variant="gradient" color="error" onClick={handleSubmit}>
              OK
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

export default WarningModal;