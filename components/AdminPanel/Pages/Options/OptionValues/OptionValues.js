import { useEffect, useState } from "react";
import axios from "axios";

import AlertBg from "../../../../UI/AlertBg/AlertBg";

import classes from "./OptionValues.module.scss";
import ErrorIcon from "@mui/icons-material/Error";
import Value from "./Value/Value";
import ValueSk from "./ValueSk/ValueSk";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function OptionValues({
  option,
  optionId,
  values,
  loading,
  error,
  onGetValues,
  token,
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [oValue, setOValue] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(false);

  function handleOpenToggle(state) {
    setOpen(state);
  }
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleOValueChange(e) {
    setOValue(e.target.value);
  }
  function handlePostValue() {
    setPostLoading(true);
    setPostError(false);
    const url = "https://api.lariran.com/api/v1/optionValue/create";
    axios
      .post(url, null, {
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
          setPostError(response.data.data);
        } else {
          setOpen(false);
          onGetValues();
        }
      })
      .catch((error) => {
        setPostError({ server: [error.message] });
      })
      .finally(() => {
        setPostLoading(false);
      });
  }

  if (loading) {
    return (
      <>
        <div className={classes.titleHolder}>
          <h1 className={classes.title}>{`مقادیر آپشن ${option}`}</h1>
          <Button variant="contained">افزودن</Button>
        </div>
        <div className={classes.holder}>
          <ValueSk />
          <ValueSk />
          <ValueSk />
          <ValueSk />
          <ValueSk />
          <ValueSk />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="admin-panel-error">
        <AlertBg
          refresh
          onRefresh={onGetValues}
          color="red"
          title="مشکلی پیش آمده! لطفا دوباره امتحان کنید."
          icon={<ErrorIcon size="large" />}
        />
      </div>
    );
  }
  return (
    <>
      <div className={classes.titleHolder}>
        <h1 className={classes.title}>{`مقادیر آپشن ${option}`}</h1>
        <Button variant="contained" onClick={() => handleOpenToggle(true)}>
          افزودن
        </Button>
      </div>
      <div className={classes.holder}>
        {values.map((value) => (
          <Value
            key={value.id}
            value={value}
            optionId={optionId}
            onGetValues={onGetValues}
            token={token}
          />
        ))}
      </div>
      <Dialog open={open} onClose={() => handleOpenToggle(false)} fullWidth>
        <DialogTitle>{`افزودن مقدار جدید در "${option}"`}</DialogTitle>
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
            error={Boolean(postError?.title)}
            helperText={postError?.title?.[0]}
            autoFocus
            margin="dense"
            id="title"
            label="عنوان"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleTitleChange}
          />
          <TextField
            color="lightBlue"
            error={Boolean(postError?.value)}
            helperText={postError?.value?.[0]}
            autoFocus
            margin="dense"
            id="value"
            label="مقدار"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleOValueChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOpenToggle(false)}>لغو</Button>
          <LoadingButton
            loading={postLoading}
            color="lightBlue"
            onClick={handlePostValue}
          >
            ثبت
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
