// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Icon
import CheckIcon from "@mui/icons-material/Check";

import ProgressStep from "./ProgressStep";

function ProgressBar({ progress }) {
  const renderProgress = progress.map(({ label, status }, index) => {
    return (
      <ProgressStep firstItem={index} key={index} status={status} label={label}>
        {status === "done" ? <CheckIcon /> : index + 1}
      </ProgressStep>
    );
  });

  return (
    <MKBox bgColor="grey-100" py={3} px={10} shadow="md" borderRadius="xl">
      <Grid container wrap="nowrap">
        {renderProgress}
      </Grid>
    </MKBox>
  );
}

export default ProgressBar;
