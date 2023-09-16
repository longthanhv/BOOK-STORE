import { Divider, Grid, Modal, Slide } from "@mui/material";
import { useState } from "react";
import MKBox from "../../../../../components/MKBox";
import MKButton from "../../../../../components/MKButton";
import MKInput from "../../../../../components/MKInput";
import MKTypography from "../../../../../components/MKTypography";
import authService from "../../../../../services/auth/authService";

function ModalEditPassword({ show, toggleModal, setIsSuccess }) {
  const [data, setData] = useState({
    oldPw: "",
    newPw: "",
    confimNewPw: "",
  });

  const handleSubmit = async () => {
    const res = await authService.changePw(data);
    if (res.status === 200) {
      window.location.reload();
    }
  };
  console.log(data);
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
            <MKTypography variant="h5">Thay đổ mật khẩu</MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <MKBox component="form" role="form">
              <Grid container spacing={2}>
                <Grid item container spacing={2}>
                  <Grid item xs={12}>
                    <MKInput
                      type="password"
                      label="Mật khẩu cũ"
                      fullWidth
                      value={data.oldPw}
                      setValue={setData}
                      name="oldPw"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MKInput
                      type="password"
                      label="Mật khẩu mới"
                      fullWidth
                      value={data.newPw}
                      setValue={setData}
                      name="newPw"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MKInput
                      type="password"
                      label="Nhập lại mật khẩu mới"
                      fullWidth
                      value={data.confimNewPw}
                      setValue={setData}
                      name="confimNewPw"
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
            <MKButton
              variant="gradient"
              color="success"
              onClick={handleSubmit}
              disabled={!data.newPw.length || data.newPw !== data.confimNewPw}
            >
              Lưu
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

export default ModalEditPassword;
