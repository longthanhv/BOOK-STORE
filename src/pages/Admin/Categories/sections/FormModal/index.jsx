import { Divider, Grid, Modal, Slide, TextField } from "@mui/material";
import MKBox from "../../../../../components/MKBox";
import MKTypography from "../../../../../components/MKTypography";
import SelectRadio from "../../../../../components/SelectRadio";
import MKInput from "../../../../../components/MKInput";
import MKButton from "../../../../../components/MKButton";
import SelectInput from "../../../../../components/SelectInput";
import { useEffect, useState } from "react";
import adminService from "../../../../../services/admin";

const FORM_CATEGORY = {
  name: "",
  description: "",
};

function FormModal({ show, toggleModal, idModal, setIdModal, setIsSuccess }) {
  const [data, setData] = useState(FORM_CATEGORY);

  const handleSubmit = async () => {
    if (idModal) {
      const res = await adminService.category.edit(idModal, data);
      if (res.status === 200) {
        toggleModal();
        setIsSuccess(true);
      }
    } else {
      const res = await adminService.category.create(data);
      if (res.status === 200) {
        toggleModal();
        setIsSuccess(true);
      }
    }
  };

  //TODO: Get data with id then change data.
  useEffect(() => {
    const fetchData = async () => {
      if (idModal) {
        const res = await adminService.category.getOne(idModal);
        setData({
          name: res.data.category.name,
          description: res.data.category.description,
        });
      }
    };
    fetchData();
  }, [idModal]);

  useEffect(() => {
    if (!show) {
      setData(FORM_CATEGORY);
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
            <MKTypography variant="h5">{idModal ? "Sửa danh mục" : "Thêm danh mục"}</MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <MKBox component="form" role="form">
              <Grid container spacing={2}>
                <Grid item container spacing={2}>
                  <Grid item xs={12}>
                    <MKInput
                      type="text"
                      label="Tên danh mục"
                      fullWidth
                      value={data.name}
                      setValue={setData}
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MKInput
                      type="text"
                      label="Mô tả"
                      fullWidth
                      value={data.description}
                      setValue={setData}
                      name="description"
                      multiline
                      rows={5}
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
              {idModal ? "Sửa danh mục" : "Thêm danh mục"}
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

export default FormModal;
