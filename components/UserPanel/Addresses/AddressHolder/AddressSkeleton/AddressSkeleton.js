import Skeleton from "@mui/material/Skeleton";

import classes from "./AddressSkeleton.module.scss";

export default function AddressSkeleton() {
  return (
    <div className={classes.holder}>
      <div className={classes.top}>
        <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} width="70%" />
      </div>
      <div className={classes.bottom}>
        <Skeleton variant="text" sx={{ fontSize: "0.8rem" }} width="60px" />
        <Skeleton variant="text" sx={{ fontSize: "0.8rem" }} width="60px" />
      </div>
    </div>
  );
}
