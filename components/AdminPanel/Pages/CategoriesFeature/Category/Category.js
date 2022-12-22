import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { CategoriesContext } from "../../../../../store/categories-context";
import axios from "axios";

import classes from "./Category.module.scss";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { LoadingButton } from "@mui/lab";
import { PhotoCamera } from "@mui/icons-material";

export default function Category({
  category,
  setCategory,
  type,
  categoryId,
  token,
  selectCategory,
}) {
  const categoriesCtx = useContext(CategoriesContext);

  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);
  const [name, setName] = useState("");
  const [persianName, setPersianName] = useState("");
  const [image, setImage] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    setName(category.name);
    setPersianName(category.persian_name);
  }, [category]);

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
    const url = `https://api.lariran.com/api/v1/category/update/${category.id}`;
    const fd = new FormData();
    fd.append("name", name);
    fd.append("persian_name", persianName);
    fd.append("parent_id", categoryId);
    if (image) {
      fd.append("image", image);
    }
    axios
      .post(url, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setEditError(response.data.data);
        } else {
          setEditOpen(false);
          categoriesCtx.getCategories();
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
    const url = `https://api.lariran.com/api/v1/category/delete/${category.id}`;
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
          categoriesCtx.getCategories();
        }
      })
      .catch((error) => {
        setDeleteError({ server: [error.message] });
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  if (type === "form") {
    return (
      <>
        <div className={classes.holder}>
          <div className={classes.item} onClick={() => setCategory(category)}>
            <div className={classes.data}>
              {category.image && (
                <div className={classes.right}>
                  <Image
                    src={`https://api.lariran.com${category.image}`}
                    width={50}
                    height={50}
                    alt={category.persian_name}
                  />
                </div>
              )}
              <div className={classes.left}>
                <div className={classes.name}>{category.name}</div>
                <div className={classes.persianName}>
                  {category.persian_name}
                </div>
              </div>
            </div>
            <div className={classes.btn}>
              <ArrowBackIosRoundedIcon
                sx={{ color: "#666", fontSize: "13px" }}
              />
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
        <Dialog
          open={editOpen}
          onClose={() => handleEditOpenToggle(false)}
          fullWidth
        >
          <DialogTitle>{`ویرایش دسته بندی "${category.name}"`}</DialogTitle>
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
              id="name"
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
          <DialogTitle>{`حذف دسته بندی "${category.name}"`}</DialogTitle>
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
  } else if (type === "select") {
    return (
      <div className={classes.sHolder}>
        <div className={classes.item} onClick={() => setCategory(category)}>
          <div className={classes.data}>
            <div className={classes.left}>
              <div className={classes.persianName}>{category.persian_name}</div>
            </div>
          </div>
          <div className={classes.btn}>
            <ArrowBackIosRoundedIcon sx={{ color: "#666", fontSize: "13px" }} />
          </div>
        </div>
        <div>
          <Button variant="contained" onClick={() => selectCategory(category)}>
            انتخاب
          </Button>
        </div>
      </div>
    );
  }
}
