import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "../../../store/auth-context";

import Title from "../../../components/AdminPanel/Title/Title";

import classes from "../../../styles/AdminPanel/Products/Products.module.scss";
import { LinearProgress } from "@mui/material";
import Users from "../../../components/AdminPanel/Pages/Users/Users";

export default function UsersPage() {
  //   const authCtx = useContext(AuthContext);
  //   const { query } = useRouter();

  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(false);
  //   const [users, setUsers] = useState([]);
  //   const [pageCount, setPageCount] = useState(1);

  //   useEffect(() => {
  //     onGetUsers(null);
  //   }, []);

  //   function onGetUsers(search) {
  //     setLoading(true);
  //     setError(false);
  //     const url = `https://api.lariran.com/api/v1/users?page=${query.page}`;
  //     axios
  //       .get(url, {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${authCtx.token}`,
  //         },
  //         params: {
  //           s: search,
  //         },
  //       })
  //       .then((response) => {
  //         if (response.data.status === "error") {
  //           setError(true);
  //         } else {
  //           setUsers(response.data.data);
  //           setPageCount(response.data.meta.last_page);
  //         }
  //       })
  //       .catch((error) => {
  //         setError(true);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }

  return (
    <div></div>
    // <>
    //   {loading && <LinearProgress />}
    //   <div className={classes.holder}>
    //     <Title title="کاربران" />

    //     <Users
    //       users={users}
    //       loading={loading}
    //       error={error}
    //       getUsers={onGetUsers}
    //       token={authCtx.token}
    //       pageCount={pageCount}
    //     />
    //   </div>
    // </>
  );
}
