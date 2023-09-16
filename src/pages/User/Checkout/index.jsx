import {
  ButtonGroup,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import MKBox from "../../../components/MKBox";
import ProgressBar from "../../../components/ProgressBar";

import MKTypography from "../../../components/MKTypography";
import MyBaseLayout from "../../../layouts/MyBaseLayout";
import MKButton from "../../../components/MKButton";
import MKInput from "../../../components/MKInput";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cart from "./sections/Cart";
import BillingAddress from "./sections/BillingAddress";
import Payment from "./sections/Payment";
import cmFn from "../../../services/common";
import adminService from "../../../services/admin";
import authService from "../../../services/auth/authService";
import profileService from "../../../services/auth/profileService";
import userService from "../../../services/user";
import OrderSuccessModal from "./sections/OrderSuccessModal";

const checkoutProgress = [
  { label: "Giỏ hàng", status: "pending" },
  { label: "Địa chỉ thanh toán", status: "new" },
  { label: "Thanh toán", status: "new" },
];

function createDataAddress(id, name, isOffice, address, phone) {
  return { id, name, isOffice, address, phone };
}

const rowInfos = [
  createDataAddress(1, "Stupid B!tch", false, "7 Phan Dinh Phung, Thai Nguyen", "0976 691 558"),
  createDataAddress(2, "GigaChad", true, "7 Phan Dinh Phung, Thai Nguyen", "035 264 3890"),
];

const ORDER_INFO = {
  address: 0,
  subTotal: 0,
  discount: 0,
  shipping: 0,
  paymentOption: "cash",
};

function Checkout() {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [addressInfos, setAddressInfos] = useState(rowInfos);
  const [progress, setProgress] = useState(checkoutProgress);
  const [orderInfo, setOrderInfo] = useState(ORDER_INFO);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow(!show);
  };

  const handleNextStep = () => {
    setProgress((currentProgress) => {
      let progress = [...currentProgress].map((ele) => {
        return { ...ele };
      });
      for (let i = 0; i < progress.length; i++) {
        if (progress[i].status === "pending") {
          progress[i].status = "done";
        } else if (progress[i].status === "new") {
          progress[i].status = "pending";
          break;
        }
      }
      return progress;
    });
  };

  const handlePreviousStep = () => {
    setProgress((currentProgress) => {
      let progress = [...currentProgress].map((ele) => {
        return { ...ele };
      });
      for (let i = progress.length - 1; i >= 0; i--) {
        if (progress[i].status === "pending" && i !== 0) {
          progress[i].status = "new";
        } else if (progress[i].status === "done") {
          progress[i].status = "pending";
          break;
        }
      }
      return progress;
    });
  };

  const submitForm = async () => {
    const { address, subTotal, discount, shipping, paymentOption } = orderInfo;

    const data = {
      name: addressInfos[address].name,
      address: addressInfos[address].address,
      phone: addressInfos[address].phone,
      deliveryPay: shipping,
      paymentMethod: paymentOption,
      totalMoney: +subTotal + +shipping - discount,
      discountCodes: [],
      details: cartItems.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.productName,
          amount: item.price * item.quantity,
        };
      }),
    };

    const res = await userService.order.create(data);
    if (res.status === 200) {
      localStorage.removeItem("cart");
      setOrderId(res.data.order.id);
      toggleModal();
    }
  };

  const getAddressInfos = async () => {
    const res = await profileService.get();
    if (res.status === 200) {
      res.data.profile.moreDetail
        ? setAddressInfos(res.data.profile.moreDetail.addresses || [])
        : setAddressInfos([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAddressInfos();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isSuccess) {
        await getAddressInfos();
      }
    };
    fetchData();
  }, [isSuccess]);

  useEffect(() => {
    setOrderInfo((currentOrderInfo) => {
      return {
        ...currentOrderInfo,
        subTotal: cartItems.reduce((pV, cV) => {
          return pV + cV.price * cV.quantity;
        }, 0),
      };
    });
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <MyBaseLayout searchBtn>
      <ProgressBar progress={progress} />
      <MKBox
        borderRadius="xl"
        sx={{
          p: 2,
          mb: 4,
          mt: 2,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
          flexGrow: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {progress[0].status === "pending" && (
              <Cart cartItems={cartItems} setCartItems={setCartItems} />
            )}
            {progress[1].status === "pending" && (
              <BillingAddress
                addressInfos={addressInfos}
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
                setOrderInfo={setOrderInfo}
                setIsSuccess={setIsSuccess}
              />
            )}
            {progress[2].status === "pending" && (
              <Payment
                handlePreviousStep={handlePreviousStep}
                orderInfo={orderInfo}
                setOrderInfo={setOrderInfo}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            {progress[2].status === "pending" && (
              <MKBox borderRadius="xl" shadow="myCustom_1" sx={{ mb: 2 }}>
                <MKTypography variant="h5" sx={{ p: 3 }}>
                  Địa chỉ thanh toán
                </MKTypography>
                {addressInfos
                  .filter((info, index) => {
                    return index === orderInfo.address;
                  })
                  .map((filterInfo) => {
                    return (
                      <MKBox
                        sx={{
                          p: 3,
                          pt: 0,
                          "& .MuiTypography-root:not(:last-child)": { mb: 0.5 },
                        }}
                      >
                        <MKTypography variant="h6">
                          {filterInfo.name} ({filterInfo.isOffice ? "Office" : "Home"})
                        </MKTypography>
                        <MKTypography variant="subtitle2">{filterInfo.address}</MKTypography>
                        <MKTypography variant="body2">{filterInfo.phone}</MKTypography>
                      </MKBox>
                    );
                  })}
              </MKBox>
            )}
            <MKBox borderRadius="xl" shadow="myCustom_1" sx={{ mb: 2 }}>
              <MKTypography variant="h5" sx={{ p: 3 }}>
                Hóa đơn
              </MKTypography>
              <MKBox
                sx={{
                  "& .MuiGrid-root": { px: 3 },
                  "& .MuiTypography-root": { mb: 1 },
                  "& .MuiTypography-subtitle2": { fontWeight: 400, color: "#637381" },
                  "& .MuiTypography-subtitle1": { fontWeight: 400 },
                }}
              >
                <Grid container justifyContent="space-between" alignItems="end">
                  <MKTypography variant="subtitle2">Tạm tính</MKTypography>
                  <MKTypography variant="body2">
                    {cmFn.cvNum(orderInfo.subTotal, false)}
                  </MKTypography>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="end">
                  <MKTypography variant="subtitle2">Khuyến mãi</MKTypography>
                  <MKTypography variant="body2">{cmFn.cvNum(orderInfo.discount)}</MKTypography>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="end">
                  <MKTypography variant="subtitle2">Phí ship</MKTypography>
                  <MKTypography variant="body2">{cmFn.cvNum(orderInfo.shipping)}</MKTypography>
                </Grid>
                <Divider sx={{ color: "#344767", opacity: 0.75, my: 1 }} />
                <Grid container justifyContent="space-between" alignItems="end">
                  <MKTypography variant="subtitle1">Tổng thanh toán</MKTypography>
                  <MKTypography color="warning" variant="body1">
                    {cmFn.cvNum(+orderInfo.subTotal + +orderInfo.shipping - orderInfo.discount)}
                  </MKTypography>
                </Grid>
              </MKBox>
            </MKBox>
            {progress[0].status === "pending" && (
              <MKButton
                fullWidth
                color="success"
                size="large"
                onClick={handleNextStep}
                disabled={cartItems.length === 0}
              >
                Thanh toán
              </MKButton>
            )}
            {progress[2].status === "pending" && (
              <MKButton fullWidth color="success" size="large" onClick={submitForm}>
                Hoàn thành đặt hàng
              </MKButton>
            )}
          </Grid>
        </Grid>
      </MKBox>
      <OrderSuccessModal
        show={show}
        toggleModal={() => setShow(!show)}
        orderId={orderId}
        orderInfo={orderInfo}
      />
    </MyBaseLayout>
  );
}

export default Checkout;
