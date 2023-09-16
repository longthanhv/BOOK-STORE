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
// Import v4 - uuid
import { v4 } from "uuid";

const FORM_ADD_PRODUCT = {
  name: "",
  description: "",
  images: [],
  categoryIds: [],
  price: 0,
  quantity: 0,
};

const DEFAULT_IMG = { img: "", name: "" };

const getFilesFromMyCustomList = (myCustomList) => {
  const array = [];
  myCustomList.map((ele) => array.push(ele["file"]));
  return array;
};

function AddModal({ show, toggleModal, setIsSuccess }) {
  const [data, setData] = useState(FORM_ADD_PRODUCT);
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [imgObj, setImgObj] = useState(DEFAULT_IMG);
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleOnClick = (imgObj) => {
    setImgObj(imgObj);
  };

  const handleAddFile = (event) => {
    const newFiles = [...event.target.files].map((ele) => (ele = { file: ele, id: v4() }));
    setFiles([...files, ...newFiles]);
  };

  const handleDeleteFile = (id) => {
    const newFilesList = files.filter((ele) => ele.id != id);
    setFiles(newFilesList);
    setImgObj(DEFAULT_IMG);
  };

  const handleSubmit = async () => {
    const res = await adminService.product.create(data);
    if (res.status === 200) {
      toggleModal();
      setIsSuccess(true);
    }
  };

  useEffect(() => {
    setData((curData) => {
      console.log(files);
      return {
        ...curData,
        images: getFilesFromMyCustomList(files),
      };
    });
    console.log(files);
  }, [files]);

  useEffect(() => {
    if (!show) {
      setData(FORM_ADD_PRODUCT);
      setFiles([]);
    }
  }, [show]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await adminService.category.getMany();
      setCategories(
        res.data.categories.map((ele) => {
          return {
            id: ele.id,
            value: ele.name,
          };
        })
      );
    };
    fetchData();
  }, []);

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
            <MKTypography variant="h5">Thêm mới sản phẩm</MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <MKBox component="form" role="form">
              <Grid container spacing={2}>
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <MKInput
                      type="text"
                      label="Tên"
                      fullWidth
                      value={data.name}
                      setValue={setData}
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectInput
                      label="Danh mục"
                      items={categories}
                      value={data.categoryIds}
                      setValue={setData}
                      name="categoryIds"
                      multiple
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MKInput
                      type="number"
                      label="Giá"
                      fullWidth
                      value={data.price}
                      setValue={setData}
                      name="price"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MKInput
                      type="number"
                      label="Số lượng"
                      fullWidth
                      value={data.quantity}
                      setValue={setData}
                      name="quantity"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MKInput
                      type="text"
                      label="Mô tả"
                      fullWidth
                      value={data.description}
                      setValue={setData}
                      name="description"
                      multiline
                      rows={5}
                    />
                  </Grid>
                  <MKInput
                    type="file"
                    inputRef={hiddenFileInput}
                    inputProps={{
                      multiple: true,
                      accept: "image/png, image/gif, image/jpeg",
                    }}
                    onChange={(e) => {
                      handleAddFile(e);
                    }}
                    sx={{ position: "absolute", display: "none" }}
                  />
                  <Grid item xs={3}>
                    <MKBox shadow="inset" p={2} bgColor="grey-100" sx={{ height: "250px" }}>
                      <MyList
                        items={files}
                        handleOnClick={handleOnClick}
                        handleDelete={handleDeleteFile}
                        handleAdd={handleAddFile}
                        handleClickBtn={handleClick}
                        dense
                      />
                    </MKBox>
                  </Grid>
                  <Grid item xs={9}>
                    <MKBox
                      shadow="inset"
                      py={2}
                      bgColor="grey-100"
                      sx={{
                        height: "250px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      {imgObj.img.length ? (
                        <img
                          src={imgObj.img}
                          alt={imgObj.name}
                          loading="lazy"
                          style={{
                            margin: "auto",
                            display: "block",
                            height: "200px",
                            width: "200px",
                            objectFit: "contain",
                          }}
                          key="img-field"
                        />
                      ) : null}
                    </MKBox>
                  </Grid>
                </Grid>
              </Grid>
            </MKBox>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="space-between" p={1.5}>
            <MKButton variant="gradient" color="dark" onClick={toggleModal}>
              Hủy
            </MKButton>
            <MKButton variant="gradient" color="success" onClick={handleSubmit}>
              Thêm
            </MKButton>
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
}

export default AddModal;
