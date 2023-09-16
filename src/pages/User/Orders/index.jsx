import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import MyTable from "../../../components/Table";
import MyBaseLayout from "../../../layouts/MyBaseLayout";

import WarningModal from "./sections/WarningModal";
import ViewModal from "./sections/ViewModal";

import SearchIcon from "@mui/icons-material/Search";

import MKBadge from "../../../components/MKBadge";
import cmFn from "../../../services/common";
import userService from "../../../services/user";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

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

function MyOrdersTable() {
  const [idModal, setIdModal] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [limit, setLimit] = useState(initialLimit);
  const [count, setCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const getData = async () => {
    const res = await userService.order.getMany(query, limit);
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
          label=""
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
          tableHead={["ID", "Tên", "Địa chỉ", "SĐT", "Tổng tiền", "Trạng thái"]}
          tableData={tableData}
          count={count}
          toolFilter={toolFilter}
          toggleModals={{
            view: (id) => {
              setShowViewModal(!showViewModal);
              setIdModal(id);
            },
            // delete: {
            //   fn: (id) => {
            //     setShowWarningModal(!showWarningModal);
            //     setIdModal(id);
            //     setIsSuccess(false);
            //   },
            //   disabled: (arr) => {
            //     return arr[5].props.badgeContent === "canceled";
            //   },
            // },
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
      {/* <WarningModal
        show={showWarningModal}
        toggleModal={() => setShowWarningModal(!showWarningModal)}
        idModal={idModal}
        setIdModal={setIdModal}
        setIsSuccess={setIsSuccess}
      /> */}
    </MyBaseLayout>
  );
}

export default MyOrdersTable;
