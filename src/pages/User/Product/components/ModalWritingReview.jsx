import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { Rating } from "@mui/material";
import MKInput from "../../../../components/MKInput";
import userService from "../../../../services/user";

const NEW_REVIEW = {
  rating: 0,
  description: "",
};

function ModalWritingReview({ show, toggleModal, setIsSuccess, productId }) {
  const [newReview, setNewReview] = useState(NEW_REVIEW);

  const handleSubmit = async () => {
    const res = await userService.review.create(productId, newReview);
    if (res.status === 200) {
      toggleModal();
      setIsSuccess(true);
    }
  };

  return (
    <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
      <Slide direction="down" in={show} timeout={500}>
        <MKBox
          position="relative"
          width="800px"
          display="flex"
          flexDirection="column"
          borderRadius="xl"
          bgColor="white"
          shadow="xl"
        >
          <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
            <MKTypography variant="h5">Đánh giá</MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <Grid container spacing={2}>
              <Grid container item alignItems="center">
                <Grid item>
                  <MKTypography variant="body2" sx={{ mr: 1 }}>
                    Đánh giá của bạn:{" "}
                  </MKTypography>
                </Grid>
                <Rating
                  value={newReview.rating}
                  onChange={(event, newValue) => {
                    setNewReview((curReview) => {
                      return {
                        ...curReview,
                        rating: newValue,
                      };
                    });
                  }}
                />
              </Grid>
              <Grid container item>
                <MKInput
                  fullWidth
                  type="text"
                  label="Đánh giá"
                  name="description"
                  value={newReview.description}
                  setValue={setNewReview}
                  multiline
                  rows={5}
                />
              </Grid>
            </Grid>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="space-between" p={1.5}>
            <MKButton variant="gradient" color="dark" onClick={toggleModal}>
              Hủy
            </MKButton>
            <MKButton variant="gradient" color="success" onClick={handleSubmit}>
              Đánh giá
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

export default ModalWritingReview;
