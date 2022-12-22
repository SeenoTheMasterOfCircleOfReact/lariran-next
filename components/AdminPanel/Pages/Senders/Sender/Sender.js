import { useState, useEffect } from "react";
import axios from "axios";

import classes from "./Sender.module.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { LoadingButton } from "@mui/lab";

export default function Sender({ sender, getSenders, token }) {
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    setName(sender.name);
    setPhoneNumber(sender.phone_number);
    setAddress(sender.address);
    setPostalCode(sender.postal_code);
  }, [sender]);

  function handleEditOpenToggle(state) {
    setEditOpen(state);
  }
  function handleDeleteOpenToggle(state) {
    setDeleteOpen(state);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleAddressChange(e) {
    setAddress(e.target.value);
  }
  function handlePhoneNumberChange(e) {
    setPhoneNumber(e.target.value);
  }
  function handlePostalCodeChange(e) {
    setPostalCode(e.target.value);
  }

  function handleEdit() {
    setEditLoading(true);
    setEditError(null);
    const url = `https://api.lariran.com/api/v1/sender/update/${sender.id}`;
    axios
      .post(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: name,
          address: address,
          phone_number: phoneNumber,
          postal_code: postalCode,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setEditError(response.data.data);
        } else {
          setEditOpen(false);
          getSenders();
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
    const url = `https://api.lariran.com/api/v1/sender/delete/${sender.id}`;
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
          getSenders();
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
      <Paper
        style={{
          padding: "10px",
          marginBottom: "10px",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          {sender.name}
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "400",
            padding: "10px 0",
            borderBottom: "1px solid #ccc",
          }}
        >
          {sender.address}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "11px",
            fontWeight: "600",
            paddingTop: "10px",
            paddingBottom: "10px",
            gap: "30px",
          }}
        >
          <div>{"شماره تلفن : " + sender.phone_number}</div>
          <div>{"کد پستی : " + sender.postal_code}</div>
        </div>
        <div
          className={classes.actions}
          style={{
            marginTop: "1px",
            borderTop: "1px solid #eee",
            display: "flex",
            gap: "10px",
          }}
        >
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
      </Paper>
      <Dialog
        open={editOpen}
        onClose={() => handleEditOpenToggle(false)}
        fullWidth
      >
        <DialogTitle>{`ویرایش فرستنده "${sender.name}"`}</DialogTitle>
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
            label="نام"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
            value={name}
          />
          <TextField
            color="lightBlue"
            error={Boolean(editError?.phone_number)}
            helperText={editError?.phone_number?.[0]}
            autoFocus
            margin="dense"
            id="name"
            label="شماره تلفن"
            type="text"
            fullWidth
            variant="standard"
            onChange={handlePhoneNumberChange}
            value={phoneNumber}
          />
          <TextField
            color="lightBlue"
            error={Boolean(editError?.address)}
            helperText={editError?.address?.[0]}
            autoFocus
            margin="dense"
            id="name"
            label="آدرس"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleAddressChange}
            value={address}
          />
          <TextField
            color="lightBlue"
            error={Boolean(editError?.postal_code)}
            helperText={editError?.postal_code?.[0]}
            autoFocus
            margin="dense"
            id="name"
            label="کد پستی"
            type="text"
            fullWidth
            variant="standard"
            onChange={handlePostalCodeChange}
            value={postalCode}
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
        <DialogTitle>{`حذف فرستنده "${sender.name}"`}</DialogTitle>
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
