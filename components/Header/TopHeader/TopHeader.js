import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../store/auth-context";
import Image from "next/image";

import Searchbar from "./Searchbar/Searchbar";

import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Divider, Button, Badge } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import classes from "./topHeader.module.scss";
import Link from "next/link";

export default function TopHeader({ loading, user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const userMenuToggle = Boolean(anchorEl);
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  function navToLogin() {
    router.push("/login");
  }

  function navToBasket() {
    router.push("/basket");
  }

  function userMenuToggleHandler(e) {
    // setAnchorEl(e.currentTarget);
    if (authCtx.admin) {
      router.push("/admin-panel");
    } else {
      router.push("/user-panel");
    }
  }

  function userMenuCloseHandler() {
    setAnchorEl(null);
  }

  return (
    <div className={classes.top}>
      <div className={classes.right}>
        <Link href="/" className={classes.logo} rel="preload">
          <Image
            src="/images/logo.png"
            width={100}
            height={40}
            alt="lariran"
            priority
          />
        </Link>
        <Searchbar />
      </div>
      <div className={classes.left}>
        {!user && (
          <LoadingButton
            loading={loading}
            variant="contained"
            color="primary"
            sx={{ color: "#fff" }}
            onClick={navToLogin}
          >
            ورود
          </LoadingButton>
        )}
        {user && (
          <div>
            <IconButton
              sx={{ borderRadius: "10px" }}
              color="black"
              aria-controls={userMenuToggle ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={userMenuToggle ? "true" : undefined}
              onClick={userMenuToggleHandler}
            >
              <PersonOutlineOutlinedIcon sx={{ fontSize: 36 }} />
              <ArrowDropDownOutlinedIcon />
            </IconButton>
            {/* <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={userMenuToggle}
              onClose={userMenuCloseHandler}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu> */}
          </div>
        )}
        <Divider orientation="vertical" flexItem />
        <div className={classes.card} onClick={navToBasket}>
          <Badge
            badgeContent={4}
            color="primary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <LocalMallOutlinedIcon color="black" sx={{ fontSize: 36 }} />
          </Badge>
        </div>
      </div>
    </div>
  );
}
