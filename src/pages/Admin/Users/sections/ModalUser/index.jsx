import { Divider, Grid, Modal, Slide, TextField } from "@mui/material";
import MKBox from "../../../../../components/MKBox";
import MKTypography from "../../../../../components/MKTypography";
import SelectRadio from "../../../../../components/SelectRadio";
import MKInput from "../../../../../components/MKInput";
import MKButton from "../../../../../components/MKButton";
import SelectInput from "../../../../../components/SelectInput";
import { useEffect, useState } from "react";
import adminService from "../../../../../services/admin";

const EDIT_USER = {
  name: "",
  phone: "",
};

const NEW_USER = {
  name: "",
  phone: "",
  username: "",
  password: "",
};

function ModalUser({ show, toggleModal, idModal, setIdModal, setIsSuccess }) {
  const [dataUser, setDataUser] = useState(idModal ? NEW_USER : EDIT_USER);

  const handleSubmit = async () => {
    if (idModal) {
      const res = await adminService.user.edit(idModal, dataUser);
      if (res.status === 200) {
        toggleModal();
        setIsSuccess(true);
      }
    } else {
      const res = await adminService.user.create(dataUser);
      if (res.status === 200) {
        toggleModal();
        setIsSuccess(true);
      }
    }
  };

  //TODO: Get data with id then change dataUser.
  useEffect( () => {
    const fetchData = async()=>{
      if (idModal) {
      const res = await adminService.user.getOne(idModal);
      await setDataUser({
        name: res.data.user.name,
        phone: res.data.user.phone,
      });
    }
    }
    fetchData()
  }, [idModal]);

  useEffect(() => {
    if (!show) {
      setDataUser(NEW_USER);
      setIdModal(null);
    }
  }, [show]);

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
            <MKTypography variant="h5">{idModal ? "Sửa thông tin người dùng" : "Thêm người dùng"}</MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <MKBox component="form" role="form">
              <Grid container spacing={2}>
                <Grid item container spacing={2}>
                  {!idModal && (
                    <>
                      <Grid item xs={6}>
                        <MKInput
                          type="text"
                          label="Tên đăng nhập"
                          fullWidth
                          value={dataUser.username}
                          setValue={setDataUser}
                          name="username"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MKInput
                          type="text"
                          label="Mật khẩu"
                          fullWidth
                          value={dataUser.password}
                          setValue={setDataUser}
                          name="password"
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={6}>
                    <MKInput
                      type="text"
                      label="Tên người dùng"
                      fullWidth
                      value={dataUser.name}
                      setValue={setDataUser}
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MKInput
                      type="text"
                      label="SĐT"
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
              Hủy
            </MKButton>
            <MKButton variant="gradient" color="success" onClick={handleSubmit}>
              {idModal ? "Sửa" : "Thêm"}
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

export default ModalUser;
