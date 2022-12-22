import { useEffect, useState, forwardRef } from "react";
import axios from "axios";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";

import Address from "./Address/Address";

import AlertBg from "../../../UI/AlertBg/AlertBg";
import ErrorIcon from "@mui/icons-material/Error";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import classes from "./AddressHolder.module.scss";
import AddressSkeleton from "./AddressSkeleton/AddressSkeleton";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddressHolder({
  addresses,
  token,
  getAddresses,
  loadingAll,
  errorAll,
}) {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [provinceLoading, setProvinceLoading] = useState(false);
  const [province, setProvince] = useState(null);

  const [cities, setCities] = useState([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [cityError, setCityError] = useState(null);

  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState(null);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setCityError(errors.find((e) => e.key === "city_id"));
    setZipCodeError(errors.find((e) => e.key === "postal_code"));
    setAddressError(errors.find((e) => e.key === "address"));
    setServerError(errors.find((e) => e.key === "server"));
  }, [errors]);

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

  function handlePostAddress() {
    setLoading(true);
    setSuccess(false);
    setError(false);
    setErrors([]);
    axios
      .post("https://api.lariran.com/api/v1/address/create", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          address: address,
          postal_code: zipCode,
          city_id: city,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setError(true);
          const errors = Object.keys(response.data.data).map((key) => {
            const newObj = {
              key: key,
              error: response.data.data[key],
            };
            return newObj;
          });
          setErrors(errors);
        } else {
          setSuccess(true);
          getAddresses();
          setOpen(false);
        }
      })
      .catch((error) => {
        setError(true);
        setErrors([{ key: "server", error: error.message }]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleCloseAlert(e, reason) {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  }

  if (loadingAll) {
    return (
      <div className={classes.holder}>
        <AddressSkeleton />
        <AddressSkeleton />
        <AddressSkeleton />
      </div>
    );
  }

  if (errorAll) {
    return (
      <div className={classes.error}>
        <AlertBg
          refresh={true}
          onRefresh={getAddresses}
          color="red"
          title="مشکلی پیش آمده است. لطفا دوباره امتحان نمایید"
          icon={<ErrorIcon size="large" />}
        />
      </div>
    );
  }

  return (
    <div className={classes.holder}>
      <div style={{ marginBottom: "10px" }}>
        <Snackbar
          open={success}
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
        <Button
          variant="contained"
          sx={{ display: "block" }}
          onClick={() => handleOpenToggle(true)}
        >
          افزودن آدرس
        </Button>
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
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
              >
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
              loading={loading}
              color="lightBlue"
              onClick={handlePostAddress}
              autoFocus
            >
              افزودن آدرس
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
      {addresses.map((address) => (
        <Address
          key={address.id}
          addressProp={address}
          getAddresses={getAddresses}
          token={token}
        />
      ))}
    </div>
  );
}
