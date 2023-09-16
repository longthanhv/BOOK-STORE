/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// 162

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Presentation page components
import Products from "../components/Products";

// Data

function Categories({ categories }) {
  const renderData = categories.map(({ id, name, description, products }) => (
    <Grid container spacing={3} sx={{ mb: 10 }} key={id}>
      <Grid item xs={12} lg={3}>
        <MKBox position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
          <MKTypography
            variant="h3"
            fontWeight="bold"
            mb={1}
            component={Link}
            to={`/category/${id}`}
          >
            {name}
          </MKTypography>
          <MKTypography variant="body2" fontWeight="regular" color="secondary" mb={1} pr={2}>
            {description}
          </MKTypography>
        </MKBox>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={3}>
          {products.map(({ proId, proName, price, priceOnSale, image }) => (
            <Grid item xs={12} md={4} sx={{ mb: 2 }} key={proId}>
              <Link
                to={`/product/${proId}`}
                state={{ category: { name: name, id: id } }}
              >
                <Products
                  image={image}
                  name={proName}
                  count={priceOnSale || price}
                  sale={priceOnSale}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  ));

  return (
    <MKBox component="section">
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          <MKTypography variant="h2" fontWeight="bold">
           Sách việt
          </MKTypography>
          <MKTypography variant="body1" color="text">
            Mỗi ngày tôi chọn một cuốn sách
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>{renderData}</Container>
    </MKBox>
  );
}

export default Categories;
