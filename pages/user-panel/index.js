import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import { useRouter } from "next/router";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import Sidebar from "../../components/UserPanel/Sidebar/Sidebar";

import classes from "../../styles/UserPanel/UserPanel.module.scss";
import Orders from "../../components/UserPanel/Orders/Orders";
import Likes from "../../components/UserPanel/Likes/Likes";
import Addresses from "../../components/UserPanel/Addresses/Addresses";

export default function UserPanel() {
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  // useEffect(() => {
  //   if (authCtx.end) {
  //     if (!authCtx.user) {
  //       router.replace("/login");
  //     }
  //   }
  // }, [authCtx.user, authCtx.end]);

  useEffect(() => {
    if (!localStorage.getItem("token")) router.replace("/login");
  }, []);

  let showSidebar = true;
  let showLeft = true;
  if (width < 1000) {
    if (router.query.section) {
      showSidebar = false;
      showLeft = true;
    } else {
      showSidebar = true;
      showLeft = false;
    }
  }

  return (
    <div className={classes.holder}>
      {showSidebar && <Sidebar user={authCtx.user} />}
      {showLeft && (
        <div className={classes.left}>
          {router.query.section === "orders" && (
            <Orders token={authCtx.token} user={authCtx.user} />
          )}
          {router.query.section === "favourite" && (
            <Likes token={authCtx.token} user={authCtx.user} />
          )}
          {router.query.section === "address" && (
            <Addresses token={authCtx.token} user={authCtx.user} />
          )}
        </div>
      )}
    </div>
  );
}
