import { Card } from "@mui/material";
import { useEffect, useState } from "react";

import MyTable from "../../../components/Table";
import MyBaseLayout from "../../../layouts/MyBaseLayout";

import MKBadge from "../../../components/MKBadge";
import adminService from "../../../services/admin";

const initialLimit = {
  page: 1,
  size: 5,
};

const initialQuery = {
  name: "",
  price: "",
  priceOnSale: "",
};

const colorStatus = (status) => {
  if (status === "active") {
    return "success";
  } else if (status === "deleted") {
    return "error";
  } else {
    return "warning";
  }
};

function Dashboard() {
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [limit, setLimit] = useState(initialLimit);
  const [count, setCount] = useState(0);

  const getData = async () => {
    const res = await adminService.product.getSale(query, limit);
    setTableData(
      res.data.products.map((ele) => {
        return [
          ele._id.productId.$oid,
          ele._id.name,
          ele.totalQuantity,
          ele._id.price,
          ele.totalAmount,
        ];
      })
    );
    setCount(res.data.total);
  };

  const handleSearch = async () => {
    await getData();
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, [limit]);

  const toolFilter = (
    <>
      {/* <Grid item>
        <MKInput
          variant="outlined"
          label="Name"
          value={query.name}
          setValue={setQuery}
          name="name"
        />
      </Grid>
      <Grid item>
        <MKButton color="success" variant="outlined" onClick={handleSearch}>
          <SearchIcon />
        </MKButton>
      </Grid> */}
    </>
  );

  return (
    <MyBaseLayout>
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
        <MyTable
          title="All Sale"
          tableHead={["ID", "Name", "Total Quantity", "Price", "Total Amount"]}
          tableData={tableData}
          count={count}
          toolFilter={toolFilter}
          toggleModals={{
            add: null,
            edit: null,
            delete: null,
          }}
          setLimit={setLimit}
          onlyView
        />
      </Card>
    </MyBaseLayout>
  );
}

export default Dashboard;
