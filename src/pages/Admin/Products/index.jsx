import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import MKButton from "../../../components/MKButton";
import MKInput from "../../../components/MKInput";
import MyTable from "../../../components/Table";
import MyBaseLayout from "../../../layouts/MyBaseLayout";

import WarningModal from "./sections/WarningModal";

import SearchIcon from "@mui/icons-material/Search";

import adminService from "../../../services/admin";
import AddModal from "./sections/AddModal";
import EditModal from "./sections/EditModal";
import MKBadge from "../../../components/MKBadge";
import { Navigate, useNavigate } from "react-router-dom";

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

function ProductsTable() {
  const [idModal, setIdModal] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [limit, setLimit] = useState(initialLimit);
  const [count, setCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    const res = await adminService.product.getMany(query, limit);
    if (res.status === 200) {
      console.log("Ao taht day")
      setTableData(
        res.data.products.map((ele) => {
          return [
            ele.id,
            ele.name,
            ele.quantity,
            ele.price,
            ele.priceOnSale,
            <MKBadge
              variant="contained"
              color={colorStatus(ele.status)}
              badgeContent={ele.status}
              container
            />,
          ];
        })
      );
      setCount(res.data.total);
    }
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

  useEffect(() => {
    const fetchData = async () => {
      if (isSuccess) {
        await getData();
      }
    };
    fetchData();
  }, [isSuccess]);

  const toolFilter = (
    <>
      <Grid item>
        <MKInput
          variant="outlined"
          label="Tên sản phẩm"
          value={query.name}
          setValue={setQuery}
          name="name"
        />
      </Grid>
      <Grid item>
        <MKInput
          variant="outlined"
          label="Giá sản phẩm"
          value={query.price}
          setValue={setQuery}
          name="price"
        />
      </Grid>
      <Grid item>
        <MKInput
          variant="outlined"
          label="Giá khuyến mãi"
          value={query.priceOnSale}
          setValue={setQuery}
          name="priceOnSale"
        />
      </Grid>
      <Grid item>
        <MKButton color="success" variant="outlined" onClick={handleSearch}>
          <SearchIcon />
        </MKButton>
      </Grid>
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
          tableHead={["ID", "Name", "Quantity", "Price", "Sale", "Status"]}
          tableData={tableData}
          count={count}
          toolFilter={toolFilter}
          toggleModals={{
            view: (id) => {
              navigate(`/admin/product/${id}`);
            },
            add: () => {
              setShowAddModal(!showAddModal);
              setIsSuccess(false);
            },
            edit: (id) => {
              setShowEditModal(!showEditModal);
              setIdModal(id);
              setIsSuccess(false);
            },
            delete: (id) => {
              setShowWarningModal(!showWarningModal);
              setIdModal(id);
              setIsSuccess(false);
            },
          }}
          setLimit={setLimit}
        />
      </Card>
      <AddModal
        show={showAddModal}
        toggleModal={() => setShowAddModal(!showAddModal)}
        setIsSuccess={setIsSuccess}
      />
      <EditModal
        show={showEditModal}
        toggleModal={() => setShowEditModal(!showEditModal)}
        idModal={idModal}
        setIdModal={setIdModal}
        setIsSuccess={setIsSuccess}
      />
      <WarningModal
        show={showWarningModal}
        toggleModal={() => setShowWarningModal(!showWarningModal)}
        idModal={idModal}
        setIdModal={setIdModal}
        setIsSuccess={setIsSuccess}
      />
    </MyBaseLayout>
  );
}

export default ProductsTable;
