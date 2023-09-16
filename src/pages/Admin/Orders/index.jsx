import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import MKButton from "../../../components/MKButton";
import MKInput from "../../../components/MKInput";
import MyTable from "../../../components/Table";
import MyBaseLayout from "../../../layouts/MyBaseLayout";

import WarningModal from "./sections/WarningModal";
import EditModal from "./sections/EditModal";
import ViewModal from "./sections/ViewModal";

import SearchIcon from "@mui/icons-material/Search";

import MKBadge from "../../../components/MKBadge";
import adminService from "../../../services/admin";
import cmFn from "../../../services/common";

const initialLimit = {
  page: 1,
  size: 5,
};

const initialQuery = {
  id: "",
  name: "",
  phone: "",
};

const colorStatus = (status) => {
  if (status === "done") {
    return "success";
  } else if (status === "canceled") {
    return "error";
  } else {
    return "warning";
  }
};

function OrdersTable() {
  const [idModal, setIdModal] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [limit, setLimit] = useState(initialLimit);
  const [count, setCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const getData = async () => {
    const res = await adminService.order.getMany(query, limit);
    setTableData(
      res.data.orders.map((ele) => {
        return [
          ele.id,
          ele.name,
          ele.address,
          ele.phone,
          cmFn.cvNum(ele.totalMoney, false),
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

  useEffect( () => {
    const fetchData= async()=>{
      await getData();
    }
    fetchData()
  }, [limit]);

  useEffect(() => {
    const fetchData= async()=>{
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
          label="Tên"
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
          tableHead={["ID", "Tên", "Địa chỉ", "SĐT", "Giá tiền", "Trạng thái"]}
          tableData={tableData}
          count={count}
          toolFilter={toolFilter}
          toggleModals={{
            view: (id) => {
              setShowViewModal(!showViewModal);
              setIdModal(id);
            },
            edit: {
              fn: (id) => {
                setShowEditModal(!showEditModal);
                setIdModal(id);
                setIsSuccess(false);
              },
              disabled: (arr) => {
                console.log(arr, "<><><><");
                return arr[5].props.badgeContent !== "pending";
              },
            },
            delete: {
              fn: (id) => {
                setShowWarningModal(!showWarningModal);
                setIdModal(id);
                setIsSuccess(false);
              },
              disabled: (arr) => {
                console.log(arr, "<><><><><");
                return arr[5].props.badgeContent === "canceled";
              },
            },
          }}
          setLimit={setLimit}
        />
      </Card>
      <ViewModal
        show={showViewModal}
        toggleModal={() => setShowViewModal(!showViewModal)}
        idModal={idModal}
        setIdModal={setIdModal}
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

export default OrdersTable;
