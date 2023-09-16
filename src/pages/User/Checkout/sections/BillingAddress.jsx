// Mui components
import {
  Box,
  Grid
} from "@mui/material";

// MK Mui components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Mui Icon
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

// Image
import emptyAddressImage from "../../../../assets/images/products/empty-address.png";

// My Component
import { useState } from "react";
import AddressCard from "../components/AddressCard";
import ModalNewAddress from "../components/ModalNewAddress";

function BillingAddress({
  addressInfos,
  handleNextStep,
  handlePreviousStep,
  setOrderInfo,
  setIsSuccess,
}) {

  const [show, setShow] = useState(false);
  const toggleModal = () => {
    setShow(!show);
    setIsSuccess(false);
  };

  return (
    <>
      <MKBox sx={{ minHeight: 400 }}>
        {addressInfos.length ? (
          addressInfos.map((addressInfo, index) => {
            return (
              <AddressCard
                key={index}
                index={index}
                addressInfo={addressInfo}
                handleNextStep={handleNextStep}
                setOrderInfo={setOrderInfo}
                setIsSuccess={setIsSuccess}
              />
            );
          })
        ) : (
          <Box sx={{ pt: 4, pb: 8, "& img": { width: "300px", display: "block", m: "auto" } }}>
            <img src={emptyAddressImage} alt="empty-address" />
            <MKTypography textAlign="center" variant="h5" sx={{ mt: 5 }}>
              Không tìm thấy địa chỉ
            </MKTypography>
            <MKTypography textAlign="center" variant="subtitle2" sx={{ mt: 1 }}>
              Bạn chưa thêm địa chỉ nhận hàng
            </MKTypography>
          </Box>
        )}
      </MKBox>
      <Grid container>
        <Grid flexGrow={1}>
          <MKButton variant="text" color="secondary" onClick={handlePreviousStep}>
            <KeyboardArrowLeftIcon /> Quay lại
          </MKButton>
        </Grid>
        <Grid>
          <MKButton
            variant="gradient"
            color="success"
            size="small"
            sx={{ "& .MuiSvgIcon-root": { mr: 1, fontSize: "1rem !important" } }}
            onClick={toggleModal}
          >
            <AddIcon /> Thêm mới địa chỉ
          </MKButton>
        </Grid>
      </Grid>
      <ModalNewAddress show={show} toggleModal={toggleModal} setIsSuccess={setIsSuccess} />
    </>
  );
}

export default BillingAddress;
