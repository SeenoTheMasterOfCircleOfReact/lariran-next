import { useState, useEffect } from "react";
import axios from "axios";

import classes from "./Brand.module.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { LoadingButton } from "@mui/lab";
import Image from "next/image";
import { PhotoCamera } from "@mui/icons-material";

export default function Brand({ brand, getBrands, token }) {
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);
  const [name, setName] = useState("");
  const [persianName, setPersianName] = useState("");
  const [image, setImage] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const [activeLoading, setActiveLoading] = useState(false);

  useEffect(() => {
    setName(brand.name);
    setPersianName(brand.persian_name);
  }, [brand]);

  function handleEditOpenToggle(state) {
    setEditOpen(state);
  }
  function handleDeleteOpenToggle(state) {
    setDeleteOpen(state);
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

  function handleEdit() {
    setEditLoading(true);
    setEditError(null);
    const fd = new FormData();
    fd.append("name", name);
    fd.append("persian_name", persianName);
    if (image) {
      fd.append("image", image);
    }
    const url = `https://api.lariran.com/api/v1/brand/update/${brand.id}`;
    axios
      .post(url, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "error") {
          setEditError(response.data.data);
        } else {
          setEditOpen(false);
          getBrands();
        }
      })
      .catch((error) => {
        setEditError({ server: [error.message] });
      })
      .finally(() => {
        setEditLoading(false);
      });
  }
  function handleDelete() {
    setDeleteLoading(true);
    setDeleteError(null);
    const url = `https://api.lariran.com/api/v1/brand/delete/${brand.id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setDeleteError(response.data.data);
        } else {
          setDeleteOpen(false);
          getBrands();
        }
      })
      .catch((error) => {
        setDeleteError({ server: [error.message] });
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }
  function handleActivate() {
    if (!brand.active) {
      setActiveLoading(true);
      const url = "https://api.lariran.com/api/v1/brandLanding/create";
      const token = localStorage.getItem("token");
      axios
        .post(url, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            brand_id: brand.id,
          },
        })
        .then((response) => {
          getBrands();
        })
        .catch((error) => {})
        .finally(() => {
          setActiveLoading(false);
        });
    } else {
      setActiveLoading(true);
      const url = `https://api.lariran.com/api/v1/brandLanding/delete/${brand.activeId}`;
      const token = localStorage.getItem("token");
      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          getBrands();
        })
        .catch((error) => {})
        .finally(() => {
          setActiveLoading(false);
        });
    }
  }

  return (
    <>
      <div className={classes.holder}>
        <div className={classes.top}>
          <div className={classes.item}>
            <div className={classes.data}>
              {brand.image && (
                <div className={classes.right}>
                  <Image
                    src={`https://api.lariran.com${brand.image}`}
                    width={50}
                    height={50}
                    alt={brand.persian_name}
                  />
                </div>
              )}
              <div className={classes.left}>
                <div className={classes.name}>{brand.name}</div>
                <div className={classes.persianName}>{brand.persian_name}</div>
              </div>
            </div>
          </div>
          <div className={classes.actions}>
            <div className={classes.left}>
              <IconButton
                color="lightBlue"
                aria-label="edit"
                size="small"
                onClick={() => handleEditOpenToggle(true)}
              >
                <BorderColorIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="delete"
                size="small"
                onClick={() => handleDeleteOpenToggle(true)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className={classes.bottom}>
          <Switch
            checked={brand.active}
            color="lightBlue"
            onChange={handleActivate}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      </div>
      <Dialog
        open={editOpen}
        onClose={() => handleEditOpenToggle(false)}
        fullWidth
      >
        <DialogTitle>{`ویرایش برند "${brand.name}"`}</DialogTitle>
        <DialogContent>
          <sub
            style={{
              color: "red",
              display: "block",
              width: "100%",
            }}
          >
            {editError?.server?.[0]}
          </sub>
          <TextField
            color="lightBlue"
            error={Boolean(editError?.name)}
            helperText={editError?.name?.[0]}
            autoFocus
            margin="dense"
            id="name"
            label="عنوان"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
            value={name}
          />
          <TextField
            color="lightBlue"
            error={Boolean(editError?.persian_name)}
            helperText={editError?.persian_name?.[0]}
            autoFocus
            margin="dense"
            id="persianName"
            label="عنوان فارسی"
            type="text"
            fullWidth
            variant="standard"
            onChange={handlePersianNameChange}
            value={persianName}
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
          <Button onClick={() => handleEditOpenToggle(false)}>لغو</Button>
          <LoadingButton
            loading={editLoading}
            color="lightBlue"
            onClick={handleEdit}
          >
            ثبت
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteOpen}
        onClose={() => handleDeleteOpenToggle(false)}
        fullWidth
      >
        <DialogTitle>{`حذف برند "${brand.name}"`}</DialogTitle>
        <DialogContent>
          <sub
            style={{
              color: "red",
              display: "block",
              width: "100%",
            }}
          >
            {deleteError?.server?.[0]}
          </sub>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteOpenToggle(false)}>لغو</Button>
          <LoadingButton
            loading={deleteLoading}
            color="lightBlue"
            onClick={handleDelete}
          >
            حذف
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
