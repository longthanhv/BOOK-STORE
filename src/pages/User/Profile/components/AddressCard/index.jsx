// Mui components
import { Grid } from "@mui/material";

// MK Mui components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import profileService from "../../../../../services/auth/profileService";

function AddressCard({ index, addressInfo, setIsSuccess }) {
  const { name, isOffice, address, phone } = addressInfo;

  const handleDelete = async (index) => {
    setIsSuccess(false);
    const res = await profileService.delAddress(index);
    if (res.status === 200) {
      setIsSuccess(true);
    }
  };

  return (
    <MKBox
      borderRadius="xl"
      shadow="myCustom_1"
      sx={{
        my: 1,
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
            color="warning"
            size="small"
            sx={{ mr: 2 }}
            onClick={() => {
              handleDelete(index);
              setIsSuccess(false);
            }}
          >
            Xóa
          </MKButton>
        </Grid>
      </Grid>
    </MKBox>
  );
}

export default AddressCard;
