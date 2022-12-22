import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { useRouter } from "next/router";
import Header from "../../components/AdminPanel/Header/Header";

import classes from "../../styles/AdminPanel/AdminPanel.module.scss";
import Sidebar from "../../components/AdminPanel/Sidebar/Sidebar";

export default function AdminPanel() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [close, setClose] = useState(false);

  // useEffect(() => {
  //   if (authCtx.end) {
  //     if (!authCtx.user) {
  //       router.replace("/admin-login");
  //     }
  //   }
  // }, [authCtx.user, authCtx.end]);

  useEffect(() => {
    if (!localStorage.getItem("token")) router.replace("/admin-login");
  }, []);

  function handleToggleClose() {
    setClose((prev) => !prev);
  }

  return <div className={classes.holder}></div>;
}
