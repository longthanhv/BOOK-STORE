import { Divider, Grid, Modal, Slide, TextField } from "@mui/material";
import MKBox from "../../../../../components/MKBox";
import MKTypography from "../../../../../components/MKTypography";
import SelectRadio from "../../../../../components/SelectRadio";
import MKInput from "../../../../../components/MKInput";
import MKButton from "../../../../../components/MKButton";
import SelectInput from "../../../../../components/SelectInput";
import { useEffect, useState } from "react";
import adminService from "../../../../../services/admin";
import profileService from "../../../../../services/auth/profileService";

function ModalEditProfile({ show, toggleModal, setIsSuccess, data }) {
  const [dataUser, setDataUser] = useState(data);

  const handleSubmit = async () => {
    const res = await profileService.edit(dataUser);
    if (res.status === 200) {
      setIsSuccess(true);
      toggleModal();
    }
  };

  useEffect(() => {
    setDataUser(data);
  }, [data]);

  return (
    <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
      <Slide direction="down" in={show} timeout={500}>
        <MKBox
          position="relative"
          width="50%"
          display="flex"
          flexDirection="column"
          borderRadius="xl"
          bgColor="white"
          shadow="xl"
        >
          <MKBox display="flex" alignitems="center" justifyContent="space-between" p={2}>
            <MKTypography variant="h5">Chỉnh sửa thông tin cá nhân</MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <MKBox component="form" role="form">
              <Grid container spacing={2}>
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <MKInput
                      type="text"
                      label="Name"
                      fullWidth
                      value={dataUser.name}
                      setValue={setDataUser}
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MKInput
                      type="text"
                      label="Phone"
                      fullWidth
                      value={dataUser.phone}
                      setValue={setDataUser}
                      name="phone"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </MKBox>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="space-between" p={1.5}>
            <MKButton variant="gradient" color="dark" onClick={toggleModal}>
              Cancel
            </MKButton>
            <MKButton variant="gradient" color="success" onClick={handleSubmit}>
              Save
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

export default ModalEditProfile;
