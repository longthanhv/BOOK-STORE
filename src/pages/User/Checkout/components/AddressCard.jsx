// Mui components
import { Grid } from "@mui/material";

// MK Mui components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import profileService from "../../../../services/auth/profileService";

function AddressCard({ index, addressInfo, handleNextStep, setOrderInfo, setIsSuccess }) {
  const { name, isOffice, address, phone } = addressInfo;

  const handleDelete = async (index) => {
    setIsSuccess(false);
    const res = await profileService.delAddress(index);
    if (res.status === 200) {
      setIsSuccess(true);
    }
  };

  const handleOnClick = () => {
    setOrderInfo((curOrderInfo) => {
      return {
        ...curOrderInfo,
        address: index,
      };
    });
    handleNextStep();
  };

  return (
    <MKBox
      borderRadius="xl"
      shadow="myCustom_1"
      sx={{
        mb: 2,
        p: 2,
        pt: 3,
        pl: 3,
        "& .MuiTypography-root:not(:last-child)": { mb: 0.5 },
      }}
    >
      <Grid container alignItems="flex-end">
        <Grid flexGrow={1}>
          <MKTypography variant="h6">
            {name} ({isOffice ? "Công ty" : "Nhà"})
          </MKTypography>
          <MKTypography variant="subtitle2">{address}</MKTypography>
          <MKTypography variant="body2">{phone}</MKTypography>
        </Grid>
        <Grid>
          <MKButton
            variant="outlined"
            color="dark"
            size="small"
            sx={{ mr: 2 }}
            onClick={() => {
              handleDelete(index);
            }}
          >
            Xóa
          </MKButton>
          <MKButton variant="outlined" color="success" size="small" onClick={handleOnClick}>
            Chọn 
          </MKButton>
        </Grid>
      </Grid>
    </MKBox>
  );
}

export default AddressCard;
