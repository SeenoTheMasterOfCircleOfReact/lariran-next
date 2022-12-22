import { useEffect, useState } from "react";
import axios from "axios";

import classes from "./Value.module.scss";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function Value({ value, optionId, onGetValues, token }) {
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);
  const [title, setTitle] = useState("");
  const [oValue, setOValue] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    setTitle(value.title);
    setOValue(value.value);
  }, [value]);

  function handleEditOpenToggle(state) {
    setEditOpen(state);
  }
  function handleDeleteOpenToggle(state) {
    setDeleteOpen(state);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleValueChange(e) {
    setOValue(e.target.value);
  }

  function handleEdit() {
    setEditLoading(true);
    setEditError(null);
    const url = `https://api.lariran.com/api/v1/optionValue/update/${value.id}`;
    axios
      .put(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          title: title,
          value: oValue,
          option_id: optionId,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setEditError(response.data.data);
        } else {
          setEditOpen(false);
          onGetValues();
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
    const url = `https://api.lariran.com/api/v1/optionValue/delete/${value.id}`;
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
          onGetValues();
        }
      })
      .catch((error) => {
        setDeleteError({ server: [error.message] });
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  return (
    <>
      <div className={classes.holder}>
        <div className={classes.right}>
          <div className={classes.title}>{value.title}</div>
          <div className={classes.value}>{value.value}</div>
        </div>
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
      <Dialog
        open={editOpen}
        onClose={() => handleEditOpenToggle(false)}
        fullWidth
      >
        <DialogTitle>{`ویرایش مقدار "${value.title}"`}</DialogTitle>
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
            error={Boolean(editError?.title)}
            helperText={editError?.title?.[0]}
            autoFocus
            margin="dense"
            id="title"
            label="عنوان"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleTitleChange}
            value={title}
          />
          <TextField
            color="lightBlue"
            error={Boolean(editError?.value)}
            helperText={editError?.value?.[0]}
            autoFocus
            margin="dense"
            id="value"
            label="مقدار"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleValueChange}
            value={oValue}
          />
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
        <DialogTitle>{`حذف مقدار "${value.title}"`}</DialogTitle>
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
