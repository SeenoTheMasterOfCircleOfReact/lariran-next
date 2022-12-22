import Image from "next/image";
import React from "react";

import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";

import classes from "./Profile.module.scss";

export default function Profile({ user }) {
  return (
    <div className={classes.profile}>
      <div className={classes.holder}>
        <div className={classes.logo}>
          <Image src="/images/user.png" fill alt="logo" />
        </div>
        <div className={classes.info}>
          <div className={classes.name}>{user?.name}</div>
          <div className={classes.phone}>{user?.phone_number}</div>
        </div>
      </div>
    </div>
  );
}
