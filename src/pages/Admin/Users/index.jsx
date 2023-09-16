import SearchIcon from "@mui/icons-material/Search";
import { Card, Grid } from "@mui/material";
import MKButton from "../../../components/MKButton";
import MKInput from "../../../components/MKInput";
import MyTable from "../../../components/Table";
import MyBaseLayout from "../../../layouts/MyBaseLayout";
import ModalNewUser from "./sections/ModalUser";
import { useEffect, useState } from "react";
import adminService from "../../../services/admin";
import WarningModal from "./sections/WarningModal";

const initialLimit = {
  page: 1,
  size: 5,
};

const initialQuery = {
  username: "",
  name: "",
};

function Users() {
  const [idModal, setIdModal] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [limit, setLimit] = useState(initialLimit);
  const [count, setCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSearch = async () => {
    const res = await adminService.user.getMany(query, limit);
    setTableData(
      res.data.users.map((ele) => {
        return [ele.id, ele.username, ele.name, ele.phone];
      })
    );
    setCount(res.data.total);
  };

  useEffect( () => {
    const fetchData =async ()=>{
      const res = await adminService.user.getMany(query, limit);
     await setTableData(
      res.data.users.map((ele) => {
        return [ele.id, ele.username, ele.name, ele.phone];
      })
    );
    await setCount(res.data.total);
    }
    fetchData()
  }, [limit]);

  useEffect( () => {
    const fetchData = async()=>{
      if (isSuccess) {
      const res = await adminService.user.getMany(query, limit);
      await setTableData(
        res.data.users.map((ele) => {
          return [ele.id, ele.username, ele.name, ele.phone];
        })
      );
      await setCount(res.data.total);
    }
    }
    fetchData()
  }, [isSuccess]);

  const toolFilter = (
    <>
      <Grid item>
        <MKInput
          variant="outlined"
          label="Tên đăng nhập"
          value={query.username}
          setValue={setQuery}
          name="username"
        />
      </Grid>
      <Grid item>
        <MKInput
          variant="outlined"
          label="Tên người dùng"
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
          labelSearch="Search Student"
          tableHead={["ID", "Tên đăng nhập", "Tên người dùng", "SĐT"]}
          tableData={tableData}
          count={count}
          toolFilter={toolFilter}
          toggleModals={{
            add: () => {
              setShowUserModal(!showUserModal);
              setIdModal(null);
              setIsSuccess(false);
            },
            edit: (id) => {
              setShowUserModal(!showUserModal);
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
      <ModalNewUser
        show={showUserModal}
        toggleModal={() => setShowUserModal(!showUserModal)}
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

export default Users;
