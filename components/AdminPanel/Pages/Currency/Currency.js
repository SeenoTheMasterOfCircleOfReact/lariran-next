import { useEffect, useState } from "react";
import axios from "axios";

import AlertBg from "../../../UI/AlertBg/AlertBg";

import CurrencyItem from "./CurrencyItem/CurrencyItem";
import CurrencySk from "./CurrencySk/CurrencySk";
import PaginationHolder from "../../Pagination/Pagination";
import CircularLoading from "../../../UI/CircularLoading/CircularLoading";
import Title from "../../Title/Title";

import classes from "./Currency.module.scss";
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

export default function Currencies({
  currencies,
  loading,
  error,
  getCurrencies,
  token,
  pageCount,
}) {
  const [open, setOpen] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(false);
  const [name, setName] = useState(null);
  const [persianName, setPersianName] = useState(null);
  const [value, setValue] = useState(null);

  function handleOpenToggle(state) {
    setOpen(state);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handlePersianNameChange(e) {
    setPersianName(e.target.value);
  }
  function handleValueChange(e) {
    setValue(e.target.value);
  }

  function handlePost() {
    setPostLoading(true);
    setPostError(false);
    const url = "https://api.lariran.com/api/v1/currency/create";
    axios
      .post(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: name,
          persian_name: persianName,
          value: value,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setPostError(response.data.data);
        } else {
          setOpen(false);
          getCurrencies();
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
          onRefresh={getCurrencies}
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
        <PaginationHolder count={pageCount} />
        <div className={classes.currencies}>
          <CurrencySk />
          <CurrencySk />
        </div>
        <PaginationHolder count={pageCount} />
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
        <PaginationHolder count={pageCount} />
        <div className={classes.currencies}>
          {currencies.map((currency) => (
            <CurrencyItem
              key={currency.id}
              currency={currency}
              getCurrencies={getCurrencies}
              token={token}
            />
          ))}
        </div>
        <PaginationHolder count={pageCount} />
      </div>
      <Dialog open={open} onClose={() => handleOpenToggle(false)} fullWidth>
        <DialogTitle>{`افزودن واحد جدید`}</DialogTitle>
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
          <TextField
            color="lightBlue"
            error={Boolean(postError?.value)}
            helperText={postError?.value?.[0]}
            autoFocus
            margin="dense"
            id="name"
            label="قیمت"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleValueChange}
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
