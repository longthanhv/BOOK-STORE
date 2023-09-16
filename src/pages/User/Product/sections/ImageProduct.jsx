// Materital UI
import Grid from "@mui/material/Grid";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";

// Material UI Icon
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// Material Kit
import MKBox from "components/MKBox";

// React
import { useState } from "react";

function ImageProducts({ images, name }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} key={activeStep}>
        <MKBox bgColor="white" shadow="lg" sx={{ textAlign: "center" }}>
          {(
            <MKBox
              component="img"
              src={images[activeStep]}
              alt={name}
              width="auto"
              height="280px"
            />
          ) || <Skeleton variant="rounded" width={210} height={60} />}
        </MKBox>
      </Grid>
      <Grid item xs={12}>
        <MobileStepper
          variant="dots"
          steps={images.length}
          position="static"
          activeStep={activeStep}
          sx={{ flexGrow: 1 }}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === images.length - 1}>
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
}

export default ImageProducts;
