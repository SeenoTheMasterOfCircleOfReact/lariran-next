import { useEffect, useState } from "react";
import axios from "axios";

import AlertBg from "../../../UI/AlertBg/AlertBg";

import Waranty from "./Waranty/Waranty";
import WarantySK from "./WarantySk/WarantySk";

import classes from "./Waranties.module.scss";
import ErrorIcon from "@mui/icons-material/Error";
import CircularLoading from "../../../UI/CircularLoading/CircularLoading";
import Title from "../../Title/Title";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function Waranties({
  waranties,
  loading,
  error,
  getWaranties,
  token,
}) {
  const [open, setOpen] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(false);
  const [name, setName] = useState(null);

  function handleOpenToggle(state) {
    setOpen(state);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handlePost() {
    setPostLoading(true);
    setPostError(false);
    const url = "https://api.lariran.com/api/v1/waranty/create";
    axios
      .post(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: name,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setPostError(response.data.data);
        } else {
          setOpen(false);
          getWaranties();
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
          onRefresh={getWaranties}
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
        <WarantySK />
        <WarantySK />
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
        {waranties.map((waranty) => (
          <Waranty
            key={waranty.id}
            waranty={waranty}
            getWaranties={getWaranties}
            token={token}
          />
        ))}
      </div>
      <Dialog open={open} onClose={() => handleOpenToggle(false)} fullWidth>
        <DialogTitle>{`افزودن گارانتی جدید`}</DialogTitle>
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
            label="عنوان"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
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
