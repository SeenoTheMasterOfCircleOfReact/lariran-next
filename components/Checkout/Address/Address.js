import { useContext, useEffect, useState, forwardRef } from "react";
import axios from "axios";
import { AddressContext } from "../../../store/address-context";
import { AuthContext } from "../../../store/auth-context";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

import classes from "./Address.module.scss";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Title from "../Title/Title";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Address({ addressValue, setAddressValue }) {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const authCtx = useContext(AuthContext);
  const addressCtx = useContext(AddressContext);
  const [open, setOpen] = useState(false);

  const [cityError, setCityError] = useState(null);
  const [zipCodeError, setZipCodeError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [serverError, setServerError] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [provinceLoading, setProvinceLoading] = useState(false);
  const [province, setProvince] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");

  const token = authCtx.token;

  useEffect(() => {
    setCityError(addressCtx.errors.find((e) => e.key === "city_id"));
    setZipCodeError(addressCtx.errors.find((e) => e.key === "postal_code"));
    setAddressError(addressCtx.errors.find((e) => e.key === "address"));
    setServerError(addressCtx.errors.find((e) => e.key === "server"));
  }, [addressCtx.errors]);

  useEffect(() => {
    addressCtx.success && setOpen(false);
  }, [addressCtx.success]);

  useEffect(() => {
    if (addressCtx.finish) {
      if (addressCtx.addresses.length === 0) {
        setOpen(true);
      }
    }
  }, [addressCtx.addresses, addressCtx.finish]);

  useEffect(() => {
    if (!authCtx.loading) {
      addressCtx.getAddress();
      if (!authCtx.user) {
        router.replace("/login");
      }
    }
  }, [authCtx.loading]);

  useEffect(() => {
    open && onGetProvinces();
  }, [open]);

  useEffect(() => {
    province && onGetCities();
  }, [province]);

  function onGetProvinces() {
    setProvinceLoading(true);
    axios
      .get("https://api.lariran.com/api/v1/province", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProvinces(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setProvinceLoading(false);
      });
  }

  function onGetCities() {
    setCityLoading(true);
    axios
      .get("https://api.lariran.com/api/v1/city/" + province, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCities(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setCityLoading(false);
      });
  }

  function handleOpenToggle(state) {
    setOpen(state);
  }

  function handleProvinceChange(e) {
    setProvince(e.target.value);
  }

  function handleCityChange(e) {
    setCity(e.target.value);
  }

  function handleZipCodeChange(e) {
    setZipCode(e.target.value);
  }

  function handleAddressChange(e) {
    setAddress(e.target.value);
  }

  function handleCloseAlert(e, reason) {
    if (reason === "clickaway") {
      return;
    }

    addressCtx.updateSuccess(false);
  }

  function handlePostAddress() {
    addressCtx.postAddress(address, zipCode, city);
  }

  return (
    <div className={classes.holder}>
      <Title title="آدرس خود را انتخاب نمایید"></Title>
      <div className={classes.bottom}>
        <div className={classes.select}>
          <TextField
            id="filled-select-address"
            select
            value={addressValue}
            onChange={setAddressValue}
            variant="filled"
            sx={{ width: "100%" }}
            label="آدرس ها"
            disabled={addressCtx.getAddressLoading}
          >
            {addressCtx.addresses.map((address) => (
              <MenuItem key={address.id} value={address.id}>
                {address.address}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <Fab
          color="primary"
          aria-label="add"
          variant="extended"
          onClick={() => handleOpenToggle(true)}
          style={{
            zIndex: "1",
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          افزودن
        </Fab>
      </div>
      <Snackbar
        open={addressCtx.success}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          آدرس جدید با موفقیت اضافه شد
        </Alert>
      </Snackbar>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => handleOpenToggle(false)}
        aria-labelledby="add-dialog-title"
        aria-describedby="add-dialog-description"
      >
        <DialogTitle id="add-dialog-title">{"افزودن آدرس جدید"}</DialogTitle>
        <DialogContent>
          <form className={classes.form}>
            <div>
              {serverError && (
                <sub style={{ color: "red" }}>{serverError.error}</sub>
              )}
            </div>
            <div
              style={{
                display: width > 1000 ? "flex" : "block",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <FormControl
                color="lightBlue"
                sx={{
                  width: width > 1000 ? "200px" : "100%",
                  mb: width > 1000 ? "0px" : "10px",
                }}
              >
                <InputLabel id="province-select-label">استان</InputLabel>
                <Select
                  labelId="province-select-label"
                  id="province-select"
                  value={province}
                  label="استان"
                  onChange={handleProvinceChange}
                  disabled={provinceLoading}
                >
                  {provinces.map((province) => (
                    <MenuItem key={province.id} value={province.id}>
                      {province.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{"استان را انتخاب کنید"}</FormHelperText>
              </FormControl>
              <FormControl
                color="lightBlue"
                error={cityError}
                sx={{
                  width: width > 1000 ? "200px" : "100%",
                }}
              >
                <InputLabel id="city-select-label">شهر</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="city-select"
                  value={city}
                  label="شهر"
                  onChange={handleCityChange}
                  sx={{
                    width: width > 1000 ? "200px" : "100%",
                  }}
                  disabled={cityLoading || !province}
                >
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {cityError?.error[0] || "شهر را انتخاب کنید "}
                </FormHelperText>
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <TextField
                error={zipCodeError}
                color="lightBlue"
                id="zipCode"
                label="کد پستی"
                onChange={handleZipCodeChange}
                helperText={zipCodeError?.error[0] || "کد پستی را وارد کنید"}
                sx={{ width: width > 1000 ? "200px" : "100%" }}
              />
            </div>
            <div>
              <TextField
                error={addressError}
                color="lightBlue"
                id="address"
                label="آدرس"
                multiline
                rows={2}
                sx={{ width: "100%" }}
                onChange={handleAddressChange}
                helperText={addressError?.error[0] || "آدرس را وارد کنید"}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions style={{ direction: "ltr" }}>
          <Button onClick={() => handleOpenToggle(false)}>لغو</Button>
          <LoadingButton
            loading={addressCtx.postAddressLoading}
            color="lightBlue"
            onClick={handlePostAddress}
            autoFocus
          >
            افزودن آدرس
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
