import React from "react";
import Like from "./Like/Like";

import AlertBg from "../../../UI/AlertBg/AlertBg";
import ErrorIcon from "@mui/icons-material/Error";

import classes from "./LikesHolder.module.scss";
import LikeSkeleton from "./LikeSkeleton/LikeSkeleton";

export default function LikesHolder({
  likes,
  token,
  loading,
  getLikes,
  error,
}) {
  if (loading) {
    return (
      <div className={classes.holder}>
        <LikeSkeleton />
        <LikeSkeleton />
        <LikeSkeleton />
      </div>
    );
  }
  if (error) {
    return (
      <div className={classes.error}>
        <AlertBg
          refresh={true}
          onRefresh={getLikes}
          color="red"
          title="مشکلی پیش آمده است. لطفا دوباره امتحان نمایید"
          icon={<ErrorIcon size="large" />}
        />
      </div>
    );
  }
  return (
    <div className={classes.holder}>
      {likes.map((like) => (
        <Like key={like.id} like={like} token={token} getLikes={getLikes} />
      ))}
    </div>
  );
}
