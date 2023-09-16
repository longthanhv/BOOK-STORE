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

import { useState } from "react";
import SelectInput from "../../../../components/SelectInput";

function FilterProducts({ query, setQuery, statusSelect, onSearch }) {
  return (
    <MKBox position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
      <MKBox mb={2}>
        <MKTypography variant="h4" fontWeight="bold" mb={1}>
          Bộ lọc
        </MKTypography>
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
          label="Giá cao nhất"
          fullWidth
          value={query.maxPrice}
          setValue={setQuery}
          name="maxPrice"
        />
      </MKBox>
      <MKBox mb={2}>
        <MKInput
          type="number"
          label="Giá thấp nhất"
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
          Tìm
        </MKButton>
      </MKBox>
    </MKBox>
  );
}

export default FilterProducts;
