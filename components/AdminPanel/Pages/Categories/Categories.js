import { useState, useEffect, useContext } from "react";
import { CategoriesContext } from "../../../../store/categories-context";
import { useChildCategories } from "../../../../hooks/useCategories";
import axios from "axios";

import CategoriesFeature from "../CategoriesFeature/CategoriesFeature";

import classes from "./Categories.module.scss";
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
import Attributes from "./Attributes/Attributes";

export default function Categories({ token }) {
  const categoriesCtx = useContext(CategoriesContext);
  const [categoryId, setCategoryId] = useState(0);
  const [category, setCategory] = useState(null);
  const categories = useChildCategories(categoryId);

  useEffect(() => {
    const newCategory = categoriesCtx.categories.find(
      (c) => c.id === categoryId
    );
    setCategory(newCategory);
  }, [categoryId, categoriesCtx.categories]);

  function handleSetCategory(category) {
    setCategoryId(category.id);
  }
  function backToCategory(category) {
    setCategoryId(category.parent_id);
  }

  const [open, setOpen] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
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
    const url = "https://api.lariran.com/api/v1/category/create";
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
        console.log(response);
        if (response.data.status === "error") {
          setPostError(response.data.data);
        } else {
          setOpen(false);
          categoriesCtx.getCategories();
        }
      })
      .catch((error) => {
        setPostError({ server: [error.message] });
      })
      .finally(() => {
        setPostLoading(false);
      });
  }

  return (
    <>
      <div className={classes.holder}>
        <Button sx={{ mb: 1 }} onClick={() => handleOpenToggle(true)}>
          افزودن
        </Button>
        <CategoriesFeature
          type="form"
          backToCategory={backToCategory}
          handleSetCategory={handleSetCategory}
          categoryId={categoryId}
          category={category}
          categories={categories}
          token={token}
        />
        <Attributes category={category} token={token} categoryId={categoryId} />
      </div>
      <Dialog open={open} onClose={() => handleOpenToggle(false)} fullWidth>
        <DialogTitle>{`افزودن دسته بندی جدید در ${
          category ? category.persian_name : "ریشه"
        }`}</DialogTitle>
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
            id="name"
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
