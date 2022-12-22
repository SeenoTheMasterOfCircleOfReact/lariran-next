import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { CategoriesContext } from "../../store/categories-context";
import { AuthContext } from "../../store/auth-context";
import { BasketContext } from "../../store/basket-context";

import classes from "./layout.module.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AdminHeader from "../AdminPanel/Header/Header";
import Sidebar from "../AdminPanel/Sidebar/Sidebar";

export default function Layout({ loading, children }) {
  const [categoriesData, setCategoriesData] = useState([]);
  const categoriesCtx = useContext(CategoriesContext);
  const authCtx = useContext(AuthContext);
  const basketCtx = useContext(BasketContext);
  const { pathname } = useRouter();

  const [close, setClose] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authCtx.setToken(token);
    }
    basketCtx.getBasket();
  }, []);

  useEffect(() => {
    axios
      .get("https://api.lariran.com/api/v1/category", {})
      .then((response) => {
        setCategoriesData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    categoriesCtx.setCategories(categoriesData);
  }, [categoriesData]);

  function handleToggleClose() {
    setClose((prev) => !prev);
  }

  let toggleClasses = [classes.pageWrapper];
  if (close) {
    toggleClasses.push(classes.open);
  }

  if (pathname.includes("/admin-panel")) {
    return (
      <div className={classes.adminLayout}>
        <AdminHeader closed={close} onClose={handleToggleClose} />
        <div className={classes.holder}>
          <Sidebar closed={close} />
          <div className={toggleClasses.join(" ")}>{children}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.layout}>
        <Header loading={authCtx.loading} user={authCtx.user} />
        {children}
        {!loading && <Footer />}
      </div>
    );
  }
}
