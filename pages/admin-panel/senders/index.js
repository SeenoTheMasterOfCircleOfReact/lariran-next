import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AuthContext } from "../../../store/auth-context";

import Title from "../../../components/AdminPanel/Title/Title";

import classes from "../../../styles/AdminPanel/Products/Products.module.scss";
import Senders from "../../../components/AdminPanel/Pages/Senders/Senders";
import { LinearProgress } from "@mui/material";

export default function SendersPage() {
  //   const authCtx = useContext(AuthContext);
  //   const { query } = useRouter();

  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(false);
  //   const [senders, setSenders] = useState([]);
  //   const [pageCount, setPageCount] = useState(1);

  //   useEffect(() => {
  //     onGetSenders();
  //   }, []);

  //   function onGetSenders() {
  //     setLoading(true);
  //     setError(false);
  //     const url = `https://api.lariran.com/api/v1/sender?page=${query.page}`;
  //     axios
  //       .get(url, {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${authCtx.token}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         if (response.data.status === "error") {
  //           setError(true);
  //         } else {
  //           setSenders(response.data.data);
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
    //     <Title title="فرستنده ها" />

    //     <Senders
    //       senders={senders}
    //       loading={loading}
    //       error={error}
    //       getSenders={onGetSenders}
    //       token={authCtx.token}
    //     />
    //   </div>
    // </>
  );
}
