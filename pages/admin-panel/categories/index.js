import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../store/auth-context";
import { CategoriesContext } from "../../../store/categories-context";

import Title from "../../../components/AdminPanel/Title/Title";

import classes from "../../../styles/AdminPanel/Products/Products.module.scss";
import { useRouter } from "next/router";
import Categories from "../../../components/AdminPanel/Pages/Categories/Categories";

export default function CategoriesPage() {
  //   const authCtx = useContext(AuthContext);
  //   const categoriesCtx = useContext(CategoriesContext);
  //   const router = useRouter();

  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(false);
  //   const [options, setOptions] = useState([]);
  //   const [pageCount, setPageCount] = useState(1);

  return (
    <div className={classes.holder}>
      {/* <Title title="دسته بندی ها" />
      <Categories token={authCtx.token} /> */}
    </div>
  );
}
