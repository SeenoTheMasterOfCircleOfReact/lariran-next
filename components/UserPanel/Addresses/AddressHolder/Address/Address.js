import { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import useWindowDimensions from "../../../../../hooks/useWindowDimensions";

import IconButton from "@mui/material/IconButton";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
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

import classes from "./Address.module.scss";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Address({ addressProp, getAddresses, token }) {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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

  const [deleteError, setDeleteError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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

  function handleOpenDeleteToggle(state) {
    setDeleteOpen(state);
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
      .post(
        `https://api.lariran.com/api/v1/address/update/${addressProp.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            address: address,
            postal_code: zipCode,
            city_id: city,
          },
        }
      )
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

  const addressDeleteHandle = () => {
    setDeleteLoading(true);
    axios
      .delete(
        `https://api.lariran.com/api/v1/address/delete/${addressProp.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.state === "error") {
        } else {
          setDeleteSuccess(true);
          getAddresses();
          setDeleteOpen(false);
        }
      })
      .catch((error) => {
        setDeleteError(error.message);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  return (
    <div className={classes.holder}>
      <div className={classes.top}>{addressProp.address}</div>
      <div className={classes.bottom}>
        <div className={classes.right}>
          <span>{"استان : " + addressProp.city.province.name}</span>
          <span>{"شهر : " + addressProp.city.name}</span>
        </div>
        <div className={classes.left}>
          <IconButton
            color="lightBlue"
            aria-label="edit"
            onClick={() => handleOpenToggle(true)}
          >
            <BorderColorRoundedIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="delete"
            onClick={() => handleOpenDeleteToggle(true)}
          >
            <DeleteRoundedIcon />
          </IconButton>
        </div>
      </div>
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
          ویرایش آدرس با موفقیت انجام شد
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteSuccess}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          آدرس با موفقیت حذف شد
        </Alert>
      </Snackbar>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => handleOpenToggle(false)}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
      >
        <DialogTitle id="edit-dialog-title">{"افزودن آدرس جدید"}</DialogTitle>
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
            loading={loading}
            color="lightBlue"
            onClick={handlePostAddress}
            autoFocus
          >
            افزودن آدرس
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteOpen}
        onClose={() => handleOpenDeleteToggle(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="add-dialog-title">حذف آدرس</DialogTitle>
        <DialogContent>
          <div>آیا از حذف آدرس زیر مطمئن هستید؟</div>
          <div style={{ fontSize: "0.8rem", marginBottom: "10px" }}>
            {addressProp.address}
          </div>
          <div>
            {deleteError && <sub style={{ color: "red" }}>{deleteError}</sub>}
          </div>
        </DialogContent>
        <DialogActions style={{ direction: "ltr" }}>
          <Button onClick={() => handleOpenDeleteToggle(false)}>لغو</Button>
          <LoadingButton
            loading={deleteLoading}
            color="lightBlue"
            onClick={addressDeleteHandle}
            autoFocus
          >
            حذف آدرس
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
