import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

import AlertBg from "../../../../UI/AlertBg/AlertBg";
import Title from "../../../Title/Title";
import Attribute from "./Attribute/Attribute";

import classes from "./Attributes.module.scss";
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
import AttrSk from "./AttrSk/AttrSk";

export default function Attributes({ category, token, categoryId }) {
  const { query } = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [attributes, setAttributes] = useState([]);

  const [open, setOpen] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    if (category) onGetAttributes();
  }, [category]);

  function handleOpenToggle(state) {
    setOpen(state);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handlePost() {
    setPostLoading(true);
    setPostError(false);
    const url = "https://api.lariran.com/api/v1/attribute/create";
    axios
      .post(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: name,
          category_id: categoryId,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "error") {
          setPostError(response.data.data);
        } else {
          setOpen(false);
          onGetAttributes();
        }
      })
      .catch((error) => {
        setPostError({ server: [error.message] });
      })
      .finally(() => {
        setPostLoading(false);
      });
  }

  function onGetAttributes() {
    setLoading(true);
    setError(false);
    const url = `https://api.lariran.com/api/v1/attribute/category/${categoryId}`;
    axios
      .get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setError(true);
        } else {
          setAttributes(response.data.data);
        }
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (category) {
    if (error) {
      return (
        <div className="admin-panel-error">
          <AlertBg
            refresh
            onRefresh={onGetAttributes}
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
          <Title title={`مشخصات فنی ${category.persian_name}`} />
          <Button sx={{ mb: "10px", fontWeight: "600" }} size="large">
            افزودن
          </Button>
          <div className={classes.attributes}>
            <AttrSk />
            <AttrSk />
            <AttrSk />
            <AttrSk />
            <AttrSk />
            <AttrSk />
            <AttrSk />
            <AttrSk />
            <AttrSk />
            <AttrSk />
            <AttrSk />
            <AttrSk />
          </div>
        </div>
      );
    }

    return (
      <>
        <div className={classes.holder}>
          <Title title={`مشخصات فنی ${category.persian_name}`} />
          <Button
            sx={{ mb: "10px", fontWeight: "600" }}
            size="large"
            onClick={() => handleOpenToggle(true)}
          >
            افزودن
          </Button>
          <div className={classes.attributes}>
            {attributes.map((attr) => (
              <Attribute
                key={attr.id}
                attribute={attr}
                categoryId={categoryId}
                token={token}
                getAttributes={onGetAttributes}
              />
            ))}
          </div>
        </div>
        <Dialog open={open} onClose={() => handleOpenToggle(false)} fullWidth>
          <DialogTitle>{`افزودن مشخصه جدید در ${category.persian_name}`}</DialogTitle>
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
}
