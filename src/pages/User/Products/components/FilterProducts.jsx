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

// Material UI
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

import { useEffect, useState } from "react";
import SelectInput from "../../../../components/SelectInput";
import userService from "../../../../services/user";

function FilterProducts({ query, setQuery, statusSelect, onSearch }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await userService.category.getMany();
      res.status === 200 && setCategories(
        res.data.categories.map((ele) => {
          return {
            id: ele.id,
            value: ele.name,
          };
        })
      );
    };
    fetchData();
  }, []);
  
  return (
    <MKBox position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
      <MKBox mb={2}>
        <MKTypography variant="h4" fontWeight="bold" mb={1}>
          Bộ lọc
        </MKTypography>
      </MKBox>
      <MKBox mb={2}>
        <SelectInput
          label="Danh mục"
          items={categories}
          value={query.categoryId}
          setValue={setQuery}
          name="categoryId"
        />
      </MKBox>
      <MKBox mb={2}>
        <MKInput
          type="text"
          label="Tên sản phẩm"
          fullWidth
          value={query.name}
          setValue={setQuery}
          name="name"
        />
      </MKBox>
      <MKBox mb={2}>
        <MKInput
          type="number"
          label="Giá lớn nhất"
          fullWidth
          value={query.maxPrice}
          setValue={setQuery}
          name="maxPrice"
        />
      </MKBox>
      <MKBox mb={2}>
        <MKInput
          type="number"
          label="Giá nhỏ nhất"
          fullWidth
          value={query.minPrice}
          setValue={setQuery}
          name="minPrice"
        />
      </MKBox>
      <MKBox mb={2}>
        <SelectInput
          label="Trạng thái"
          items={statusSelect}
          value={query.type}
          setValue={setQuery}
          name="type"
        />
      </MKBox>
      <MKBox mt={4} mb={2}>
        <MKButton variant="gradient" color="info" fullWidth onClick={onSearch}>
          Tìm kiếm
        </MKButton>
      </MKBox>
    </MKBox>
  );
}

export default FilterProducts;
