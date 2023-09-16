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
import Icon from "@mui/material/Icon";
import Pagination from "@mui/material/Pagination";

// Material Kit 2 React components
import MKPagination from "components/MKPagination";

// Link Router Dom
import { Link, useLocation, useParams } from "react-router-dom";

// My Components
import MyBaseLayout from "../../../layouts/MyBaseLayout";

import Products from "./components/Products";
import FilterProducts from "./components/FilterProducts";
import noProductImg from "../../../assets/images/products/no-product.png";

import initalData from "./data/productsData";
import { useEffect, useState } from "react";
import userService from "../../../services/user";
import { baseURL } from "../../../services/axios";
import { Box } from "@mui/material";
import MKTypography from "../../../components/MKTypography";

const STATUS_SELECT = [
  { id: "all", value: "Tất cả" },
  {
    id: "notSaleOff",
    value: "Không giảm giá",
  },
  {
    id: "saleOff",
    value: "Giảm giá",
  },
];

const INITIAL_LIMTI = {
  page: 1,
  size: 6,
};

const INITIAL_QUERY = {
  categoryId: "",
  name: "",
  maxPrice: "",
  minPrice: "",
  type: STATUS_SELECT[0].id,
};

function ProductsPage() {
  const { state } = useLocation();
  const [data, setData] = useState(initalData);
  const [query, setQuery] = useState(
    state ? { ...INITIAL_QUERY, name: state.name } : INITIAL_QUERY
  );
  const [limit, setLimit] = useState(INITIAL_LIMTI);

  const getData = async () => {
    const resPro = await userService.product.getMany(query, limit);
    if (resPro.status === 200) {
      const products = resPro.data.products.map((product) => {
        return {
          proId: product.id,
          image: `${baseURL}/${product.images[0]}`,
          name: product.name,
          price: product.price,
          priceOnSale: product.priceOnSale,
        };
      });
      const totalProducts = resPro.data.total;

      setData(() => {
        return {
          items: products,
          totalItems: totalProducts,
        };
      });
    }
  };

  const handleChange = (event, value) => {
    setLimit((curLimit) => {
      return {
        ...curLimit,
        page: value,
      };
    });
  };

  const onSearch = async () => {
    await getData();
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, [limit]);

  return (
    <MyBaseLayout
      title="Sản phẩm"
      breadcrumb={[{ label: "Home", route: "/home" }, { label: "Sản phẩm" }]}
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
            <Grid item xs={12} lg={3}>
              <FilterProducts
                query={query}
                setQuery={setQuery}
                statusSelect={STATUS_SELECT}
                onSearch={onSearch}
              />
            </Grid>
            <Grid item xs={12} lg={9}>
              {data.items.length ? (
                <>
                  <Grid container spacing={3} sx={{ minHeight: "500px" }}>
                    {data.items.map(({ proId, image, name, price, priceOnSale }) => (
                      <Grid item xs={12} md={4} sx={{ mb: 2 }} key={proId}>
                        <Link to={`/product/${proId}`}>
                          <Products
                            image={image}
                            name={name}
                            price={price}
                            priceOnSale={priceOnSale}
                          />
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid container mb={3} justifyContent="center">
                    <Pagination
                      count={Math.ceil(data.totalItems / limit.size)}
                      page={limit.page}
                      onChange={handleChange}
                      variant="outlined"
                      shape="rounded"
                    />
                  </Grid>
                </>
              ) : (
                <Box
                  sx={{ pt: 4, pb: 8, "& img": { width: "300px", display: "block", m: "auto" } }}
                >
                  <img src={noProductImg} alt="empty-cart" />
                  <MKTypography textAlign="center" variant="h5" sx={{ mt: 5 }}>
                    Không tìm thấy sản phẩm
                  </MKTypography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Card>
    </MyBaseLayout>
  );
}

export default ProductsPage;
