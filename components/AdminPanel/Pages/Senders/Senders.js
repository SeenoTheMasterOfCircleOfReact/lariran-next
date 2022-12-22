import { useEffect, useState } from "react";
import axios from "axios";

import AlertBg from "../../../UI/AlertBg/AlertBg";

import classes from "./Senders.module.scss";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Sender from "./Sender/Sender";

export default function Senders({
  senders,
  loading,
  error,
  getSenders,
  token,
}) {
  const [open, setOpen] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(false);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [postalCode, setPostalCode] = useState(null);

  function handleOpenToggle(state) {
    setOpen(state);
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

  function handlePost() {
    setPostLoading(true);
    setPostError(false);
    const url = "https://api.lariran.com/api/v1/sender/create";
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
          setPostError(response.data.data);
        } else {
          setOpen(false);
          getSenders();
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
          onRefresh={getSenders}
          color="red"
          title="مشکلی پیش آمده! لطفا دوباره امتحان کنید."
          icon={<ErrorIcon size="large" />}
        />
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
        <div className={classes.senders}>
          {senders.map((sender) => (
            <Sender
              key={sender.id}
              sender={sender}
              getSenders={getSenders}
              token={token}
            />
          ))}
        </div>
      </div>
      <Dialog open={open} onClose={() => handleOpenToggle(false)} fullWidth>
        <DialogTitle>{`افزودن فرستنده جدید`}</DialogTitle>
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
            label="نام"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
          />
          <TextField
            color="lightBlue"
            error={Boolean(postError?.phone_number)}
            helperText={postError?.phone_number?.[0]}
            autoFocus
            margin="dense"
            id="name"
            label="شماره تلفن"
            type="text"
            fullWidth
            variant="standard"
            onChange={handlePhoneNumberChange}
          />
          <TextField
            color="lightBlue"
            error={Boolean(postError?.address)}
            helperText={postError?.address?.[0]}
            autoFocus
            margin="dense"
            id="name"
            label="آدرس"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleAddressChange}
          />
          <TextField
            color="lightBlue"
            error={Boolean(postError?.postal_code)}
            helperText={postError?.postal_code?.[0]}
            autoFocus
            margin="dense"
            id="name"
            label="کد پستی"
            type="text"
            fullWidth
            variant="standard"
            onChange={handlePostalCodeChange}
          />
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
