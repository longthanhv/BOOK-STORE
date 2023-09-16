import { Divider, Grid, Modal, Slide, TextField } from "@mui/material";
import MKBox from "../../../../../components/MKBox";
import MKTypography from "../../../../../components/MKTypography";
import SelectRadio from "../../../../../components/SelectRadio";
import MKInput from "../../../../../components/MKInput";
import MKButton from "../../../../../components/MKButton";
import SelectInput from "../../../../../components/SelectInput";
import { useEffect, useRef, useState } from "react";
import adminService from "../../../../../services/admin";
import MyList from "../../../../../components/MyList";
import MKBadge from "../../../../../components/MKBadge";
import Cart from "../../components/Cart";
import cmFn from "../../../../../services/common";
import userService from "../../../../../services/user";
// Import v4 - uuid

const mockData = {
  accountId: "something",
  name: "Nguyen quoc ANh",
  address: "Day la dia chi, thanh pho, tinh",
  phone: "03526438690",
  deliveryPay: 0,
  paymentMethod: "cash",
  totalMoney: 300000,
  status: "pending",
  createdAt: new Date(),
  discountCodes: [],
  orderDetails: [
    {
      productId: 1,
      name: "sach",
      price: 10000,
      quantity: 5,
      amount: 50000,
    },
    {
      productId: 2,
      name: "vo",
      price: 5000,
      quantity: 10,
      amount: 50000,
    },
    {
      productId: 3,
      name: "sach",
      price: 10000,
      quantity: 5,
      amount: 50000,
    },
    {
      productId: 4,
      name: "vo",
      price: 5000,
      quantity: 10,
      amount: 50000,
    },
    {
      productId: 5,
      name: "sach",
      price: 10000,
      quantity: 5,
      amount: 50000,
    },
    {
      productId: 6,
      name: "vo",
      price: 5000,
      quantity: 10,
      amount: 50000,
    },
  ],
};

const INITIAL_DATA = {
  accountId: "",
  name: "",
  address: "",
  phone: "",
  deliveryPay: 0,
  paymentMethod: "cash",
  totalMoney: 0,
  status: "pending",
  createdAt: new Date(),
  discountCodes: [],
  orderDetails: [],
  totalAmount: 0,
};

const colorStatus = (status) => {
  if (status === "active") {
    return "success";
  } else if (status === "canceled") {
    return "error";
  } else {
    return "warning";
  }
};

function ViewModal({ show, toggleModal, setIsSuccess, idModal }) {
  const [data, setData] = useState(INITIAL_DATA);

  useEffect(() => {
    const fetchData = async () => {
      if (idModal) {
        const res = await userService.order.getOne(idModal);
        setData(() => {
          return {
            ...res.data.order,
            orderDetails: res.data.orderDetails,
            totalAmount: res.data.orderDetails.reduce((pV, cV) => {
              return pV + cV.amount;
            }, 0),
          };
        });
        console.log(data);
      }
    };
    fetchData();
  }, [idModal]);

  return (
    <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
      <Slide direction="down" in={show} timeout={500}>
        <MKBox
          position="relative"
          width="50%"
          display="flex"
          flexDirection="column"
          borderRadius="xl"
          bgColor="white"
          shadow="xl"
        >
          <MKBox display="flex" alignitems="center" justifyContent="space-between" p={2}>
            <MKTypography variant="h5">Đơn hàng {idModal}</MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <MKBox component="form" role="form">
              <Grid>
                <Grid item container spacing={1} px={1}>
                  <Grid item xs={6}>
                    <MKTypography variant="body2">Tên: {data.name}</MKTypography>
                  </Grid>
                  <Grid item xs={6}>
                    <MKTypography variant="body2">SĐT: {data.phone}</MKTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <MKTypography variant="body2">Địa chỉ: {data.address}</MKTypography>
                  </Grid>
                  <Grid item xs={6}>
                    <MKTypography variant="body2">
                      Phương thức thanh toán:{" "}
                      <MKBadge
                        variant="contained"
                        color="info"
                        badgeContent={data.paymentMethod}
                        container
                      />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={6}>
                    <MKTypography variant="body2">
                      Trạng thái:{" "}
                      <MKBadge
                        variant="contained"
                        color={colorStatus(data.status)}
                        badgeContent={data.status}
                        container
                      />
                    </MKTypography>
                  </Grid>
                </Grid>
                <Divider sx={{ color: "#344767", opacity: 0.75 }} />
                <Grid maxHeight="200px" sx={{ overflowY: "scroll" }}>
                  <Cart cartItems={data.orderDetails} />
                </Grid>
                <Divider sx={{ color: "#344767", opacity: 0.75 }} />
                <Grid item container spacing={1} px={1}>
                  <Grid item xs={8}></Grid>
                  <Grid item xs={4}>
                    <MKTypography variant="body2">
                      Tổng số tiền: {cmFn.cvNum(data.totalAmount, false)}
                    </MKTypography>
                  </Grid>
                  <Grid item xs={8}>
                    <MKTypography variant="body2">
                      Mã khuyến mãi: {data.discountCodes}
                    </MKTypography>
                  </Grid>
                  <Grid item xs={4}>
                    <MKTypography variant="body2">
                      Giảm: {cmFn.cvNum(data.totalAmount - data.totalMoney, false)}
                    </MKTypography>
                  </Grid>
                </Grid>
                <Divider sx={{ color: "#344767", opacity: 0.75 }} />
                <Grid item container spacing={1} px={1}>
                  <Grid item xs={8}></Grid>
                  <Grid item xs={4}>
                    <MKTypography variant="body1">
                      Tổng thanh toán: {cmFn.cvNum(data.totalMoney, false)}
                    </MKTypography>
                  </Grid>
                </Grid>
              </Grid>
            </MKBox>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="right" p={1.5}>
            <MKButton variant="gradient" color="dark" onClick={toggleModal}>
              Đóng
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

export default ViewModal;
