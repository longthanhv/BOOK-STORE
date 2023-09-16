import { Divider, Grid, Modal, Slide, TextField } from "@mui/material";
import MKBox from "../../../../../components/MKBox";
import MKTypography from "../../../../../components/MKTypography";
import SelectRadio from "../../../../../components/SelectRadio";
import MKInput from "../../../../../components/MKInput";
import MKButton from "../../../../../components/MKButton";
import SelectInput from "../../../../../components/SelectInput";
import { useEffect, useState } from "react";
import adminService from "../../../../../services/admin";
import DatePicker from "react-flatpickr";

const FORM = {
  code: "",
  discount: "",
  type: "",
  expriesDate: new Date(),
};

function AddModal({ show, toggleModal, setIsSuccess, types }) {
  const [data, setData] = useState(FORM);

  const handleSubmit = async () => {
    const res = await adminService.discount.create(data);
    if (res.status === 200) {
      toggleModal();
      setIsSuccess(true);
    }
  };

  useEffect(() => {
    if (!show) {
      setData(FORM);
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
            <MKTypography variant="h5">Thêm khuyến mãi</MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <MKBox component="form" role="form">
              <Grid container spacing={2}>
                <Grid item container spacing={2}>
                  <Grid item xs={4}>
                    <MKInput
                      type="text"
                      label="Code"
                      fullWidth
                      value={data.code}
                      setValue={setData}
                      name="code"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <SelectInput
                      label="Kiểu khuyến mãi"
                      items={types}
                      value={data.type}
                      setValue={setData}
                      name="type"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <MKInput
                      type="number"
                      label="Khuyến mãi"
                      fullWidth
                      value={data.discount}
                      setValue={setData}
                      name="discount"
                      disabled={data.type === "freeShip"}
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
              Thêm
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

export default AddModal;
