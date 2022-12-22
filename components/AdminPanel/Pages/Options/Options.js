import { useEffect, useState } from "react";
import axios from "axios";

import Option from "./Option/Option";
import AlertBg from "../../../UI/AlertBg/AlertBg";
import CircularLoading from "../../../UI/CircularLoading/CircularLoading";

import ErrorIcon from "@mui/icons-material/Error";

import classes from "./Options.module.scss";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import Title from "../../Title/Title";
import OptionValues from "./OptionValues/OptionValues";

const actions = [
  { icon: <DeleteOutlineOutlinedIcon />, name: "حذف", type: "delete" },
  { icon: <BorderColorOutlinedIcon />, name: "ویرایش", type: "edit" },
  { icon: <AddCircleOutlineOutlinedIcon />, name: "افزودن", type: "add" },
];

export default function Options({
  options,
  loading,
  error,
  getOptions,
  token,
}) {
  const [option, setOption] = useState(-1);
  const [formOpen, setFormOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [optionName, setOptionName] = useState("");
  const [optionEditName, setOptionEditName] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [postError, setPostError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const [opvLoading, setOpvLoading] = useState(false);
  const [opvError, setOpvError] = useState(false);
  const [optionValues, setOptionValues] = useState([]);

  useEffect(() => {
    if (options.length > 0) setOption(options[0].id);
  }, [options]);

  useEffect(() => {
    setOptionEditName(options.find((o) => o.id === option)?.name);
    if (option !== -1) onGetOptionValues();
  }, [option]);

  function handleOptionSelect(e) {
    setOption(e.target.value);
  }

  function handleActionClick(type) {
    if (type === "edit") {
      setFormOpen(true);
      setEdit(true);
    } else if (type === "add") {
      setFormOpen(true);
      setEdit(false);
    } else if (type === "delete") {
      setDeleteFormOpen(true);
    }
  }

  function handleDialogToggle(state) {
    setFormOpen(state);
  }

  function handleDeleteToggle(state) {
    setDeleteFormOpen(state);
  }

  function handleOptionInputChange(e) {
    if (edit) {
      setOptionEditName(e.target.value);
    } else {
      setOptionName(e.target.value);
    }
  }

  function handlePostOption() {
    setFormLoading(true);
    setPostError(null);
    const url = "https://api.lariran.com/api/v1/option/create";
    axios
      .post(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: optionName,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setPostError(response.data.data);
        } else {
          setFormOpen(false);
          getOptions();
        }
      })
      .catch((error) => {
        setPostError({ server: [error.message] });
      })
      .finally(() => {
        setFormLoading(false);
      });
  }

  function handleUpdateOption() {
    setFormLoading(true);
    setPostError(null);
    const url = `https://api.lariran.com/api/v1/option/update/${option}`;
    axios
      .put(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: optionEditName,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setUpdateError(response.data.data);
        } else {
          setFormOpen(false);
          getOptions();
        }
      })
      .catch((error) => {
        setUpdateError({ server: [error.message] });
      })
      .finally(() => {
        setFormLoading(false);
      });
  }

  function handleDeleteOption() {
    setDeleteLoading(true);
    setDeleteError(null);
    const url = `https://api.lariran.com/api/v1/option/delete/${option}`;
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
          setDeleteFormOpen(false);
          getOptions();
        }
      })
      .catch((error) => {
        setDeleteError({ server: [error.message] });
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  function onGetOptionValues() {
    setOpvLoading(true);
    setOpvError(false);
    const url = `https://api.lariran.com/api/v1/option/optionValue/${option}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setOpvError(true);
        } else {
          setOptionValues(response.data.data);
        }
      })
      .catch((error) => {
        setOpvError(true);
      })
      .finally(() => {
        setOpvLoading(false);
      });
  }

  if (error) {
    return (
      <div className={classes.error}>
        <AlertBg
          refresh
          onRefresh={getOptions}
          color="red"
          title="مشکلی پیش آمده! لطفا دوباره امتحان کنید."
          icon={<ErrorIcon size="large" />}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularLoading />
      </div>
    );
  }

  return (
    <>
      <div className={classes.holder}>
        <div className={classes.options}>
          <TextField
            id="select-option"
            select
            label="آپشن"
            variant="filled"
            value={option}
            onChange={handleOptionSelect}
            helperText="لطفا یک آپشن را انتخاب کنید"
            sx={{
              width: "100%",
              mb: 3,
            }}
          >
            {options.map((option) => (
              // <Option key={option.id} option={option} />
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <OptionValues
            option={options.find((o) => o.id === option)?.name}
            optionId={option}
            values={optionValues}
            loading={opvLoading}
            error={opvError}
            onGetValues={onGetOptionValues}
            token={token}
          ></OptionValues>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            direction="up"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleActionClick(action.type)}
              />
            ))}
          </SpeedDial>
        </div>
      </div>
      <Dialog
        open={formOpen}
        onClose={() => handleDialogToggle(false)}
        fullWidth
      >
        <DialogTitle>
          {edit
            ? `ویرایش آپشن ${options.find((o) => o.id === option)?.name}`
            : "افزودن یک آپشن جدید"}
        </DialogTitle>
        <DialogContent>
          <sub
            style={{
              color: "red",
              display: "block",
              width: "100%",
            }}
          >
            {edit ? updateError?.server?.[0] : postError?.server?.[0]}
          </sub>
          <TextField
            color="lightBlue"
            error={edit ? Boolean(updateError?.name) : Boolean(postError?.name)}
            helperText={edit ? updateError?.name?.[0] : postError?.name?.[0]}
            autoFocus
            margin="dense"
            id="name"
            label="نام را وارد کنید"
            type="text"
            fullWidth
            variant="standard"
            value={edit ? optionEditName : optionName}
            onChange={handleOptionInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogToggle(false)}>لغو</Button>
          <LoadingButton
            loading={formLoading}
            color="lightBlue"
            onClick={edit ? handleUpdateOption : handlePostOption}
          >
            ثبت
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteFormOpen}
        onClose={() => handleDeleteToggle(false)}
        fullWidth
      >
        <DialogTitle>{`حذف آپشن ${
          options.find((o) => o.id === option)?.name
        }`}</DialogTitle>
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
          <DialogContentText>
            {`آیا مطمئن هستید میخواهید آپشن ${
              options.find((o) => o.id === option)?.name
            } را حذف کنید؟`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteToggle(false)}>لغو</Button>
          <LoadingButton
            loading={deleteLoading}
            color="lightBlue"
            onClick={handleDeleteOption}
          >
            حذف
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
