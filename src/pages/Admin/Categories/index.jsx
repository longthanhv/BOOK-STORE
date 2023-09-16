/* eslint-disable no-unused-vars */
import { Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import MKButton from "../../../components/MKButton";
import MKInput from "../../../components/MKInput";
import MyTable from "../../../components/Table";
import MyBaseLayout from "../../../layouts/MyBaseLayout";

import FormModal from "./sections/FormModal";
import WarningModal from "./sections/WarningModal";

// import SearchIcon from "@mui/icons-material/Search";

import adminService from "../../../services/admin";
import MKTypography from "../../../components/MKTypography";
import MKBadge from "../../../components/MKBadge";

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

function Categories() {
  const [idModal, setIdModal] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [limit, setLimit] = useState(initialLimit);
  const [count, setCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const getData = async () => {
    const res = await adminService.category.getMany(query, limit);
    setTableData(
      res.data.categories.map((ele) => {
        return [
          ele.id,
          ele.name,
          ele.description,
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
    console.log("clicked");
  };

  useEffect( () => {
    const fetchData = async()=>{
      await getData();}
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
          label="Tên danh mục"
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
          tableHead={["ID", "Tên danh mục", "Mô tả", "Trạng thái"]}
          tableData={tableData}
          count={count}
          toolFilter={toolFilter}
          toggleModals={{
            add: () => {
              setShowFormModal(!showFormModal);
              setIdModal(null);
              setIsSuccess(false);
            },
            edit: (id) => {
              setShowFormModal(!showFormModal);
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
      <FormModal
        show={showFormModal}
        toggleModal={() => setShowFormModal(!showFormModal)}
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

export default Categories;
