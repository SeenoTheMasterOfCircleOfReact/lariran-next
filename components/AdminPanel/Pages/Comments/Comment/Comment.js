import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

import classes from "./Comment.module.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Switch,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { LoadingButton } from "@mui/lab";

export default function Comment({ comment, getComments, token }) {
  const [textOpen, setTextOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [activeLoading, setActiveLoading] = useState(false);
  const [activeError, setActiveError] = useState(null);
  const [userOpen, setUserOpen] = useState(false);

  function handleTextToggle() {
    setTextOpen((prev) => !prev);
  }

  function handleDeleteOpenToggle(state) {
    setDeleteOpen(state);
  }

  function handleUserToggle() {
    setUserOpen((prev) => !prev);
  }

  function handleDelete() {
    setDeleteLoading(true);
    setDeleteError(null);
    const url = `https://api.lariran.com/api/v1/comment/delete/${comment.id}`;
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
          getComments();
        }
      })
      .catch((error) => {
        setDeleteError({ server: [error.message] });
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  function handleActivate() {
    const url = `https://api.lariran.com/api/v1/comment/changeStatus/${comment.id}`;
    axios
      .put(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          is_active: comment.is_active === 1 ? 0 : 1,
        },
      })
      .then((response) => {
        getComments();
      })
      .catch((error) => {})
      .finally(() => {
        setActiveLoading(false);
      });
  }

  let image = null;
  if (comment.product.images.length > 0) {
    image = comment.product.images[0].address;
  }

  let text = textOpen ? comment.desc : comment.desc.substring(0, 30) + "...";

  return (
    <>
      <div className={classes.holder}>
        <div className={classes.user}>
          <div className={classes.top} onClick={handleUserToggle}>
            <div className={classes.right}>
              <span style={{ fontSize: "0.9rem", color: "#999" }}>
                کاربر :{" "}
              </span>
              <div style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                {comment?.user?.name}
              </div>
            </div>
            <div className={classes.btn}>
              {/* {userOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} */}
            </div>
          </div>
          <div className={classes.bottom}>{comment?.user?.phone_number}</div>
        </div>
        {image && (
          <div className={classes.image}>
            <span style={{ fontSize: "0.9rem", color: "#999" }}>محصول :</span>
            <Link
              href={`/product/${comment.product.id}/${comment.product.slug}/`}
            >
              <Image
                width={50}
                height={50}
                src={image}
                alt={comment.product.persian_title}
              />
            </Link>
          </div>
        )}
        <div className={classes.comment} onClick={handleTextToggle}>
          <div className={classes.right}>
            <div className={classes.text}>{text}</div>
            <div className={classes.arrow}>
              {textOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </div>
          </div>
          <div className={classes.rating}>
            <Rating
              name="read-only"
              value={comment.score}
              readOnly
              sx={{ fontSize: "20px" }}
              icon={<StarRoundedIcon fontSize="inherit" />}
              emptyIcon={<StarOutlineRoundedIcon fontSize="inherit" />}
            />
          </div>
          <div></div>
        </div>
        <div>
          <Switch
            checked={comment.is_active === 1 ? true : false}
            color="lightBlue"
            onChange={handleActivate}
            inputProps={{ "aria-label": "controlled" }}
            disabled={activeLoading}
          />
          <IconButton
            color="primary"
            aria-label="delete"
            size="small"
            onClick={() => handleDeleteOpenToggle(true)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <Dialog
        open={deleteOpen}
        onClose={() => handleDeleteOpenToggle(false)}
        fullWidth
      >
        <DialogTitle>{`حذف نظر `}</DialogTitle>
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
          <div>{comment.desc}</div>
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
