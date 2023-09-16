import { Divider, Grid, Modal, Slide, TextField } from "@mui/material";
import MKBox from "../../../../components/MKBox";
import MKTypography from "../../../../components/MKTypography";
import SelectRadio from "../../../../components/SelectRadio";
import MKInput from "../../../../components/MKInput";
import MKButton from "../../../../components/MKButton";
import SelectInput from "../../../../components/SelectInput";
import { useState } from "react";
import profileService from "../../../../services/auth/profileService";

function createCity(id, value) {
  return { id, value };
}

function createTypeAddress(id, value) {
  return { id, value };
}

const types = [createTypeAddress(1, "Office"), createTypeAddress(0, "Home")];

const NEW_ADDRESS = {
  isOffice: 1,
  name: "",
  phone: "",
  address: "",
};

function ModalNewAddress({ show, toggleModal, setIsSuccess }) {
  const [newAddress, setNewAddress] = useState(NEW_ADDRESS);

  const handleSubmit = async () => {
    const res = await profileService.addAddress(newAddress);
    if (res.status === 200) {
      console.log(setIsSuccess, "okee");
      setIsSuccess(true);
      toggleModal();
    }
  };

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
          <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
            <MKTypography variant="h5">Add new address</MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <MKBox component="form" role="form">
              <Grid container spacing={2}>
                <Grid item container spacing={2}>
                  <Grid item>
                    <SelectRadio
                      row
                      items={types}
                      color="success"
                      value={newAddress.isOffice}
                      setValue={setNewAddress}
                      name="isOffice"
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <MKInput
                      type="text"
                      label="Full Name"
                      fullWidth
                      value={newAddress.name}
                      setValue={setNewAddress}
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MKInput
                      type="text"
                      label="Phone"
                      fullWidth
                      value={newAddress.phone}
                      setValue={setNewAddress}
                      name="phone"
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12}>
                    <MKInput
                      type="text"
                      label="Address"
                      fullWidth
                      value={newAddress.address}
                      setValue={setNewAddress}
                      name="address"
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
              Add this address
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

export default ModalNewAddress;
