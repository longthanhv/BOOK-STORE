/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import team4 from "assets/images/team-4.jpg";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { baseURL } from "../../../../../services/axios";
import AddressCard from "../../components/AddressCard";

import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import { useEffect, useRef, useState } from "react";
import ModalNewAddress from "../../components/ModalNewAddress";
import ModalEditProfile from "../../components/ModalEditProfile";
import ModalEditAvatar from "../../components/ModalEditAvatar";
import ModalEditPassword from "../../components/ModalEditPassword";
import authService from "../../../../../services/auth/authService";

function ProfileInfo({ image, name, phone, moreDetail, setIsSuccess }) {
  const [open, setOpen] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleClickAddress = (event) => {
    handleClose(event);
    setIsSuccess(false);
    setShowAddressModal(!showAddressModal);
  };

  const handleClickProfile = (event) => {
    handleClose(event);
    setIsSuccess(false);
    setShowProfileModal(!showProfileModal);
  };

  const handleClickAvatar = (event) => {
    handleClose(event);
    setIsSuccess(false);
    setShowAvatarModal(!showAvatarModal);
  };

  const handleClickPassword = (event) => {
    handleClose(event);
    setIsSuccess(false);
    setShowPasswordModal(!showPasswordModal);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Card sx={{ mt: 3 }}>
      <Grid container>
        <Grid item xs={12} md={4} lg={3} sx={{ mt: -6 }}>
          <MKBox width="100%"  pt={2} pb={1} px={2}>
            <MKBox
              textAlign="center"
              component="img"
              src={image ? `${baseURL}/${image}` : team4}
              alt={name}
              width="100%"
              borderRadius="md"
              shadow="lg"
            />
          </MKBox>
        </Grid>
        <Grid item xs={12} md={8} lg={9} sx={{ my: "auto" }}>
          <MKBox pt={{ xs: 1, lg: 2.5 }} pb={2.5} pr={4} pl={{ xs: 4, lg: 1 }} lineHeight={1}>
            <MKTypography variant="h5">{name}</MKTypography>
            <MKTypography variant="h6" color="success" mb={1}>
              {phone}
            </MKTypography>
            {moreDetail && moreDetail.addresses && moreDetail.addresses.length ? (
              <>
                <MKTypography variant="body2" color="text">
                  Địa chỉ
                </MKTypography>
                {moreDetail.addresses.map((address, index) => {
                  return (
                    <AddressCard
                      key={index}
                      index={index}
                      addressInfo={address}
                      setIsSuccess={setIsSuccess}
                    />
                  );
                })}
              </>
            ) : null}
          </MKBox>
        </Grid>
        <Stack
          direction="row"
          spacing={2}
          sx={{ position: "absolute", zIndex: 1, right: "10px", top: "10px" }}
        >
          <div>
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <MenuIcon />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                        sx={{ p: 0.5 }}
                      >
                        <MenuItem onClick={handleClickAvatar} sx={{ mb: 0.5 }}>
                          Thay đổi ảnh đại diện
                        </MenuItem>
                        <MenuItem onClick={handleClickProfile} sx={{ mb: 0.5 }}>
                          Chỉnh sửa thông tin cá nhân
                        </MenuItem>
                        <MenuItem onClick={handleClickPassword} sx={{ mb: 0.5 }}>
                          Thay đổi mật khẩu
                        </MenuItem>
                        <MenuItem onClick={handleClickAddress}>Thêm địa chỉ</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Stack>
        <ModalNewAddress
          show={showAddressModal}
          toggleModal={() => setShowAddressModal(!showAddressModal)}
          setIsSuccess={setIsSuccess}
        />
        <ModalEditProfile
          show={showProfileModal}
          toggleModal={() => setShowProfileModal(!showProfileModal)}
          setIsSuccess={setIsSuccess}
          data={{ name: name, phone: phone }}
        />
        <ModalEditAvatar
          show={showAvatarModal}
          toggleModal={() => setShowAvatarModal(!showAvatarModal)}
          setIsSuccess={setIsSuccess}
        />
        <ModalEditPassword
          show={showPasswordModal}
          toggleModal={() => setShowPasswordModal(!showPasswordModal)}
          setIsSuccess={setIsSuccess}
        />
      </Grid>
    </Card>
  );
}

export default ProfileInfo;
