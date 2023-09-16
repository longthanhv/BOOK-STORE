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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Presentation page sections
import Counters from "pages/Presentation/sections/Counters";
import Information from "pages/Presentation/sections/Information";
import DesignBlocks from "pages/Presentation/sections/DesignBlocks";
import Pages from "pages/Presentation/sections/Pages";
import Testimonials from "pages/Presentation/sections/Testimonials";
import Download from "pages/Presentation/sections/Download";

// Presentation page components
import BuiltByDevelopers from "pages/Presentation/components/BuiltByDevelopers";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// BaseLayout
import MyBaseLayout from "../../../layouts/MyBaseLayout";

// Images
import bgImage from "assets/images/bg-presentation.jpg";
import Categories from "./sections/Categories";
import { useEffect, useState } from "react";
import userService from "../../../services/user";
import { baseURL } from "../../../services/axios";

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await userService.category.getHome();
      if (res.status === 200) {
        setData(
          res.data.categories.map((cate) => {
            const products = cate.products.map((product) => {
              return {
                proId: product._id.$oid,
                price: product.price,
                priceOnSale: product.priceOnSale,
                proName: product.name,
                image: `${baseURL}/${product.images[0]}`,
              };
            });
            return {
              id: cate._id.$oid,
              name: cate.name,
              description: cate.description,
              products: products,
            };
          })
        );
      }
    };
    fetchData();
  }, []);

  return (
    <MyBaseLayout searchBtn>
      <Card
        sx={{
          p: 2,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        {data && <Categories categories={data} />}
      </Card>
    </MyBaseLayout>
  );
}

export default Home;
