import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../store/auth-context";
import axios from "axios";

import Profile from "./Profile/Profile";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import classes from "./Sidebar.module.scss";

export default function Sidebar({ user }) {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  function handleNavigate(path) {
    router.push({
      pathName: "/user-panel",
      query: {
        section: path,
      },
    });
  }

  function handleLogout() {
    axios
      .post("https://api.lariran.com/api/v1/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        authCtx.logout();
      })
      .catch((error) => {});
  }

  return (
    <div className={classes.sidebar}>
      <Profile user={user} />
      <div
        className={[classes.orders, classes.item].join(" ")}
        onClick={() => handleNavigate("orders")}
      >
        <div className={classes.holder}>
          <ShoppingBagOutlinedIcon />
          <span>سفارشات</span>
        </div>
      </div>
      <div
        className={[classes.liked, classes.item].join(" ")}
        onClick={() => handleNavigate("favourite")}
      >
        <div className={classes.holder}>
          <FavoriteBorderOutlinedIcon />
          <span>علاقه مندی ها</span>
        </div>
      </div>
      <div
        className={[classes.addresses, classes.item].join(" ")}
        onClick={() => handleNavigate("address")}
      >
        <div className={classes.holder}>
          <HomeOutlinedIcon />
          <span>آدرس ها</span>
        </div>
      </div>
      <div
        className={[classes.comments, classes.item].join(" ")}
        onClick={() => handleNavigate("comments")}
      >
        <div className={classes.holder}>
          <ModeCommentOutlinedIcon />
          <span>نظرات</span>
        </div>
      </div>
      <div
        className={[classes.logout, classes.item].join(" ")}
        onClick={handleLogout}
      >
        <div className={classes.holder}>
          <LogoutOutlinedIcon />
          <span>خروج</span>
        </div>
      </div>
    </div>
  );
}
