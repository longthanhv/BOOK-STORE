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

// @mui material components
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import { useEffect, useState } from "react";

// BaseLayout
import MyBaseLayout from "../../../layouts/MyBaseLayout";

// Component
import DescriptionProduct from "./sections/DescriptionProduct";
import DetailProduct from "./sections/DetailProduct";
import ImageProduct from "./sections/ImageProduct";

import { useLocation, useParams } from "react-router-dom";
import userService from "../../../services/user";
import { baseURL } from "../../../services/axios";

const INITIAL_DATA = {
  id: "",
  name: "",
  categoryIds: [],
  description: "",
  images: [],
  price: 0,
  priceOnSale: 0,
  quantity: 0,
  ratingInfo: { rating: [0, 0, 0, 0, 0], totalRating: 0, totalStats: 0 },
  status: "active",
  createdAt: "",
  updatedAt: "",
};

function Product() {
  const [product, setProduct] = useState(INITIAL_DATA);
  const [isSuccess, setIsSuccess] = useState(false);
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await userService.product.getOne(id);
      response.status === 200 &&
        setProduct((cur) => {
          return {
            ...cur,
            ...response.data.product,
            images: response.data.product.images.map((image) => `${baseURL}/${image}`),
          };
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isSuccess) {
        const response = await userService.product.getOne(id);
        response.status === 200 &&
          setProduct((cur) => {
            return {
              ...cur,
              ...response.data.product,
              images: response.data.product.images.map((image) => `${baseURL}/${image}`),
            };
          });
      }
    };
    fetchData();
  }, [isSuccess]);

  return (
    <MyBaseLayout
      breadcrumb={[
        { label: "Home", route: "/home" },
        {
          label: state ? state.category.name : "Products",
          route: state ? `/category/${state.category.id}` : "/products",
        },
        { label: product.name },
      ]}
      searchBtn
    >
      <Card
        sx={{
          p: 2,
          pt: 5,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <ImageProduct images={product.images} name={product.name} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <DetailProduct product={product} />
            </Grid>
            <Grid item xs={12}>
              <DescriptionProduct
                product={product}
                isSuccess={isSuccess}
                setIsSuccess={setIsSuccess}
              />
            </Grid>
          </Grid>
        </Container>
      </Card>
    </MyBaseLayout>
  );
}

export default Product;
