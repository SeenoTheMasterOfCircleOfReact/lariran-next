import { useState, useEffect } from "react";
import axios from "axios";

import classes from "./Waranty.module.scss";
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

export default function Waranty({ waranty, getWaranties, token }) {
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);
  const [name, setName] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    setName(waranty.name);
  }, [waranty]);

  function handleEditOpenToggle(state) {
    setEditOpen(state);
  }
  function handleDeleteOpenToggle(state) {
    setDeleteOpen(state);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEdit() {
    setEditLoading(true);
    setEditError(null);
    const url = `https://api.lariran.com/api/v1/waranty/update/${waranty.id}`;
    axios
      .put(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: name,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setEditError(response.data.data);
        } else {
          setEditOpen(false);
          getWaranties();
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
    const url = `https://api.lariran.com/api/v1/waranty/delete/${waranty.id}`;
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
          getWaranties();
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
          <div className={classes.title}>{waranty.name}</div>
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
        <DialogTitle>{`ویرایش گارانتی "${waranty.name}"`}</DialogTitle>
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
        <DialogTitle>{`حذف گارانتی "${waranty.name}"`}</DialogTitle>
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
