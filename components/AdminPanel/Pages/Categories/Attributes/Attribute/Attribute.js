import { useState, useEffect } from "react";
import axios from "axios";

import classes from "./Attribute.module.scss";
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

export default function Attribute({
  attribute,
  getAttributes,
  token,
  categoryId,
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);
  const [name, setName] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    setName(attribute.name);
  }, [attribute]);

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
    const url = `https://api.lariran.com/api/v1/attribute/update/${attribute.id}`;
    axios
      .put(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: name,
          category_id: categoryId,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setEditError(response.data.data);
        } else {
          setEditOpen(false);
          getAttributes();
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
    const url = `https://api.lariran.com/api/v1/attribute/delete/${attribute.id}`;
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
          getAttributes();
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
          <div className={classes.title}>{attribute.name}</div>
          {/* <div className={classes.bottom}>
            <span className={classes.pName}>
              {attribute.persian_name + " : "}
            </span>
            <span className={classes.value}>{attribute.value + " ?????????? "}</span>
          </div> */}
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
        <DialogTitle>{`???????????? ?????????? "${attribute.name}"`}</DialogTitle>
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
            label="??????????"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
            value={name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEditOpenToggle(false)}>??????</Button>
          <LoadingButton
            loading={editLoading}
            color="lightBlue"
            onClick={handleEdit}
          >
            ??????
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteOpen}
        onClose={() => handleDeleteOpenToggle(false)}
        fullWidth
      >
        <DialogTitle>{`?????? ?????????? "${attribute.name}"`}</DialogTitle>
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
          <Button onClick={() => handleDeleteOpenToggle(false)}>??????</Button>
          <LoadingButton
            loading={deleteLoading}
            color="lightBlue"
            onClick={handleDelete}
          >
            ??????
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
