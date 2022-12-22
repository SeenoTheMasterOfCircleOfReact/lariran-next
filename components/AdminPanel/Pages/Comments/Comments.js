import { useEffect, useState } from "react";

import AlertBg from "../../../UI/AlertBg/AlertBg";
import PaginationHolder from "../../Pagination/Pagination";
import Comment from "./Comment/Comment";

import classes from "./Comments.module.scss";
import ErrorIcon from "@mui/icons-material/Error";

export default function Comments({
  comments,
  loading,
  error,
  getComments,
  token,
  pageCount,
}) {
  if (error) {
    return (
      <div className="admin-panel-error">
        <AlertBg
          refresh
          onRefresh={getComments}
          color="red"
          title="مشکلی پیش آمده! لطفا دوباره امتحان کنید."
          icon={<ErrorIcon size="large" />}
        />
      </div>
    );
  }

  return (
    <div className={classes.holder}>
      <div className={classes.Pagination}>
        <PaginationHolder count={pageCount} />
        <div className={classes.comments}>
          {comments.map((c) => (
            <Comment
              key={c.id}
              comment={c}
              getComments={getComments}
              token={token}
            />
          ))}
        </div>
        <PaginationHolder count={pageCount} />
      </div>
    </div>
  );
}
