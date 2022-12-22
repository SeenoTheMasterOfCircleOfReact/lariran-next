import { useEffect, useState } from "react";
import axios from "axios";

import AlertBg from "../../../UI/AlertBg/AlertBg";

import Brand from "./Brand/Brand";
// import WarantySK from "./WarantySk/WarantySk";

import classes from "./Brands.module.scss";
import ErrorIcon from "@mui/icons-material/Error";
import CircularLoading from "../../../UI/CircularLoading/CircularLoading";
import Title from "../../Title/Title";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PhotoCamera } from "@mui/icons-material";
import BrandSk from "./BrandSk/BrandSk";

export default function Brands({ brands, loading, error, getBrands, token }) {
  const [open, setOpen] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(false);
  const [name, setName] = useState(null);
  const [persianName, setPersianName] = useState(null);
  const [image, setImage] = useState(null);

  function handleOpenToggle(state) {
    setOpen(state);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handlePersianNameChange(e) {
    setPersianName(e.target.value);
  }
  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  function handlePost() {
    setPostLoading(true);
    setPostError(false);
    const fd = new FormData();
    fd.append("name", name);
    fd.append("persian_name", persianName);
    if (image) {
      fd.append("image", image);
    }
    const url = "https://api.lariran.com/api/v1/brand/create";
    axios
      .post(url, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setPostError(response.data.data);
        } else {
          setOpen(false);
          getBrands();
        }
      })
      .catch((error) => {
        setPostError({ server: [error.message] });
      })
      .finally(() => {
        setPostLoading(false);
      });
  }

  if (error) {
    return (
      <div className="admin-panel-error">
        <AlertBg
          refresh
          onRefresh={getBrands}
          color="red"
          title="مشکلی پیش آمده! لطفا دوباره امتحان کنید."
          icon={<ErrorIcon size="large" />}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classes.holder}>
        <Button sx={{ mb: "10px", fontWeight: "600" }} size="large">
          افزودن
        </Button>
        <div className={classes.brands}>
          <BrandSk />
          <BrandSk />
          <BrandSk />
          <BrandSk />
          <BrandSk />
          <BrandSk />
          <BrandSk />
          <BrandSk />
          <BrandSk />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={classes.holder}>
        <Button
          sx={{ mb: "10px", fontWeight: "600" }}
          size="large"
          onClick={() => handleOpenToggle(true)}
        >
          افزودن
        </Button>
        <div className={classes.brands}>
          {brands.map((brand) => (
            <Brand
              key={brand.id}
              brand={brand}
              getBrands={getBrands}
              token={token}
            />
          ))}
        </div>
      </div>
      <Dialog open={open} onClose={() => handleOpenToggle(false)} fullWidth>
        <DialogTitle>{`افزودن برند جدید`}</DialogTitle>
        <DialogContent>
          <sub
            style={{
              color: "red",
              display: "block",
              width: "100%",
            }}
          >
            {postError?.server?.[0]}
          </sub>
          <TextField
            color="lightBlue"
            error={Boolean(postError?.name)}
            helperText={postError?.name?.[0]}
            autoFocus
            margin="dense"
            id="name"
            label="عنوان انگلیسی"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
          />
          <TextField
            color="lightBlue"
            error={Boolean(postError?.persian_name)}
            helperText={postError?.persian_name?.[0]}
            autoFocus
            margin="dense"
            id="persianName"
            label="عنوان فارسی"
            type="text"
            fullWidth
            variant="standard"
            onChange={handlePersianNameChange}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{ mt: 1 }}
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
            <PhotoCamera />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOpenToggle(false)}>لغو</Button>
          <LoadingButton
            loading={postLoading}
            color="lightBlue"
            onClick={handlePost}
          >
            ثبت
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
