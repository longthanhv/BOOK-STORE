import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import MKButton from "../../../components/MKButton";
import MKInput from "../../../components/MKInput";
import MyTable from "../../../components/Table";
import MyBaseLayout from "../../../layouts/MyBaseLayout";

import WarningModal from "./sections/WarningModal";

import SearchIcon from "@mui/icons-material/Search";

import MKBadge from "../../../components/MKBadge";
import adminService from "../../../services/admin";
import AddModal from "./sections/AddModal";


const initialLimit = {
  page: 1,
  size: 5,
};

const initialQuery = {
  name: "",
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

const types = [
  { id: "freeShip", value: "Free Ship" },
  { id: "basic", value: "Basic" },
];

const convertType = (id) => {
  for (const type of types) {
    if (type.id === id) return type.value;
  }
};

function DiscountsTable() {
  const [idModal, setIdModal] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [limit, setLimit] = useState(initialLimit);
  const [count, setCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const getData = async () => {
    const res = await adminService.discount.getMany(query, limit);
    setTableData(
      res.data.discounts.map((ele) => {
        return [
          ele.code,
          ele.discount,
          convertType(ele.type),
          new Date(ele.expriesDate).toLocaleDateString("en-US"),
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
  };

  const handleSearch = async () => {
    await getData();
  };

  useEffect(() => {
    const fetchData = async()=>{
      await getData();
    }
    fetchData()
  }, [limit]);

  useEffect( () => {
    const fetchData = async()=>{
      if (isSuccess) {
      await getData();
    }
    }
    fetchData()
  }, [isSuccess]);

  const toolFilter = (
    <>
      <Grid item>
        <MKInput
          variant="outlined"
          label="Code"
          value={query.name}
          setValue={setQuery}
          name="name"
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
          tableHead={["Code", "Khuyến mãi", "Kiểu", "Thời gian hết hạn","Trạng thái"]}
          tableData={tableData}
          count={count}
          toolFilter={toolFilter}
          toggleModals={{
            add: () => {
              setShowAddModal(!showAddModal);
              setIdModal(null);
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
        types={types}
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

export default DiscountsTable;
