import { Divider, Grid, Modal, Slide } from "@mui/material";
import { useEffect, useState } from "react";
import MKBox from "../../../../../components/MKBox";
import MKButton from "../../../../../components/MKButton";
import MKInput from "../../../../../components/MKInput";
import MKTypography from "../../../../../components/MKTypography";
import profileService from "../../../../../services/auth/profileService";
import { useRef } from "react";
import ImageIcon from "@mui/icons-material/Image";

function ModalEditAvatar({ show, toggleModal, setIsSuccess }) {
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleSubmit = async () => {
    const res = await profileService.editAvatar({ avatar: image });
    if (res.status === 200) {
      setIsSuccess(true);
      toggleModal();
    }
  };

  console.log(image, "im");

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
            <MKTypography variant="h5">Thay ảnh đại diện</MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <MKBox component="form" role="form">
              <Grid container spacing={2}>
                <Grid item container spacing={2}>
                  <MKInput
                    type="file"
                    inputRef={hiddenFileInput}
                    inputProps={{
                      multiple: true,
                      accept: "image/png, image/gif, image/jpeg",
                    }}
                    onChange={(e) => {
                      console.log(e.target);
                      setImage(e.target.files[0]);
                    }}
                    sx={{ position: "absolute", display: "none" }}
                  />
                  <Grid item xs={3}>
                    <MKButton
                      onClick={() => {
                        hiddenFileInput.current.click();
                      }}
                      fullWidth
                      color="success"
                    >
                      <ImageIcon sx={{ mr: 2 }} /> Chọn ảnh
                    </MKButton>
                  </Grid>
                  <Grid item xs={9}>
                    <MKBox
                      shadow="inset"
                      py={2}
                      bgColor="grey-100"
                      sx={{
                        height: "250px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt={image.name}
                          loading="lazy"
                          style={{
                            margin: "auto",
                            display: "block",
                            height: "200px",
                            width: "200px",
                            objectFit: "contain",
                          }}
                          key="img-field"
                        />
                      ) : null}
                    </MKBox>
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
              disabled={image === null}
            >
              Lưu
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

export default ModalEditAvatar;
